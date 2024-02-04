"use client";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import { useGetGameDataQuery } from "@/redux/api/games.api";
import { ReactNode } from "react";
import { PacmanLoader } from "react-spinners";

interface GamePageProps {
  params: { slug: "string" };
}

const GamePage = ({ params: { slug } }: GamePageProps): ReactNode => {
  const { isLoading, data, error } = useGetGameDataQuery(slug);

  if (error) return <ErrorData errorText='Error data' />;

  return (
    <section>
      <Container>
        {isLoading ? (
          <PacmanLoader className='mx-auto my-auto' color='#ed5564' />
        ) : (
          <h1>{data.name}</h1>
        )}
      </Container>
    </section>
  );
};

export default GamePage;
