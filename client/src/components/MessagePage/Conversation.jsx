import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  conversation: {
    marginTop: useTheme().spacing(1),
    display: "flex",
    alignItems: "center",
    padding: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#AEADA3",
    },
  },

  conversationImg: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: useTheme().spacing(1),
    [useTheme().breakpoints.down("md")]: {
      width: 30,
      height: 30,
      marginRight: useTheme().spacing(0),
    },
  },

  conversationName: {
    fontWeight: 500,
    fontSize: 18,
    [useTheme().breakpoints.down("md")]: {
      fontSize: 14,
    },
    [useTheme().breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Conversation = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.conversation}>
        <img
          className={classes.conversationImg}
          src="https://cdn.pixabay.com/photo/2018/10/26/06/55/anime-3773979_640.png"
          alt=""
        />
        <span className={classes.conversationName}>Otaku Sama</span>
      </div>
      <div className={classes.conversation}>
        <img
          className={classes.conversationImg}
          src="https://www.kolpaper.com/wp-content/uploads/2020/12/Minato-Wallpaper-10.jpg"
          alt=""
        />
        <span className={classes.conversationName}>Zora </span>
      </div>
    </>
  );
};

export default Conversation;
