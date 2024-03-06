"use client";
import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LazyGetTriggerType } from "@/types/LazyGetTrigger";
import { ResponseSearchGames } from "@/types/ResponseSearchGames";
import Theme from "@/styles/muiStyles";

interface PaginationComponentProps {
  pageQty: Number | undefined;
  numPage: Number;
  setNumPage: Dispatch<SetStateAction<Number>>;
  handleGetSearchGames: LazyGetTriggerType;
  searchGameName: String;
  dataGameSearch: ResponseSearchGames;
}

const PaginationComponent = ({
  pageQty,
  numPage,
  setNumPage,
  handleGetSearchGames,
  dataGameSearch,
  searchGameName,
}: PaginationComponentProps) => {
  console.log(dataGameSearch);

  return (
    <Theme>
      <Pagination
        count={pageQty}
        page={numPage}
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
            handleGetSearchGames({ gameName: searchGameName, numberPage: num });
            setNumPage(num);
            return;
          }

          setNumPage(num);
          return;
        }}
      />
    </Theme>
  );
};

export default PaginationComponent;
