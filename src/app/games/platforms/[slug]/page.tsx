"use client";
import { Typography, Link as MuiLink, Breadcrumbs } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { useGetGamesByPlatformsQuery } from "@/redux/api/games.api";
import Container from "@/components/Container";
import SubTitle from "@/components/SubTitle";
import ErrorData from "@/components/ErrorData";
import TextWithMoreButton from "@/components/ui/TextWithMoreButton";
import GamesList from "@/components/GamesList";
import PaginationComponent from "@/components/ui/Pagination";

interface PlatformsGamesPageProps {
  params: { slug: "string" };
}

const PlatformsGamesPage = ({ params: { slug } }: PlatformsGamesPageProps) => {
  const [numPage, setNumPage] = useState<number>(1);

  const { isLoading, data, error, isFetching } = useGetGamesByPlatformsQuery({
    id: slug,
    quantity: 20,
    numberPage: numPage,
  });

  const override: CSSProperties = {
    display: "block",
    margin: "80px auto 0 auto",
    borderColor: "#ed5564",
  };

  const breadcrumbs = [
    <MuiLink
      className='animation'
      underline='none'
      key='1'
      color='white'
      href='/'
    >
      Home
    </MuiLink>,
    <MuiLink
      className='animation'
      underline='none'
      key='2'
      color='white'
      href='/games'
    >
      Game Store
    </MuiLink>,
    <Typography key='3' color='white'>
      {data?.seo_h1}
    </Typography>,
  ];

  if (error) return <ErrorData errorText='Error data' />;

  return (
    <section>
      <Container>
        {!isLoading && (
          <Breadcrumbs
            sx={{ marginBottom: "20px" }}
            separator='>'
            color='white'
            aria-label='breadcrumbs'
          >
            {breadcrumbs}
          </Breadcrumbs>
        )}

        <div className='flex flex-col items-center'>
          <SubTitle name={data?.seo_h1} />

          {isLoading || isFetching ? (
            <PacmanLoader cssOverride={override} color={"#ed5564"} />
          ) : (
            <>
              <TextWithMoreButton text={data.description} />
              <GamesList dataGames={data} />
              {data?.results.length !== 0 && (
                <PaginationComponent
                  pageQty={data?.count}
                  setNumPage={setNumPage}
                  numPage={numPage}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PlatformsGamesPage;
