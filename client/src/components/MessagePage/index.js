import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../Navbar";
import Feed from "./Feed";
import Sidebar from "../Sidebar";

const Index = () => {
  return (
    <div>
      <Navbar />
      <Grid container sx={{ backgroundColor: "#252424" }}>
        <Grid item xs={2} sm={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={9}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
