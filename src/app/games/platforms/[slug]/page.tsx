import { Typography, Link as MuiLink, Breadcrumbs } from "@mui/material";
import { CSSProperties } from "react";
import { PacmanLoader } from "react-spinners";
import Container from "@/components/Container";

interface PlatformsGamesPageProps {
  params: { slug: "string" };
}

const PlatformsGamesPage = ({ params: { slug } }: PlatformsGamesPageProps) => {
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
      {slug}
    </Typography>,
  ];

  return (
    <section>
      <Container>
        {/* {loadingGameData && loadingGameDlc ? (
          <PacmanLoader cssOverride={override} color={"#ed5564"} />
        ) : (
          <> */}
        <Breadcrumbs
          sx={{ marginBottom: "20px" }}
          separator='>'
          color='white'
          aria-label='breadcrumbs'
        >
          {breadcrumbs}
        </Breadcrumbs>
        {/* </>
        )} */}
      </Container>
    </section>
  );
};

export default PlatformsGamesPage;
