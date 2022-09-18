import React from "react";
import { Grid } from "@mui/material";
// import { createStyles } from "@mui/styles";
import Navbar from "../Navbar";
import Feed from "./Feed.jsx";
import Sidebar from "../Sidebar/index";

// const useStyles = createStyles((theme) => ({}));

const Index = () => {
  // const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid container sx={{ backgroundColor: "#252424" }}>
        <Grid item xs={2} sm={3} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={9} md={8}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
