import { React, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import BloodReceived from "@mui/icons-material/Bloodtype";
import BloodReceivedOutlined from "@mui/icons-material/BloodtypeOutlined";
import BloodDonation from "@mui/icons-material/VolunteerActivism";
import BloodDonationOutlined from "@mui/icons-material/VolunteerActivismOutlined";
import Notifications from "@mui/icons-material/Notifications";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubble";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import Logout from "@mui/icons-material/Logout";
import AccountBox from "@mui/icons-material/AccountBox";
import AccountBoxOutlined from "@mui/icons-material/AccountBoxOutlined";
import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Image } from "cloudinary-react";

const useStyles = makeStyles(() => ({
  container: {
    position: "sticky",
    top: 0,
    height: "100vh",
    backgroundColor: "#252424",
    paddingTop: useTheme().spacing(10),
    [useTheme().breakpoints.up("sm")]: {
      borderRight: "1px solid #EDEDED",
    },
  },

  icon: {
    [useTheme().breakpoints.up("md")]: {
      marginLeft: "22%",
      marginRight: useTheme().spacing(2),
    },
    [useTheme().breakpoints.up("sm")]: {
      marginRight: useTheme().spacing(1),
    },
  },

  item: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#EDEDED",
    marginBottom: useTheme().spacing(5),
    [useTheme().breakpoints.down("sm")]: {
      justifyContent: "center",
      color: "#fff",
    },
    "&:hover": {
      color: "#d45439",
    },
  },

  text: {
    display: "flex",
    flexWrap: "wrap",
    [useTheme().breakpoints.down("sm")]: {
      display: "none",
    },
  },

  image: {
    height: 26,
    width: 26,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    objectFit: "cover",
    [useTheme().breakpoints.up("md")]: {
      marginLeft: "22%",
      marginRight: useTheme().spacing(2),
    },
    [useTheme().breakpoints.up("sm")]: {
      marginRight: useTheme().spacing(1),
    },
    borderRadius: "50%",
  },

  link: {
    height: "100vh",
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
    [useTheme().breakpoints.up("sm")]: {
      color: "#555",
    },
  },
}));

const Leftbar = () => {
  const classes = useStyles();
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
      type: "",
      type2: "",
      bloodGroup: "",
      profilePicture: "",
    });
    navigate("/signIn");
  };

  return (
    <Container className={classes.container}>
      {/* <div>
          {SidebarData.map((val, key)=> {
            return ()
        })}
      </div> */}
      <Link to="/home" className={classes.link}>
        <div className={classes.item}>
          {/* {SidebarData.icon} */}
          {window.location.pathname === "/home" ? (
            <>
              <Home
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                  fontWeight: 600,
                }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 }, fontWeight: 600 }}
                className={classes.text}
              >
                Home
              </Typography>
            </>
          ) : (
            <>
              <HomeOutlined
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                  fontWeight: 600,
                }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 } }}
                className={classes.text}
              >
                Home
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/request" className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === "/request" ? (
            <>
              <BloodReceived
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                  fontWeight: 600,
                }}
                className={classes.icon}
              />
              <Typography
                sx={{
                  fontSize: { lg: 18 },
                  fontWeight: 600,
                }}
                className={classes.text}
              >
                Request Blood
              </Typography>
            </>
          ) : (
            <>
              <BloodReceivedOutlined
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                  fontWeight: 600,
                }}
                className={classes.icon}
              />
              <Typography
                sx={{
                  fontSize: { lg: 18 },
                }}
                className={classes.text}
              >
                Request Blood
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/donate" className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === "/donate" ? (
            <BloodDonation
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          ) : (
            <BloodDonationOutlined
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          )}
          <Typography sx={{ fontSize: { lg: 18 } }} className={classes.text}>
            Donate Blood
          </Typography>
        </div>
      </Link>

      <Link to="/notifications" className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === "/notifications" ? (
            <Notifications
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          ) : (
            <NotificationsOutlined
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          )}
          <Typography sx={{ fontSize: { lg: 18 } }} className={classes.text}>
            Notifications
          </Typography>
        </div>
      </Link>

      <Link to="/messages" className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === "/messages" ? (
            <ChatBubbleOutline
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          ) : (
            <ChatBubbleOutlineOutlined
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          )}
          <Typography sx={{ fontSize: { lg: 18 } }} className={classes.text}>
            Messages
          </Typography>
        </div>
      </Link>

      <Link to="/companions" className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === "/companions" ? (
            <PeopleAlt
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          ) : (
            <PeopleAltOutlined
              sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
              className={classes.icon}
            />
          )}
          <Typography sx={{ fontSize: { lg: 18 } }} className={classes.text}>
            Companions
          </Typography>
        </div>
      </Link>

      <Link to={`/profile/${authState.id}`} className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === `/profile/${authState.id}` ? (
            <>
              <AccountBox
                sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 }, fontWeight: 600 }}
                className={classes.text}
              >
                Profile
              </Typography>
            </>
          ) : (
            <>
              <AccountBoxOutlined
                sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 } }}
                className={classes.text}
              >
                Profile
              </Typography>
            </>
          )}
        </div>
      </Link>

      <div className={classes.item} onClick={logout}>
        <Logout
          sx={{ fontSize: { lg: 24, sm: 20 }, fontWeight: 600 }}
          className={classes.icon}
        />
        <Typography sx={{ fontSize: { lg: 18 } }} className={classes.text}>
          Log Out
        </Typography>
      </div>

      <Link to="/user" className={classes.link}>
        <div className={classes.item}>
          <Image
            cloudName="soragatrasambandha"
            publicId={authState.profilePicture}
            className={classes.image}
          />
          {window.location.pathname === "/user" ? (
            <Typography
              sx={{ fontSize: { lg: 18 }, fontWeight: 600 }}
              className={classes.text}
            >
              {authState.username}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: { lg: 18 } }} className={classes.text}>
              {authState.username}
            </Typography>
          )}
        </div>
      </Link>
    </Container>
  );
};

export default Leftbar;
