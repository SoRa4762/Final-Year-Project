import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../Navbar";
import Feed from "../PostFeed/Feed";
import Sidebar from "../Sidebar";
import Profile from "../Profile/Profile";
// import { AuthContext } from "../helpers/AuthContext";
import { useParams } from "react-router";

const Index = () => {
  // const { authState } = useContext(AuthContext);
  let { id } = useParams();
  return (
    <div>
      <Navbar />
      <Grid container sx={{ backgroundColor: "#252424" }}>
        <Grid item xs={2} sm={3}>
          <Sidebar id={id} />
        </Grid>
        <Grid item xs={10} sm={9}>
          <Profile />
          <Feed id={id} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
