import React from "react";
import Topbar from "../../Topbar";
import Sidebar from "../../Sidebar";
import Stock from "../../../BloodBank/Stock/Stock";
import { Grid } from "@mui/material";

const Index = () => {
  return (
    <div style={{ backgroundColor: "#252424", color: "#EDEDED" }}>
      <Topbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Stock />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
