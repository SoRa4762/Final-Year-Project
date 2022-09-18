import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CameraIcon from "@mui/icons-material/Camera";
import {
  Button,
  CardMedia,
  Container,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { Image } from "cloudinary-react";
import { useParams } from "react-router";
import { AuthContext } from "../helpers/AuthContext";

const useStyles = makeStyles((theme) => ({
  profileRightTop: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 0,
  },

  profileCover: {
    marginTop: useTheme().spacing(8),
    height: 370,
    position: "relative",
    [useTheme().breakpoints.down("sm")]: {
      height: 330,
    },
  },

  userCoverImg: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    position: "relative",
    cursor: "pointer",
    [useTheme().breakpoints.down("sm")]: {
      height: 275,
    },
  },

  userProfileImg: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: "5%",
    right: "80%",
    margin: "auto",
    top: 210,
    border: "4px solid #252424",
    cursor: "pointer",
    [useTheme().breakpoints.down("sm")]: {
      width: 115,
      height: 115,
    },
  },

  profileCoverChange: {
    marginTop: useTheme().spacing(1),
    height: 370,
    position: "relative",
    [useTheme().breakpoints.down("sm")]: {
      height: 240,
    },
  },

  userCoverImgChange: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    position: "relative",
    cursor: "pointer",
    marginTop: 0,
    [useTheme().breakpoints.down("sm")]: {
      height: 175,
    },
  },

  userProfileImgChange: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: "5%",
    right: "80%",
    margin: "auto",
    top: 210,
    border: "4px solid #252424",
    cursor: "pointer",
    [useTheme().breakpoints.down("sm")]: {
      top: 125,
      width: 115,
      height: 115,
    },
  },

  profileInfo: {
    marginLeft: "5%",
    color: "#EDEDED",
    display: "flex",
    flexDirection: "column",
  },

  userInfoName: {
    fontWeight: "bold",
    fontSize: 24,
  },
  userInfoBio: {
    fontSize: 14,
    [useTheme().breakpoints.up("sm")]: {
      fontSize: 18,
    },
  },

  userInfoDescription: {
    fontSize: 12,
    [useTheme().breakpoints.up("sm")]: {
      fontSize: 16,
    },
  },

  item: {
    marginTop: useTheme().spacing(1),
    marginBottom: useTheme().spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [openCoverImage, setOpenCoverImage] = useState(false);
  const [openProfileImage, setOpenProfileImage] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [pendingAlert, setPendingAlert] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    setPendingAlert(false);
    setFailureAlert(false);
  };

  //getting users info for profile
  const [user, setUser] = useState({});
  const [totalDontation, setTotalDonation] = useState({});
  const [changeCover, setChangeCover] = useState("");
  const [changeProfile, setChangeProfile] = useState("");
  const [changeUsername, setChangeUsername] = useState(user.username);
  const [changeBio, setChangeBio] = useState(user.bio);
  const [changeLocation, setChangeLocation] = useState(user.location);

  //getting params
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3006/users/${id}`).then((response) => {
      setUser(response.data.indiInfo);
      setTotalDonation(response.data.totalDonation);
    });
  }, [id]);

  //update user Profile
  const updateUserProfile = (id) => {
    const formData1 = new FormData();
    formData1.append("file", changeCover);
    formData1.append("upload_preset", "epfcquae");

    const formData2 = new FormData();
    formData2.append("file", changeProfile);
    formData2.append("upload_preset", "epfcquae");

    if (changeCover === "" && changeProfile === "") {
      axios
        .put(
          `http://localhost:3006/users/${id}`,
          {
            username: changeUsername,
            bio: changeBio,
            location: changeLocation,
            id: id,
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
            setOpenAlert(true);
          }
        });
    } else if (changeProfile && changeCover) {
      axios
        .post(
          "http://api.cloudinary.com/v1_1/soragatrasambandha/image/upload",
          formData1
        )
        .then((response) => {
          const fileName1 = response.data.public_id;

          axios
            .post(
              "http://api.cloudinary.com/v1_1/soragatrasambandha/image/upload",
              formData2
            )
            .then((response) => {
              const fileName2 = response.data.public_id;
              setAuthState({
                ...authState,
                profilePicture: fileName2,
              });

              axios
                .put(
                  `http://localhost:3006/users/${id}`,
                  {
                    coverPhoto: fileName1,
                    profilePicture: fileName2,
                    username: changeUsername,
                    bio: changeBio,
                    location: changeLocation,
                    id: id,
                  },
                  {
                    headers: {
                      accessToken: localStorage.getItem("accessToken"),
                    },
                  }
                )
                .then((response) => {
                  if (response.data.error) {
                    setFailureAlert(true);
                  } else {
                    window.location.reload();
                    setOpenAlert(true);
                  }
                });
            });
        });
    } else if (changeCover) {
      axios
        .post(
          "http://api.cloudinary.com/v1_1/soragatrasambandha/image/upload",
          formData1
        )
        .then((response) => {
          // console.log(response.data.public_id);
          const fileName1 = response.data.public_id;

          axios
            .put(
              `http://localhost:3006/users/${id}`,
              {
                coverPhoto: fileName1,
                username: changeUsername,
                bio: changeBio,
                location: changeLocation,
                id: id,
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
                setOpenAlert(true);
              }
            });
        });
    } else if (changeProfile) {
      axios
        .post(
          "http://api.cloudinary.com/v1_1/soragatrasambandha/image/upload",
          formData2
        )
        .then((response) => {
          // console.log(response.data.public_id);
          const fileName2 = response.data.public_id;
          setAuthState({
            ...authState,
            profilePicture: fileName2,
          });

          axios
            .put(
              `http://localhost:3006/users/${id}`,
              {
                profilePicture: fileName2,
                username: changeUsername,
                bio: changeBio,
                location: changeLocation,
                id: id,
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
                setOpenAlert(true);
              }
            });
        });
    }
  };

  return (
    <div className={classes.profileRight}>
      <div className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          <Image
            onClick={() => {
              setOpenCoverImage(true);
            }}
            cloudName="soragatrasambandha"
            publicId={user.coverPhoto}
            className={classes.userCoverImg}
          />
          <Image
            onClick={() => {
              setOpenProfileImage(true);
            }}
            cloudName="soragatrasambandha"
            publicId={user.profilePicture}
            className={classes.userProfileImg}
          />
        </div>
        <div className={classes.profileInfo}>
          {/* profileInfo */}
          <h4 className={classes.userInfoName}>{user.username}</h4>
          <span className={classes.userInfoBio}>{user.bio}</span>
          <span className={classes.userInfoDescription}>
            <LocationOnOutlinedIcon sx={{ fontSize: { sm: 16, xs: 12 } }} />
            {user.location}
          </span>
          <span className={classes.userInfoDescription}>
            Total Donation:{" "}
            <span style={{ fontWeight: "bold" }}>{totalDontation.length}</span>
          </span>
          <span className={classes.userInfoDescription}>
            Credit Score:{" "}
            <span style={{ fontWeight: "bold" }}>
              {totalDontation.length * 3}
            </span>
          </span>
        </div>
        {authState.id === user.id || authState.type === "admin" ? (
          <Button
            variant="outlined"
            onClick={() => setEditProfile(true)}
            sx={{
              fontSize: { sm: 12, xs: 10, lg: 14 },
              position: "absolute",
              right: "5%",
              top: { xs: 375, sm: 400 },
              fontWeight: 600,
              color: "#EDEDED",
              borderRadius: 5,
              border: "2px #EDEDED solid",
              width: { md: "15%" },
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              "&:hover": {
                color: "#393939",
                backgroundColor: "#E5E0DD",
              },
            }}
          >
            Edit Profile
          </Button>
        ) : (
          //!needs some conditional rendering here as well
          <Button
            variant="outlined"
            sx={{
              fontSize: { sm: 12, xs: 10, lg: 14 },
              position: "absolute",
              right: "5%",
              top: { xs: 375, sm: 400 },
              fontWeight: 600,
              color: "#EDEDED",
              borderRadius: 5,
              border: "2px #EDEDED solid",
              width: { md: "15%" },
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              "&:hover": {
                color: "#393939",
                backgroundColor: "#E5E0DD",
              },
            }}
          >
            Add Companion
          </Button>
        )}
      </div>

      <Modal open={editProfile}>
        <Container
          sx={{
            width: 600,
            height: 600,
            alignItems: "center",
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
              height: "70vh",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </Typography>

          <div className={classes.profileCoverChange}>
            <div>
              {/* <Image
                className={classes.userCoverImgChange}
                cloudName="soragatrasambandha"
                publicId={user.coverPhoto}
              /> */}
              <img
                className={classes.userCoverImgChange}
                src={
                  changeCover
                    ? URL.createObjectURL(changeCover)
                    : require("../../images/noCoverPhoto.svg").default
                }
                alt="upload cover"
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
                  <CameraIcon sx={{ color: "#ededed", fontSize: 32 }} />
                </label>

                <input
                  type="file"
                  id="file1"
                  onChange={(e) => setChangeCover(e.target.files[0])}
                  style={{
                    display: "none",
                  }}
                />
              </IconButton>
            </div>

            <div>
              {/* <Image
                className={classes.userProfileImgChange}
                cloudName="soragatrasambandha"
                publicId={user.profilePicture}
              /> */}
              <img
                // onClick={() => }
                className={classes.userProfileImgChange}
                src={
                  changeProfile
                    ? URL.createObjectURL(changeProfile)
                    : require("../../images/noAvatar.svg").default
                }
                alt="upload profile"
              />
              <IconButton
                sx={{
                  left: { sm: "14%", xs: "15%" },
                  bottom: "15%",
                  zIndex: 999,
                }}
              >
                <label htmlFor="file">
                  <CameraIcon sx={{ color: "#ededed", fontSize: 32 }} />
                </label>

                <input
                  type="file"
                  id="file"
                  onChange={(e) => setChangeProfile(e.target.files[0])}
                  style={{
                    display: "none",
                  }}
                />
              </IconButton>
            </div>
          </div>

          <form
            action=""
            sx={{ padding: useTheme().spacing(2) }}
            autoComplete="off"
          >
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                defaultValue={user.username}
                variant="standard"
                label="Name"
                size="small"
                onBlurCapture={(e) => {
                  setChangeUsername(e.target.value);
                }}
                // setChangeUsername{user.username};
                sx={{
                  width: "100%",
                  color: "#EDEDED",
                }}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                defaultValue={user.bio}
                label="Bio"
                multiline
                rows={4}
                size="small"
                onChange={(e) => {
                  setChangeBio(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                defaultValue={user.location}
                variant="standard"
                label="Location"
                size="small"
                onBlur={(e) => {
                  setChangeLocation(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>
            <div className={classes.item}>
              <Button
                variant="contained"
                onClick={() => {
                  setPendingAlert(true);
                  setEditProfile(false);
                  updateUserProfile(user.id);
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
                Save
              </Button>
              <Button
                color="error"
                variant="contained"
                sx={{
                  background: "#d45439",
                  color: "#fff",
                  borderRadius: 5,
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
                onClick={() => setEditProfile(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your Profile Was Updated!
        </Alert>
      </Snackbar>

      <Snackbar
        open={pendingAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Your Profile is Being Updated!
        </Alert>
      </Snackbar>

      <Snackbar
        open={failureAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Your Profile Failed to be Updated!
        </Alert>
      </Snackbar>

      <Modal open={openCoverImage}>
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
          <IconButton onClick={() => setOpenCoverImage(false)}>
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

          <CardMedia title="Cover Photo">
            <Image
              cloudName="soragatrasambandha"
              publicId={user.coverPhoto}
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
                [useTheme().breakpoints.down("sm")]: {
                  mt: "50%",
                },
              }}
            />
          </CardMedia>
        </Container>
      </Modal>

      <Modal open={openProfileImage}>
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
          <IconButton onClick={() => setOpenProfileImage(false)}>
            <CloseIcon
              fontSize="large"
              sx={{
                position: "fixed",
                top: 20,
                right: 100,
                color: "#fff",
                // cursor: "pointer",
                [useTheme().breakpoints.down("sm")]: {
                  position: "fixed",
                  top: "15%",
                  right: "5%",
                },
              }}
            />
          </IconButton>

          <CardMedia title="Profile Picture">
            <Image
              cloudName="soragatrasambandha"
              publicId={user.profilePicture}
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
                [useTheme().breakpoints.down("sm")]: {
                  mt: "50%",
                },
              }}
            />
          </CardMedia>
        </Container>
      </Modal>
    </div>
  );
};

export default Profile;
