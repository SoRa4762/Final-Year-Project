import { React, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";

import GroupIcon from "@mui/icons-material/Group";
import Group from "@mui/icons-material/GroupOutlined";
import LocalHospitalIcon from "@mui/icons-material/LocalHospitalOutlined";
import LocalHospital from "@mui/icons-material/LocalHospital";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import BookIcon from "@mui/icons-material/BookOutlined";
import Book from "@mui/icons-material/Book";

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
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false, type: "" });
    navigate("/signIn");
  };

  return (
    <Container className={classes.container}>
      <Link to="/admin" className={classes.link}>
        <div className={classes.item}>
          {window.location.href === "http://localhost:3000/admin" ? (
            <>
              <GroupIcon
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
                Users
              </Typography>
            </>
          ) : (
            <>
              <Group
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
                Users
              </Typography>
            </>
          )}
        </div>
      </Link>
      <Link to="/admin/bloodbanks" className={classes.link}>
        <div className={classes.item}>
          {window.location.href === "http://localhost:3000/admin/bloodbanks" ? (
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
                Blood Banks
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
                Blood Banks
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/admin/transactions" className={classes.link}>
        <div className={classes.item}>
          <HistoryIcon
            sx={{
              fontSize: { lg: 24, sm: 20 },
              fontWeight: 600,
            }}
            className={classes.icon}
          />
          {window.location.href ===
          "http://localhost:3000/admin/transactions" ? (
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

      <Link to="/admin/posts" className={classes.link}>
        <div className={classes.item}>
          {window.location.href === "http://localhost:3000/admin/posts" ? (
            <>
              <Book
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
                Posts
              </Typography>
            </>
          ) : (
            <>
              <BookIcon
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
                Posts
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
