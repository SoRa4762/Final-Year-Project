import React from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import Feed from "./Feed";
import { Grid } from "@mui/material";

const Index = () => {
  return (
    <div style={{ backgroundColor: "#252424", color: "#EDEDED" }}>
      <Topbar />
      <Grid container>
        <Grid item xs={2} sm={3} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={9} md={10}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
