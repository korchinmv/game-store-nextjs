"use client";
import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LazyGetTriggerType } from "@/types/LazyGetTrigger";
import Theme from "@/styles/muiStyles";

interface PaginationComponentProps {
  pageQty: Number | null;
  numPage: Number;
  setNumPage: Dispatch<SetStateAction<Number>>;
  handleGetSearchGames: LazyGetTriggerType;
  searchGameName: string;
}

const PaginationComponent = ({
  pageQty,
  numPage,
  setNumPage,
  handleGetSearchGames,
  dataGameSearch,
  searchGameName,
}: PaginationComponentProps) => {
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
            console.log("searchGameName");

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
