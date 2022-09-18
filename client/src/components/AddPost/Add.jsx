import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Fab,
  IconButton,
  // MenuItem,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useTheme } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DateTimePicker from "@mui/lab/DateTimePicker";
import CameraIcon from "@mui/icons-material/Camera";

const useStyles = makeStyles((theme) => ({
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

const Add = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //For Snackbar
  const [openAlert, setOpenAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    setSuccessAlert(false);
    setFailureAlert(false);
  };

  // const [value, setValue] = React.useState(new Date());
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const upload = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "epfcquae");

    if (image === "") {
      axios
        .post(
          "http://localhost:3006/posts",
          {
            title: title,
            desc: desc,
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
            .post(
              "http://localhost:3006/posts",
              {
                image: fileName,
                title: title,
                desc: desc,
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

  return (
    <>
      <Tooltip
        title="Add a Post?"
        aria-label="Add"
        onClick={() => setOpen(true)}
      >
        <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 20 }}>
          <CreateIcon />
        </Fab>
      </Tooltip>

      <Modal open={open}>
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
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Create a Post
            </Typography>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                variant="standard"
                label="Title"
                size="small"
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
                  image
                    ? URL.createObjectURL(image)
                    : require("../../images/undraw_posting_photo_re_plk8.svg")
                        .default
                }
                alt="upload img"
              />

              <IconButton
                sx={{
                  position: "absolute",
                  background: "transparent",
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
                  onChange={(e) => setImage(e.target.files[0])}
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
                  upload();
                  setOpen(false);
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
                Create
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => setOpen(false)}
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

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Your Post is Being Uploaded!
        </Alert>
      </Snackbar>

      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your Post was Uploaded!
        </Alert>
      </Snackbar>

      <Snackbar
        open={failureAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Your Post Failed to be Uploaded!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Add;
