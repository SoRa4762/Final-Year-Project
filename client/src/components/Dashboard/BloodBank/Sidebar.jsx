import { React, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Inventory2 from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import Group from "@mui/icons-material/Group";
import LocalHospitalIcon from "@mui/icons-material/LocalHospitalOutlined";
import LocalHospital from "@mui/icons-material/LocalHospital";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubble";
import Logout from "@mui/icons-material/Logout";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";

import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    position: "sticky",
    top: 0,
    height: "100vh",
    backgroundColor: "#252424",
    paddingTop: useTheme().spacing(10),
    borderRight: "1px solid #EDEDED",
  },

  icon: {
    [useTheme().breakpoints.up("md")]: {
      marginLeft: useTheme().spacing(2),
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
    marginBottom: useTheme().spacing(2),
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

const Sidebar = () => {
  const classes = useStyles();
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false, type: "" });
    navigate("/signIn");
  };

  return (
    <Container className={classes.container}>
      <Link to={`/bloodbank/${authState.id}`} className={classes.link}>
        <div className={classes.item}>
          {window.location.href === "http://localhost:3000/bloodbank" ? (
            <>
              <Inventory2
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 }, fontWeight: 600 }}
                className={classes.text}
              >
                Stock
              </Typography>
            </>
          ) : (
            <>
              <Inventory2OutlinedIcon
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 } }}
                className={classes.text}
              >
                Stock
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/bloodbank/userlist" className={classes.link}>
        <div className={classes.item}>
          {window.location.href ===
          "http://localhost:3000/bloodbank/userlist" ? (
            <>
              <Group
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 }, fontWeight: 600 }}
                className={classes.text}
              >
                Users
              </Typography>
            </>
          ) : (
            <>
              <GroupIcon
                sx={{
                  fontSize: { lg: 24, sm: 20 },
                }}
                className={classes.icon}
              />
              <Typography
                sx={{ fontSize: { lg: 18 } }}
                className={classes.text}
              >
                Users
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/bloodbank/messages" className={classes.link}>
        <div className={classes.item}>
          {window.location.href ===
          "http://localhost:3000/bloodbank/messages" ? (
            <>
              <ChatBubbleOutlineIcon
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
                Messages
              </Typography>
            </>
          ) : (
            <>
              <ChatBubbleOutlineOutlined
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
                Messages
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/bloodbank/transactions" className={classes.link}>
        <div className={classes.item}>
          <HistoryIcon
            sx={{
              fontSize: { lg: 24, sm: 20 },
              fontWeight: 600,
            }}
            className={classes.icon}
          />
          {window.location.href ===
          "http://localhost:3000/bloodbank/transactions" ? (
            <>
              <Typography
                sx={{ fontSize: { lg: 18 }, fontWeight: 600 }}
                className={classes.text}
              >
                Transactions
              </Typography>
            </>
          ) : (
            <>
              <Typography
                sx={{ fontSize: { lg: 18 } }}
                className={classes.text}
              >
                Transactions
              </Typography>
            </>
          )}
        </div>
      </Link>

      {/*TODO: later gotta get bloodbank id and add here so that only that blood bank can access this ?? */}
      <Link to={`/bloodbank/profile/${authState.id}`} className={classes.link}>
        <div className={classes.item}>
          {window.location.href ===
          `http://localhost:3000/bloodbank/profile/${authState.id}` ? (
            <>
              <LocalHospital
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
                Profile
              </Typography>
            </>
          ) : (
            <>
              <LocalHospitalIcon
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
                Profile
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/bloodbank/roles" className={classes.link}>
        <div className={classes.item}>
          {window.location.href === "http://localhost:3000/bloodbank/roles" ? (
            <>
              <SwitchAccessShortcutIcon
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
                Settings
              </Typography>
            </>
          ) : (
            <>
              <SwitchAccessShortcutIcon
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
                Settings
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
    </Container>
  );
};

export default Sidebar;
