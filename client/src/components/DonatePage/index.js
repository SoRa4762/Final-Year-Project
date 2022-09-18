import React from "react";
import { Grid } from "@mui/material";
// import { createStyles } from "@mui/styles";
import Navbar from "../Navbar";
import Feed from "./Feed";
import Sidebar from "../Sidebar";

// const useStyles = createStyles((theme) => ({}));

const Index = () => {
  // const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid container>
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
