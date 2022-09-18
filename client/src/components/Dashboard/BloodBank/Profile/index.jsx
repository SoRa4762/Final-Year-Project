import React from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import Profile from "../../../Profile/Profile";
import Feed from "../../../PostFeed/Feed";
import Add from "../../../AddPost/Add";
import { Grid } from "@mui/material";
// import { AuthContext } from "../../../helpers/AuthContext";
import { useParams } from "react-router";

const Index = () => {
  // const { authState } = useContext(AuthContext);
  let { id } = useParams();

  return (
    <div style={{ backgroundColor: "#252424", color: "#EDEDED" }}>
      <Topbar />
      <Grid container>
        <Grid item xs={2} sm={3} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={9} md={10}>
          <Profile />
          <Feed id={id} />
        </Grid>
        <Add />
      </Grid>
    </div>
  );
};

export default Index;
