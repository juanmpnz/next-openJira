import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useEffect } from "react";
import { UiContext } from "@/context/ui";
import { useRouter } from "next/router";
import { getCookie, removeCookie, setCookie } from "@/utils/cookieManagment";

export const NavBar = () => {
  const { openSideMenu } = useContext(UiContext);
  const router = useRouter();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={openSideMenu}>
          <MenuIcon />
        </IconButton>
        <Typography
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
          variant="h6"
        >
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
