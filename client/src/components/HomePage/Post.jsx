import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Container,
  Modal,
  Snackbar,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Image } from "cloudinary-react";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import CameraIcon from "@mui/icons-material/Camera";
import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icons: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#E5E0DD",
    borderTop: "1px solid #393939",
  },
  item: {
    marginBottom: useTheme().spacing(3),
  },
  imgUploadContainer: {
    marginTop: useTheme().spacing(1),
    height: 250,
    position: "relative",
    marginBottom: useTheme().spacing(2.5),
    [useTheme().breakpoints.down("sm")]: {
      height: 175,
    },
  },
  imgUpload: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    position: "relative",
    cursor: "pointer",
    marginTop: 0,
    [useTheme().breakpoints.down("sm")]: {
      height: 175,
    },
  },
}));

//TODO - getting post's data from the dummydata's data passed in to Feed.jsx

const Post = ({ post }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.Likes.length);
  const [isLiked, setIsLiked] = useState(true);
  const [openIndiPost, setOpenIndiPost] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editPost, setEditPost] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editNewComment, setEditNewComment] = useState("");

  //for user verification
  const { authState: currentUser } = useContext(AuthContext);

  //for delete Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //for Snackbar
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteAlert(false);
    setFailureAlert(false);
    setSuccessAlert(false);
    setOpenAlert(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3006/users/${post.UserId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUser(response.data.indiInfo);
      });
    axios.get(`http://localhost:3006/comments/${post.id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  // console.log(post.Likes);

  // useEffect(() => {
  //   setIsLiked(post.Likes.includes(currentUser.id));
  // }, [currentUser.id, post.Likes]);

  const likeHandler = (postId) => {
    axios
      .post(
        "http://localhost:3006/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.liked) {
          setLike(like + 1);
          setIsLiked(true);
          // socket.emit("sendNotification", {
          //   senderId: userId,
          // });
        } else {
          setLike(like - 1);
          setIsLiked(false);
        }
      });
  };

  const getIndiPost = (id) => {
    axios.get(`http://localhost:3006/posts/byId/${id}`).then((response) => {
      // console.log(response.data);
    });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3006/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        window.location.reload();
        setDeleteAlert(true);
      });
  };

  //adding comment
  const addComment = (id) => {
    axios
      .post(
        "http://localhost:3006/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            //this accessToken should match the name given to the accessToken in middleware
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          //!add Snackbar
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
            profilePicture: response.data.profilePicture,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  //updating comment
  const editAComment = (id) => {
    axios
      .put(
        `http://localhost:3006/comments/${id}`,
        {
          commentBody: editNewComment,
        },
        {
          headers: {
            //this accessToken should match the name given to the accessToken in middleware
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          //!add Snackbar
        } else {
          window.location.reload();
        }
      });
  };

  //deleting comment
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3006/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  //for Editing Posts
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  const image = post.image;
  const [newImage, setNewImage] = useState("");

  const updatePost = (postId) => {
    const formData = new FormData();
    formData.append("file", newImage);
    formData.append("upload_preset", "epfcquae");

    if (newImage === "") {
      axios
        .put(
          "http://localhost:3006/posts",
          {
            title: title,
            image: image,
            desc: desc,
            postId: postId,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          if (response.data.error) {
            setFailureAlert(true);
          } else {
            window.location.reload();
            setSuccessAlert(true);
          }
        });
    } else {
      axios
        .post(
          "http://api.cloudinary.com/v1_1/soragatrasambandha/image/upload",
          formData
        )
        .then((response) => {
          const fileName = response.data.public_id;
          axios
            .put(
              "http://localhost:3006/posts",
              {
                image: fileName,
                title: title,
                desc: desc,
                postId: postId,
              },
              {
                headers: { accessToken: localStorage.getItem("accessToken") },
              }
            )
            .then((response) => {
              if (response.data.error) {
                setFailureAlert(true);
              } else {
                window.location.reload();
                setSuccessAlert(true);
              }
            });
        });
    }
  };

  //!for notifications
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("http://localhost:5000"));
  // }, []);

  const handleNotification = (type) => {
    currentUser.socket.emit("sendNotification", {
      senderId: currentUser.id,
      senderName: currentUser.username,
      senderProfilePicture: currentUser.profilePicture,
      receiverId: post.UserId,
      type,
    });
  };

  // console.log(post.UserId);

  return (
    <>
      <Card
        sx={{
          marginTop: useTheme().spacing(5),
          color: "#fff",
          borderRadius: 5,
          // boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
          [useTheme().breakpoints.up("lg")]: {
            marginLeft: useTheme().spacing(3),
            marginRight: useTheme().spacing(3),
          },
        }}
      >
        <CardHeader
          sx={{
            backgroundColor: "#E5E0DD",
            color: "#393939",
          }}
          avatar={
            <Link to={`/profile/${post.UserId}`}>
              <Avatar sx={{ cursor: "pointer" }}>
                <Image
                  cloudName="soragatrasambandha"
                  publicId={user.profilePicture}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Avatar>
            </Link>
          }
          action={
            (currentUser.id === post.UserId ||
              currentUser.type === "admin") && (
              <>
                <AutoFixHighIcon
                  onClick={() => {
                    setEditPost(true);
                  }}
                  sx={{
                    color: "#393939",
                    marginRight: 1,
                    "&:hover": {
                      color: "#d45439",
                      cursor: "pointer",
                    },
                  }}
                />
                <DeleteOutlineIcon
                  onClick={() => {
                    deletePost(post.id);
                  }}
                  sx={{
                    color: "#393939",
                    marginRight: 1,
                    "&:hover": {
                      color: "#d45439",
                      cursor: "pointer",
                    },
                  }}
                />
              </>
            )
          }
          title={
            <Typography sx={{ fontWeight: "bold", mt: 0 }}>
              {user.username}
            </Typography>
          }
          subheader={
            <Typography sx={{ fontSize: 12 }}>
              {format(post.createdAt)}
            </Typography>
          }
        />

        <CardActionArea>
          <CardMedia onClick={() => setOpenImage(true)}>
            <Image
              style={{
                maxHeight: "500px",
                width: "100%",
                backgroundColor: "#AEADA3",
                objectFit: "contain",
              }}
              cloudName="soragatrasambandha"
              publicId={post?.image}
            />
          </CardMedia>

          <CardContent
            onClick={() => {
              setOpenIndiPost(true);
              getIndiPost(post.id);
            }}
            sx={{
              backgroundColor: "#E5E0DD",
              color: "#393939",
              borderTop: "1px solid #393939",
            }}
          >
            <Typography gutterBottom variant="h6" fontWeight="bold">
              {post?.title}
            </Typography>
            <Typography variant="body2">{post?.desc}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.icons}>
          <IconButton>
            {!isLiked ? (
              <FavoriteBorder
                onClick={() => {
                  likeHandler(post.id);
                  handleNotification(1);
                }}
                sx={{
                  color: "#393939",
                  "&:hover": {
                    color: "#d45439",
                  },
                }}
              ></FavoriteBorder>
            ) : (
              <Favorite
                onClick={() => {
                  likeHandler(post.id);
                }}
                sx={{
                  color: "#d45439",
                }}
              ></Favorite>
            )}
          </IconButton>
          <Typography
            sx={{
              color: "#d45439",
              ml: 1,
            }}
          >
            {like}
          </Typography>
          <IconButton>
            <CommentOutlinedIcon
              onClick={() => setOpenIndiPost(true)}
              sx={{
                color: "#393939",
                "&:hover": {
                  color: "#d45439",
                },
              }}
            ></CommentOutlinedIcon>
          </IconButton>
          <IconButton>
            <ShareOutlined
              sx={{
                color: "#393939",
                "&:hover": {
                  color: "#d45439",
                },
              }}
            ></ShareOutlined>
          </IconButton>
        </CardActions>

        <Modal open={editPost}>
          <Container
            sx={{
              width: 600,
              height: 555,
              backgroundColor: "#E5E0DD",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
              overflowY: "scroll",
              borderRadius: 5,
              [useTheme().breakpoints.down("sm")]: {
                width: "40vh",
                height: "57vh",
              },
            }}
          >
            <form
              action="submit"
              // onSubmit={upload}
              sx={{ padding: useTheme().spacing(2) }}
              autoComplete="off"
            >
              <Typography
                variant="h6"
                sx={{ color: "#000", fontWeight: "bold" }}
              >
                Update Post
              </Typography>
              <div className={classes.item}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Title"
                  size="small"
                  defaultValue={post?.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                />
              </div>

              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Tell Your Story..."
                  multiline
                  rows={4}
                  size="small"
                  defaultValue={post?.desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                />
              </div>

              <div className={classes.imgUploadContainer}>
                <img
                  className={classes.imgUpload}
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : require("../../images/undraw_posting_photo_re_plk8.svg")
                          .default
                  }
                  alt="upload img"
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <label htmlFor="file1">
                    <CameraIcon sx={{ color: "#000", fontSize: 32 }} />
                  </label>

                  <input
                    type="file"
                    id="file1"
                    onChange={
                      (e) => setNewImage(e.target.files[0])
                      // ((v) => setImage(e.target.files[0]),
                    }
                    style={{
                      display: "none",
                    }}
                  />
                </IconButton>
              </div>

              <div className={classes.item}>
                <Button
                  color="success"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    updatePost(post.id);
                    setEditPost(false);
                    setOpenAlert(true);
                  }}
                  sx={{
                    mr: 1,
                    background: "white",
                    color: "#000",
                    borderRadius: 5,
                    fontWeight: "bold",
                    "&:hover": {
                      color: "#000",
                      background: "#EDEDED",
                    },
                  }}
                >
                  Update
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setEditPost(false)}
                  sx={{
                    background: "#d45439",
                    color: "#fff",
                    borderRadius: 5,
                    fontWeight: "bold",
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Container>
        </Modal>

        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Your Post is Being Updated!
          </Alert>
        </Snackbar>

        <Snackbar
          open={successAlert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your Post was Updated!
          </Alert>
        </Snackbar>

        <Snackbar
          open={failureAlert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Your Post Failed to be Updated!
          </Alert>
        </Snackbar>

        <Modal open={openImage}>
          <Container
            sx={{
              maxWidth: "100vh",
              maxHeight: "100vh",
              backgroundColor: "transparent",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => setOpenImage(false)}>
              <CloseIcon
                fontSize="large"
                sx={{
                  position: "fixed",
                  top: 20,
                  right: 100,
                  color: "#fff",
                  [useTheme().breakpoints.down("sm")]: {
                    position: "fixed",
                    top: "15%",
                    right: "5%",
                  },
                }}
              />
            </IconButton>

            <Image
              cloudName="soragatrasambandha"
              publicId={post.image}
              style={{
                width: "100%",
                maxHeight: "100vh",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
                [useTheme().breakpoints.down("md")]: {
                  mt: "50%",
                },
              }}
            />
          </Container>
        </Modal>
      </Card>

      <Modal open={openIndiPost}>
        <Container
          sx={{
            maxHeight: "100vh",
            maxWeigtht: "100wh",
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setOpenIndiPost(false)}>
            <CloseIcon
              fontSize="large"
              sx={{
                position: "fixed",
                top: 20,
                right: 100,
                color: "#fff",
                [useTheme().breakpoints.down("sm")]: {
                  position: "fixed",
                  // top: "15%",
                  right: "5%",
                },
              }}
            />
          </IconButton>

          <Grid
            container
            spacing={0}
            sx={{ height: "100vh", overflowY: "scroll" }}
          >
            <Grid item xs={12} md={7}>
              <Card
                sx={{
                  marginTop: useTheme().spacing(5),
                  color: "#fff",
                  borderRadius: 5,
                  // boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                  [useTheme().breakpoints.up("lg")]: {
                    marginLeft: useTheme().spacing(3),
                    marginRight: useTheme().spacing(3),
                  },
                }}
              >
                <CardHeader
                  sx={{
                    backgroundColor: "#E5E0DD",
                    color: "#393939",
                  }}
                  avatar={
                    <Link to={`/profile/${post.UserId}`}>
                      <Avatar sx={{ cursor: "pointer" }}>
                        <Image
                          cloudName="soragatrasambandha"
                          publicId={user.profilePicture}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Avatar>
                    </Link>
                  }
                  action={
                    (currentUser.id === post.UserId ||
                      currentUser.type === "admin") && (
                      <IconButton aria-label="Delete">
                        <DeleteOutlineIcon
                          onClick={() => {
                            deletePost(post.id);
                            navigate("./home");
                          }}
                          sx={{
                            color: "#393939",
                            "&:hover": {
                              color: "#d45439",
                            },
                          }}
                        />
                      </IconButton>
                    )
                  }
                  title={
                    <Typography sx={{ fontWeight: "bold", mt: 0 }}>
                      {user.username}
                    </Typography>
                  }
                  subheader={
                    <Typography sx={{ fontSize: 12 }}>
                      {format(post.createdAt)}
                    </Typography>
                  }
                />

                <CardActionArea>
                  <CardMedia>
                    <Image
                      style={{
                        maxHeight: "500px",
                        width: "100%",
                        backgroundColor: "#AEADA3",
                        objectFit: "contain",
                      }}
                      cloudName="soragatrasambandha"
                      publicId={post?.image}
                    />
                  </CardMedia>

                  <CardContent
                    sx={{
                      backgroundColor: "#E5E0DD",
                      color: "#393939",
                      borderTop: "1px solid #393939",
                    }}
                  >
                    <Typography gutterBottom variant="h6" fontWeight="bold">
                      {post?.title}
                    </Typography>
                    <Typography variant="body2">{post?.desc}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.icons}>
                  <IconButton>
                    {!isLiked ? (
                      <FavoriteBorder
                        onClick={() => {
                          likeHandler(post.id);
                          handleNotification(1);
                        }}
                        sx={{
                          color: "#393939",
                          "&:hover": {
                            color: "#d45439",
                          },
                        }}
                      ></FavoriteBorder>
                    ) : (
                      <Favorite
                        onClick={() => {
                          likeHandler(post.id);
                          // handleNotification(1);
                        }}
                        sx={{
                          color: "#d45439",
                        }}
                      ></Favorite>
                    )}
                  </IconButton>
                  <Typography
                    sx={{
                      color: "#d45439",
                      ml: 1,
                    }}
                  >
                    {like}
                  </Typography>
                  <IconButton>
                    <CommentOutlinedIcon
                      sx={{
                        color: "#393939",
                        "&:hover": {
                          color: "#d45439",
                        },
                      }}
                    ></CommentOutlinedIcon>
                  </IconButton>
                  <IconButton>
                    <ShareOutlined
                      sx={{
                        color: "#393939",
                        "&:hover": {
                          color: "#d45439",
                        },
                      }}
                    ></ShareOutlined>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <div
                style={{
                  marginTop: useTheme().spacing(5),
                  padding: useTheme().spacing(2),
                  backgroundColor: "#E5E0DD",
                  color: "#393939",
                  borderRadius: 18,
                }}
              >
                <Grid container sx={{ alignItems: "center" }}>
                  <Grid item xs={8} sx={{ margin: useTheme().spacing(1) }}>
                    <TextField
                      id="outlined-basic"
                      label="Add Comment"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      onChange={(e) => {
                        setNewComment(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} sx={{ margin: useTheme().spacing(1) }}>
                    <Button
                      color="success"
                      variant="contained"
                      type="submit"
                      onClick={() => {
                        addComment(post.id);
                        handleNotification(2);
                        // window.location.reload();
                      }}
                      sx={{
                        mr: 1,
                        background: "white",
                        color: "#000",
                        borderRadius: 5,
                        fontWeight: "bold",
                        "&:hover": {
                          color: "#000",
                          background: "#EDEDED",
                        },
                      }}
                    >
                      Comment
                    </Button>
                  </Grid>
                </Grid>

                {comments.map((comment, key) => {
                  return (
                    <Paper
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        padding: 10,
                      }}
                    >
                      {/* {comments.map((c) => { */}
                      <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                          <Link to={`/profile/${comment.UserId}`}>
                            <Avatar sx={{ cursor: "pointer" }}>
                              <Image
                                cloudName="soragatrasambandha"
                                publicId={comment.profilePicture}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Avatar>
                          </Link>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                          <Typography sx={{ fontWeight: "bold", mt: 0 }}>
                            {comment.username}
                          </Typography>
                          <Typography variant="body2">
                            {comment.commentBody}
                          </Typography>
                          <Typography sx={{ fontSize: 12 }}>
                            {format(comment.createdAt)}
                          </Typography>
                        </Grid>
                        {currentUser.id === comment.UserId ||
                        currentUser.type === "admin" ? (
                          editComment ? (
                            <Grid sx={{ mt: 2 }}>
                              <div className={classes.item}>
                                <TextField
                                  id="standard-basic"
                                  variant="standard"
                                  label="Edit Comment"
                                  size="small"
                                  multiline
                                  rows={4}
                                  fullWidth
                                  defaultValue={comment.commentBody}
                                  onChange={(e) => {
                                    setEditNewComment(e.target.value);
                                  }}
                                  sx={{ width: "100%" }}
                                />
                              </div>
                              <div className={classes.item}>
                                <Button
                                  color="success"
                                  variant="contained"
                                  onClick={() => {
                                    editAComment(comment.id);
                                  }}
                                  sx={{
                                    mr: 1,
                                    background: "white",
                                    color: "#000",
                                    borderRadius: 5,
                                    fontWeight: "bold",
                                    "&:hover": {
                                      color: "#000",
                                      background: "#EDEDED",
                                    },
                                  }}
                                >
                                  Comment
                                </Button>
                                <Button
                                  color="error"
                                  variant="contained"
                                  onClick={() => setEditComment(false)}
                                  sx={{
                                    background: "#d45439",
                                    color: "#fff",
                                    borderRadius: 5,
                                    fontWeight: "bold",
                                    "&:hover": {
                                      color: "#fff",
                                    },
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </Grid>
                          ) : (
                            <Grid sx={{ mt: 3 }}>
                              <IconButton className={classes.root}>
                                <AutoFixHighIcon
                                  onClick={() => {
                                    setEditComment(true);
                                  }}
                                  sx={{
                                    color: "#393939",
                                    "&:hover": {
                                      color: "#d45439",
                                    },
                                  }}
                                />
                              </IconButton>

                              <IconButton>
                                <DeleteOutlineIcon
                                  onClick={() => {
                                    deleteComment(comment.id);
                                  }}
                                  sx={{
                                    color: "#393939",
                                    "&:hover": {
                                      color: "#d45439",
                                    },
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          )
                        ) : (
                          <div style={{ display: "none" }}></div>
                        )}
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        style={{
                          margin: "30 0",
                        }}
                      />
                    </Paper>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Modal>

      <Snackbar
        open={deleteAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your Post Has Been Deleted!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Post;
