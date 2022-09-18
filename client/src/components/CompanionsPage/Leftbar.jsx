import { React } from "react";
import { Container, Typography } from "@mui/material";
import Home from "@mui/icons-material/HomeOutlined";
import PersonAddIconOutlined from "@mui/icons-material/PersonAddOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

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
  return (
    <Container className={classes.container}>
      <Link to="/home" className={classes.link}>
        <div className={classes.item}>
          <Home
            sx={{
              fontSize: { lg: 24, sm: 20 },
              fontWeight: 600,
            }}
            className={classes.icon}
          />
          <Typography sx={{ fontSize: { lg: 18 } }} className={classes.text}>
            Home
          </Typography>
        </div>
      </Link>

      <Link to="/companions" className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === "/companions" ? (
            <>
              <PersonAddIcon
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
                Companions Requests
              </Typography>
            </>
          ) : (
            <>
              <PersonAddIconOutlined
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
                Companions Requests
              </Typography>
            </>
          )}
        </div>
      </Link>

      <Link to="/companions/companionslist" className={classes.link}>
        <div className={classes.item}>
          {window.location.pathname === "/companions/companionslist" ? (
            <>
              <PeopleAlt
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
                All Companions
              </Typography>
            </>
          ) : (
            <>
              <PeopleAltOutlined
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
                All Companions
              </Typography>
            </>
          )}
        </div>
      </Link>
    </Container>
  );
};

export default Leftbar;
