import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC } from "react";
import { NavBar , Sidebar} from "../ui";

interface Props {
  title?: string;
  children: any;
}

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar/>
      <Sidebar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
