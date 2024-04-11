"use client";
import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LazyGetTriggerType } from "@/types/LazyGetTrigger";
import { getSessionStorage } from "@/utils/getSessionStorage";
import Theme from "@/styles/muiStyles";

interface PaginationComponentProps {
  pageQty: number;
  numPage?: number;
  setNumPage?: Dispatch<SetStateAction<number>>;
  handleGetSearchGames?: LazyGetTriggerType;
  searchGameName?: string;
  searchNumPage?: number;
  setSearchNumPage?: Dispatch<SetStateAction<number>>;
}

const PaginationComponent = ({
  pageQty,
  numPage,
  setNumPage,
  handleGetSearchGames,
  searchNumPage,
  setSearchNumPage,
}: PaginationComponentProps) => {
  const storageInputSearch = getSessionStorage("searchInputValue");
  const isSearchGamesPage =
    window.location.pathname === `/games/search/${storageInputSearch}`;

  return (
    <Theme>
      <Pagination
        count={pageQty}
        page={searchNumPage ? searchNumPage : numPage}
        variant='outlined'
        shape='rounded'
        size='large'
        defaultPage={1}
        sx={{
          ".Mui-selected": {
            backgroundColor: "rgb(237, 85, 100) !important",
            color: "#fff",
          },
          ".MuiPagination-ul li": {
            margin: "2px",
          },
        }}
        onChange={(_, num) => {
          if (isSearchGamesPage) {
            const searchGameName = getSessionStorage("searchInputValue");

            if (handleGetSearchGames) {
              handleGetSearchGames({
                gameName: searchGameName,
                numberPage: num,
              });
            }

            if (setSearchNumPage) {
              setSearchNumPage(num);
              sessionStorage.setItem("searchPageNumber", JSON.stringify(num));
              return;
            }
          }

          sessionStorage.setItem("pageNumber", JSON.stringify(num));

          if (setNumPage) {
            setNumPage(num);
          }

          return;
        }}
      />
    </Theme>
  );
};

export default PaginationComponent;
