"use client";
import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LazyGetTriggerType } from "@/types/LazyGetTrigger";
import { ResponseSearchGames } from "@/types/ResponseSearchGames";
import Theme from "@/styles/muiStyles";

interface PaginationComponentProps {
  pageQty: number;
  numPage: number;
  setNumPage: Dispatch<SetStateAction<number>>;
  handleGetSearchGames: LazyGetTriggerType;
  searchGameName: string;
  dataGameSearch: ResponseSearchGames;
  searchNumPage: number;
  setSearchNumPage: Dispatch<SetStateAction<number>>;
}

const PaginationComponent = ({
  pageQty,
  numPage,
  setNumPage,
  handleGetSearchGames,
  dataGameSearch,
  searchGameName,
  searchNumPage,
  setSearchNumPage,
}: PaginationComponentProps) => {
  return (
    <Theme>
      <Pagination
        count={pageQty}
        page={searchNumPage > 1 ? searchNumPage : numPage}
        variant='outlined'
        shape='rounded'
        size='large'
        defaultPage={1}
        sx={{
          ".Mui-selected": {
            backgroundColor: "#ED5564",
            color: "#fff",
          },
          ".MuiPagination-ul li": {
            margin: "2px",
          },
        }}
        onChange={(_, num) => {
          if (dataGameSearch) {
            console.log(dataGameSearch);

            handleGetSearchGames({ gameName: searchGameName, numberPage: num });
            setSearchNumPage(num);
            localStorage.setItem("searchPageNumber", JSON.stringify(num));
            return;
          }

          localStorage.setItem("pageNumber", JSON.stringify(num));
          setNumPage(num);
          return;
        }}
      />
    </Theme>
  );
};

export default PaginationComponent;
