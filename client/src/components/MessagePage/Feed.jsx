import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: useTheme().spacing(8),
    color: "#fff",
  },

  chatBoxWrapper: {
    height: "calc(100vh - 60px)",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },

  chatMenuWrapper: {
    height: "100%",
    padding: 10,
    borderRight: "0.5px solid #ededed",
    [useTheme().breakpoints.down("sm")]: {
      // display: "none",
    },
  },

  chatOnlineWrapper: {
    height: "100%",
    padding: 10,
    [useTheme().breakpoints.down("sm")]: {
      display: "none",
    },
  },

  chatMenuInput: {
    width: "90%",
    padding: "10 0",
    border: "none",
    height: 40,
    backgroundColor: "#AEADA3",
    borderBottom: "2px solid #fff",
  },

  chatBoxTop: {
    height: "100vh",
    overflowY: "scroll",
    paddingRight: 10,
  },

  webkitScrollbar: {
    width: 10,
  },

  chatBoxBottom: {
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  chatMessageInput: {
    width: "90%",
    height: 50,
    padding: 10,
  },
}));

const Feed = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item sm={3.5} xs={2}>
          <div className={classes.chatMenuWrapper}>
            {/* <SearchIcon /> */}
            <input
              type="text"
              placeholder="Search"
              className={classes.chatMenuInput}
            />
            <Conversation />
          </div>
        </Grid>
        <Grid item sm={5.5} xs={10}>
          <div className={classes.chatBoxWrapper}>
            <div className={classes.chatBoxTop}>
              <Message own={true} />
            </div>
            <div className={classes.chatBoxBottom}>
              <textarea
                className={classes.chatMessageInput}
                placeholder="Type..."
              ></textarea>
              <IconButton
                sx={{
                  justifyContent: "center",
                  fontWeight: 600,
                  color: "#EDEDED",
                  backgroundColor: "#4e9258",
                  borderRadius: 5,
                  marginLeft: { xs: 1 },
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#4e9258",
                  },
                }}
              >
                <SendIcon sx={{ fontSize: { lg: 24, sm: 20 } }} />
              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid item sm={3}>
          <div className={classes.chatOnlineWrapper}>
            <ChatOnline />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Feed;
