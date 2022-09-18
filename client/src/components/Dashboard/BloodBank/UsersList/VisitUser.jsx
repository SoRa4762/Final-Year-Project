import React from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import Profile from "../../../Profile/Profile";
import { Grid } from "@mui/material";
import Feed from "../../../PostFeed/Feed";
import { useParams } from "react-router";

const VisitUser = () => {
  let { id } = useParams();

  return (
    <div style={{ backgroundColor: "#252424", color: "#EDEDED" }}>
      <Topbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Profile />
          <Feed id={id} />
        </Grid>
      </Grid>
    </div>
  );
};

export default VisitUser;
