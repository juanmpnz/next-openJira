import React, { useContext } from "react";
import type { NextPage } from "next";
import {  Grid, Card, CardHeader, CardContent } from "@mui/material";

import { Layout } from "@/components/layouts";
import { EntriesContext } from "@/context/entries";
import { EntryList, NewEntrie } from "@/components/ui";

const HomePage: NextPage = () => {
  const { entries } = useContext(EntriesContext);
  console.log(process.env.NEXT_PUBLIC_CLIENT_KEY )
  return (
    <Layout title="Home - OJ">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <NewEntrie/>
            <CardContent>
              <EntryList status="pending"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso" />
          {/*   <NewEntrie/> */}
            <CardContent>
              <EntryList  status="in-progress"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Finalizadas" />
           {/*  <NewEntrie/> */}
            <CardContent>
              <EntryList  status="finished"/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
