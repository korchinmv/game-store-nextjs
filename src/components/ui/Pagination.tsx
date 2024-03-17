"use client";
import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LazyGetTriggerType } from "@/types/LazyGetTrigger";
import Theme from "@/styles/muiStyles";
import { getSessionStorage } from "@/utils/getSessionStorage";

interface PaginationComponentProps {
  pageQty: number;
  numPage: number;
  setNumPage: Dispatch<SetStateAction<number>>;
  handleGetSearchGames: LazyGetTriggerType;
  searchGameName: string;
  searchNumPage: number;
  setSearchNumPage: Dispatch<SetStateAction<number>>;
}

const PaginationComponent = ({
  pageQty,
  numPage,
  setNumPage,
  handleGetSearchGames,
  searchGameName,
  searchNumPage,
  setSearchNumPage,
}: PaginationComponentProps) => {
  const storageInputSearch = getSessionStorage("searchInputValue");
  const isSearchGamesPage =
    window.location.pathname === `/games/search/${storageInputSearch}`;
  console.log(isSearchGamesPage);

  return (
    <Theme>
      <Pagination
        count={pageQty}
        page={searchNumPage ? searchNumPage : numPage}
        variant="outlined"
        shape="rounded"
        size="large"
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
          if (isSearchGamesPage) {
            handleGetSearchGames({ gameName: searchGameName, numberPage: num });
            setSearchNumPage(num);
            sessionStorage.setItem("searchPageNumber", JSON.stringify(num));
            return;
          }

          sessionStorage.setItem("pageNumber", JSON.stringify(num));
          setNumPage(num);
          return;
        }}
      />
    </Theme>
  );
};

export default PaginationComponent;
