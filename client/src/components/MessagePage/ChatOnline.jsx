import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  chatOnlineFriend: {
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: useTheme().spacing(1.5),
  },

  chatOnlineImgContainer: {
    position: "relative",
    marginRight: 5,
  },

  chatOnlineImg: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #fff",
    [useTheme().breakpoints.down("md")]: {
      width: 30,
      height: 30,
    },
  },

  chatOnlineBadge: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "lime",
    position: "absolute",
    top: 0,
    right: 0,
    [useTheme().breakpoints.down("md")]: {
      width: 10,
      height: 10,
    },
  },

  chatOnlineName: {
    marginLeft: useTheme().spacing(1),
  },
}));

const ChatOnline = () => {
  const classes = useStyles();
  return (
    <div className={classes.chatOnline}>
      <div className={classes.chatOnlineFriend}>
        <div className={classes.chatOnlineImgContainer}>
          <img
            className={classes.chatOnlineImg}
            src="https://www.kolpaper.com/wp-content/uploads/2020/12/Minato-Wallpaper-10.jpg"
            alt=""
          />
          <div className={classes.chatOnlineBadge}></div>
        </div>
        <span className={classes.chatOnlineName}>Zora Sama</span>
      </div>
    </div>
  );
};

export default ChatOnline;
