import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import { IoIosArrowDown } from "react-icons/io";
import { ResponseGenresData } from "@/types/ResponseGenresData";
import Link from "next/link";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

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
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
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

type Results = Pick<ResponseGenresData, "results">;

interface MenuButtonProps {
  name: string;
  dataPlatforms: Results[];
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
        {/* {dataPlatforms.map((item) => {
          <MenuItem onClick={handleClose} disableRipple>
            <Link href={`/${item.slug}`}>{item.name}</Link>
          </MenuItem>;
        })} */}
        <MenuItem
          className='text-[--bg-dark-red] hover:bg-[--accent-color]'
          onClick={handleClose}
          disableRipple
        >
          123123
        </MenuItem>

        <MenuItem
          className='text-[--bg-dark-red] hover:bg-[--accent-color]'
          onClick={handleClose}
          disableRipple
        >
          123123
        </MenuItem>
        <MenuItem
          className='text-[--bg-dark-red] hover:bg-[--accent-color]'
          onClick={handleClose}
          disableRipple
        >
          123123
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default MenuButton;
