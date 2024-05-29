import * as React from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import { IoIosArrowDown } from "react-icons/io";
import { Response } from "@/types/Response";
import { createTheme } from "@mui/material/styles";
import { sortByButton } from "@/types/SortBy";
import Menu, { MenuProps } from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed5564",
    },
    secondary: {
      main: "#23374a",
      light: "#fff",
    },
  },
});

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 170,
    color: theme.palette.primary.main,
    boxShadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    "& .MuiMenu-list": {
      padding: "0",
    },
    "& .MuiMenuItem-root": {
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.light,
      },
      "&:active": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

interface MenuButtonProps {
  name: string;
  label: string;
  data: Response[] | sortByButton[];
  setState: React.Dispatch<React.SetStateAction<string | number | null>>;
}

const FilterButton = ({ name, data, label, setState }: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeMenuItem, setActiveMenuItem] = React.useState<string>("");

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = (item: Response | sortByButton) => {
    setAnchorEl(null);
    setActiveMenuItem(item.name);
    setState(item.id);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          style={{ lineHeight: "1" }}
          id='demo-customized-button'
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup='true'
          aria-expanded={open ? "true" : undefined}
          variant='contained'
          onClick={handleClick}
          endIcon={<IoIosArrowDown />}
          aria-label={label}
          sx={{ bgcolor: `theme.secondary.main` }}
        >
          {activeMenuItem ? activeMenuItem : name}
        </Button>
        <StyledMenu
          id='demo-customized-menu'
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {data.map((item: Response | sortByButton) => {
            return (
              <MenuItem
                key={item.id}
                onClick={() => handleChoose(item)}
                disableRipple
              >
                {item.name}
              </MenuItem>
            );
          })}
        </StyledMenu>
      </ThemeProvider>
    </>
  );
};

export default FilterButton;
