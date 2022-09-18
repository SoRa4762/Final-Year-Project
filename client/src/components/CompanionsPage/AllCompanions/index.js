import React from "react";
import { Grid } from "@mui/material";
// import { createStyles } from "@mui/styles";
import Navbar from "./Navbar";
import Feed from "./Feed";
import Leftbar from "../Leftbar";

// const useStyles = createStyles((theme) => ({}));

const Index = () => {
  // const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid container sx={{ backgroundColor: "#252424" }}>
        <Grid item xs={2} sm={3}>
          <Leftbar />
        </Grid>
        <Grid item xs={10} sm={9}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
