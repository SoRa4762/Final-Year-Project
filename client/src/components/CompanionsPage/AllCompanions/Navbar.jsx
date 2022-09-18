import React from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  navbar: {
    position: "fixed",
    [useTheme().breakpoints.down("sm")]: {
      height: "7%",
    },
  },
}));

const Navbar = () => {
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
          All Companions
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
