import React, { useContext, useEffect } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import Feed from "../../../PostFeed/Feed";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";

const Index = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signUp");
    } else if (authState.type === "bloodbank") {
      navigate("/bloodbank");
    } else if (authState.type === "user") {
      navigate("/user");
    }
  }, []);

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
