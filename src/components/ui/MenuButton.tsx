import * as React from "react";
import { styled } from "@mui/material/styles";
import { IoIosArrowDown } from "react-icons/io";
import { Response } from "@/types/Response";
import { createTheme } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import Link from "next/link";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed5564",
    },
    secondary: {
      main: "#23374a",
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
      "&:active": {
        backgroundColor: theme.palette.common.black,
      },
    },
  },
}));

interface MenuButtonProps {
  name: string;
  dataPlatforms: Response[];
}

const MenuButton = ({ name, dataPlatforms }: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className='bg-[--light-black] flex items-center justify-center hover:bg-[--accent-color]'
        id='demo-customized-button'
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        variant='contained'
        onClick={handleClick}
        endIcon={<IoIosArrowDown />}
        color={theme.palette.secondary.main}
      >
        {name}
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
        {dataPlatforms.map((item: Response) => {
          return (
            <MenuItem
              className='hover:bg-[--accent-color] hover:text-[--white-color]'
              key={item.id}
              onClick={handleClose}
              disableRipple
            >
              <Link className='w-full' href={`/games/platforms/${item.id}`}>
                {item.name}
              </Link>
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
};

export default MenuButton;
