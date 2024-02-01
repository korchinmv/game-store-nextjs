"use client";
import Container from "@/components/Container";
import ErrorData from "@/components/ErrorData";
import { useGetGameDataQuery } from "@/redux/api/games.api";
import { PacmanLoader } from "react-spinners";

interface GamePageProps {
  params: { id: "string" };
}

const GamePage = ({ params: { id } }: GamePageProps) => {
  const { isLoading, data, error } = useGetGameDataQuery(id);
  console.log(data);
  if (error) return <ErrorData errorText='Error data' />;

  return (
    <Container>
      {isLoading ? (
        <PacmanLoader className='mx-auto my-auto' color='#ed5564' />
      ) : (
        <h2>{data.name}</h2>
      )}
    </Container>
  );
};

export default GamePage;
