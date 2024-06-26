import { Box, Grid, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";

export default function Home() {
  const { folders } = useLoaderData();

  return (
    <>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        <UserMenu />
      </Box>
      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193/60%)" }}
      >
        <Grid item xs={3} style={{ height: "100%" }}>
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={9} style={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
