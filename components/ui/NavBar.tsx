import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { UiContext } from "@/context/ui";
import Link from "next/link";
import { useRouter } from "next/router";

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
