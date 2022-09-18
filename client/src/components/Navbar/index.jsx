import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  navbar: {
    position: "fixed",
    [useTheme().breakpoints.down("sm")]: {
      height: "7%",
    },
  },
}));

const Navbar = () => {
  //getting users info for navbar name
  const [user, setUser] = useState({});

  //getting params
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3006/users/${id}`).then((response) => {
      setUser(response.data.indiInfo);
      // setProfilePicture(response.data.profilePicure);
    });
  }, [id]);
  const classes = useStyles({});
  return (
    <AppBar
      className={classes.navbar}
      sx={{
        //background: "rgba(255, 255, 255, 0.2)",
        background: "transparent",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar>
        {(() => {
          if (window.location.pathname === "/home") {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                Home
              </Typography>
            );
          } else if (window.location.pathname === "/request") {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                Request Blood
              </Typography>
            );
          } else if (window.location.pathname === "/donate") {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                Donate Blood
              </Typography>
            );
          } else if (window.location.pathname === "/notifications") {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                Notifications
              </Typography>
            );
          } else if (window.location.pathname === "/messages") {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                Messages
              </Typography>
            );
          } else if (window.location.pathname === "/companions") {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                Companion Requests
              </Typography>
            );
          } else if (window.location.pathname === `/profile/${id}`) {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                {user.username}
              </Typography>
            );
          } else if (window.location.pathname === "/user") {
            return (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: 20, xs: 18 },
                  fontWeight: 600,
                  backdropFilter: "blur(10)",
                  marginLeft: { lg: "7%", xs: 0 },
                }}
              >
                Account Setting
              </Typography>
            );
          }
        })()}

        {/* {window.location.pathname === "/home" ? (
          <Typography
            variant="h6"
            sx={{
              fontSize: { sm: 20, xs: 18 },
              fontWeight: 600,
              backdropFilter: "blur(10)",
              marginLeft: "7%",
              [useTheme().breakpoints.down("sm")]: {
                marginLeft: "0",
              },
            }}
          >
            Home
          </Typography>
        ) : (
          <>
            <Typography sx={{ display: "none" }}></Typography>
          </>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
