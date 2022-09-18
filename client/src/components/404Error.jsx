import React from "react";
import NotFound from "../images/404.svg";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  bg: {
    background: "#a3a3a3",
    height: 300,
    width: 300,
    borderRadius: "50%",
    objectFit: "contain",
    [useTheme().breakpoints.down("sm")]: {
      height: 150,
      width: 150,
    },
  },
}));

const NotFoundError = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        background: "#252424",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100wh",
      }}
    >
      <img className={classes.bg} src={NotFound} alt="404 not found" />
      <Typography
        variant="body2"
        sx={{
          color: "white",
          marginLeft: useTheme().spacing(1),
          fontSize: { sm: 24, xs: 12 },
        }}
      >
        The Site Could Not Be Found
      </Typography>
    </div>
  );
};

export default NotFoundError;
