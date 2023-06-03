import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { UiContext } from "@/context/ui";

export const NavBar = () => {
  const { openSideMenu } = useContext(UiContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={openSideMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
