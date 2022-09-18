import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { io } from "socket.io-client";
import { AuthContext } from "../helpers/AuthContext";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: useTheme().spacing(10),
    backgroundColor: "#252424",
  },
}));

const Feed = () => {
  let action;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    authState.socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    // return () => authState.socket.off("getNotification");
  }, [authState.socket]);
  // console.log(authState.socket);

  // console.log(notifications);

  return (
    <Container className={classes.container}>
      <>
        {notifications.length > 0 ? (
          notifications.map((senderInfo) => (
            <div key={senderInfo}>
              <List
                sx={{
                  // border: "1px solid #fff",
                  borderRadius: 2.5,
                  width: "100%",
                  bgcolor: "#ededed",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItem justifyContent="center" alignItems="center">
                  <ListItemAvatar>
                    <Avatar
                      component={Link}
                      to={"/profile/" + senderInfo.senderId}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          style={{
                            cursor: "pointer",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          cloudName="soragatrasambandha"
                          publicId={senderInfo.senderProfilePicture}
                        />
                      </div>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment style={{ color: "#ededed" }}>
                        <Typography
                          // <Link to={`/profile/${post.UserId}`}></Link>
                          component={Link}
                          to={"/profile/" + senderInfo.senderId}
                          sx={{
                            display: "inline",
                            fontWeight: "bold",
                            alignItems: "center",
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": {
                              color: "#000",
                            },
                          }}
                          variant="body1"
                          color="#000"
                        >
                          {senderInfo.senderName} {/*  {User.username} */}
                        </Typography>

                        <Typography
                          sx={{
                            display: "inline",
                            alignItems: "center",
                          }}
                          variant="body1"
                          color="#393939"
                        >
                          {/* {action} */}
                          {senderInfo.type === 1
                            ? (action = "liked your post")
                            : senderInfo.type === 2
                            ? (action = "commented on your post")
                            : senderInfo.type === 3
                            ? (action = "approved your donor request")
                            : senderInfo.type === 3
                            ? (action = "approved your donor request")
                            : senderInfo.type === 4
                            ? (action = "approved your receiver request")
                            : senderInfo.type === 5
                            ? (action = "accepted your donation request")
                            : (action = "accepted your help request")}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <Typography
                        sx={{
                          display: "inline",
                          alignItems: "center",
                        }}
                        component="span"
                        variant="body2"
                        color="#252525"
                      >
                        {format(senderInfo.createdAt)}
                      </Typography>
                    }
                  />
                </ListItem>

                <Divider sx={{ color: "#000" }} variant="middle" />
              </List>
            </div>
          ))
        ) : (
          <div>
            <List
              sx={{
                // border: "1px solid #fff",
                borderRadius: 5,
                width: "100%",
                bgcolor: "#ededed",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItem justifyContent="center" alignItems="center">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          fontWeight: "bold",
                          alignItems: "center",
                        }}
                        variant="body1"
                        color="#393939"
                      >
                        {"There are no notifications right now"}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        )}
      </>
    </Container>
  );
};

export default Feed;
