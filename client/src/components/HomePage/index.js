import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../Navbar";
import Feed from "../PostFeed/Feed";
import Sidebar from "../Sidebar";
import Add from "../AddPost/Add";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
// import { io } from "socket.io-client";

const Index = () => {
  const { authState, } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signUp");
    } else if (authState.type === "bloodbank") {
      navigate("/bloodbank");
    }
  }, []);

  // //!socket.io
  // const userId = authState.id;
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("http://localhost:5000"));
  //   console.log(socket);
  // }, []);

  // useEffect(() => {
  //   socket?.emit("addNewUser", userId);
  // }, [socket, userId]);
  // console.log(authState);

  return (
    <div style={{ backgroundColor: "#252424", color: "#EDEDED" }}>
      <Navbar />
      <Grid container>
        <Grid item xs={2} sm={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={9}>
          <Feed />
        </Grid>
      </Grid>
      <Add />
    </div>
  );
};
export default Index;
