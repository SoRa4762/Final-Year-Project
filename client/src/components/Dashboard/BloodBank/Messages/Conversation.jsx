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
    <div className={classes.conversation}>
      <img
        className={classes.conversationImg}
        src="https://fsb.zobj.net/crop.php?r=JVWBQrHKa-7db-9Mdq63RmwsY8RpcdH2B4y6tYI8V9kQtzWFp0cXox0XIdkSMrpc7zroK1geIZ2UImYSxM8vsJLX6LlUH-tlFB2RFY9i4QwRbAi1JY05rpwrY2B3speUngoXw4Yh4wXXK0ml7V8Dd4UqlxLXEGXYeu1CNgjmluPjPO0NXwh10Gue6YxLs5Sj6CkazCxT0FsHo84Y"
        alt=""
      />
      <span className={classes.conversationName}>Sora</span>
    </div>
  );
};

export default Conversation;
