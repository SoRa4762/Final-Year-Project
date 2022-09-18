import React, { useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PasswordIcon from "@mui/icons-material/Password";
import BloodReceivedOutlined from "@mui/icons-material/BloodtypeOutlined";
import BloodDonationOutlined from "@mui/icons-material/VolunteerActivismOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: useTheme().spacing(10),
    backgroundColor: "#252424",
  },
  item: {
    marginTop: useTheme().spacing(1),
    marginBottom: useTheme().spacing(2),
  },
}));

const Feed = () => {
  const classes = useStyles();
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  //!validation maybe?? for what? ahh.. for forms.. no way...
  //!god damn it man.. probably need to add validation...

  //for passwords
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3006/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.removeItem("accessToken");
          setAuthState({
            username: "",
            id: 0,
            status: false,
            type: "",
            type2: "",
            bloodGroup: "",
            profilePicture: "",
          });
          navigate("/signIn");
        }
      });
  };

  //for both donor and receiver
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  //for become a donor
  const [becomeDonor, setBecomeDonor] = useState(false);

  //!axios
  const addDonor = () => {
    axios
      .post(
        "http://localhost:3006/roles/donorbb",
        {
          email: email,
          phoneNumber: phoneNumber,
          location: location,
          city: city,
          zip: zip,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          //!alert for now.. but might add snackbar later..
          // setFailureAlert(true);
          alert(response.data.error);
        } else {
          //!same as above
          // setSuccessAlert(true);
          alert(
            "You've been placed on a pending list. Please wait for your approval!"
          );
        }
      });
  };

  //for become a receiver
  const [becomeReceiver, setBecomeReceiver] = useState(false);
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState("");

  //!axios
  const addReceiver = () => {
    axios
      .post(
        "http://localhost:3006/roles/receiverbb",
        {
          email: email,
          phoneNumber: phoneNumber,
          location: location,
          reason: reason,
          urgency: urgency,
          city: city,
          zip: zip,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          //!alert for now.. but might add snackbar later..
          // setFailureAlert(true);
          alert(response.data.error);
        } else {
          //!same as above
          // setSuccessAlert(true);
          alert(
            "You've been placed on a pending list. Please wait for your approval!"
          );
        }
      });
  };

  //!revert user
  const revertBack = () => {
    axios
      .delete("http://localhost:3006/roles/revert", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data);
        }
      });
  };

  return (
    <Container
      sx={{
        backgroundColor: "#252424",
        display: "flex",
        height: "100vh",
        width: "100wh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "80vh",
        }}
      >
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<PasswordIcon />}
            onClick={() => setChangePasswordOpen(true)}
            sx={{
              width: 300,
              fontSize: { lg: 18, sm: 16 },
              fontWeight: 600,
              color: "#EDEDED",
              borderRadius: 5,
              border: "2px #EDEDED solid",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              "&:hover": {
                color: "#393939",
                backgroundColor: "#E5E0DD",
              },
            }}
          >
            Change Password
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            startIcon={<BloodDonationOutlined />}
            onClick={() => setBecomeDonor(true)}
            sx={{
              fontSize: { lg: 18, sm: 16 },
              fontWeight: 600,
              color: "#EDEDED",
              width: 300,
              borderRadius: 5,
              border: "2px #EDEDED solid",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              "&:hover": {
                color: "#393939",
                backgroundColor: "#E5E0DD",
              },
            }}
          >
            Become a Donor
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            startIcon={<BloodReceivedOutlined />}
            onClick={() => setBecomeReceiver(true)}
            sx={{
              fontSize: { lg: 18, sm: 16 },
              fontWeight: 600,
              color: "#EDEDED",
              width: 300,
              borderRadius: 5,
              border: "2px #EDEDED solid",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              "&:hover": {
                color: "#393939",
                backgroundColor: "#E5E0DD",
              },
            }}
          >
            Become a Receiver
          </Button>
        </Grid>

        <Grid item>
          <Button
            //!Delete Request
            onClick={() => revertBack()}
            variant="outlined"
            startIcon={<PersonRemoveOutlinedIcon />}
            sx={{
              fontSize: { lg: 18, sm: 16 },
              fontWeight: 600,
              color: "#EDEDED",
              width: 300,
              borderRadius: 5,
              border: "2px #EDEDED solid",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              "&:hover": {
                color: "#393939",
                backgroundColor: "#E5E0DD",
              },
            }}
          >
            Revert Role
          </Button>
        </Grid>
      </Grid>

      {/* !Change Password */}
      <Modal open={changePasswordOpen}>
        <Container
          sx={{
            width: 400,
            height: 215,
            backgroundColor: "#E5E0DD",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            borderRadius: 5,
            [useTheme().breakpoints.down("sm")]: {
              width: "40vh",
              height: "25vh",
            },
          }}
        >
          <form
            action="submit"
            sx={{ padding: useTheme().spacing(2) }}
            autoComplete="off"
          >
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Change Password
            </Typography>
            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                type="password"
                variant="standard"
                label="Current Password"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="standard-basic"
                variant="standard"
                type="password"
                label="New Password"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>
            <div className={classes.item}>
              <Button
                onClick={changePassword}
                color="success"
                variant="contained"
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
                Confirm
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => setChangePasswordOpen(false)}
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

      {/* become a donor */}
      <Modal open={becomeDonor}>
        <Container
          sx={{
            width: 480,
            height: 391,
            backgroundColor: "#E5E0DD",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            borderRadius: 5,
            [useTheme().breakpoints.down("sm")]: {
              width: "40vh",
              height: "71vh",
            },
          }}
        >
          <form
            action="submit"
            sx={{ padding: useTheme().spacing(2) }}
            autoComplete="off"
          >
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Switch to Donor
            </Typography>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="Email"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                type="number"
                variant="standard"
                label="Phone Number"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="Location"
                size="small"
                autoComplete="off"
                placeholder="Itahari - 2, Shantinagar"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="City"
                size="small"
                autoComplete="off"
                placeholder="Itahari"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="ZIP/Postal Code"
                size="small"
                autoComplete="off"
                placeholder="56750"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <Button
                // component={Link}
                onClick={() => {
                  setBecomeDonor(false);
                  addDonor();
                }}
                color="success"
                variant="contained"
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
                Confirm
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => setBecomeDonor(false)}
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

      {/* become a receiver */}
      <Modal open={becomeReceiver}>
        <Container
          sx={{
            width: 500,
            height: 551,
            backgroundColor: "#E5E0DD",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            borderRadius: 5,
            [useTheme().breakpoints.down("sm")]: {
              width: "40vh",
              height: "88vh",
            },
          }}
        >
          <form
            action="submit"
            sx={{ padding: useTheme().spacing(2) }}
            autoComplete="off"
          >
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Switch to Receiver
            </Typography>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="Email"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                type="number"
                variant="standard"
                label="Phone Number"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="Location"
                size="small"
                autoComplete="off"
                placeholder="Itahari - 2, Shantinagar"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="City"
                size="small"
                autoComplete="off"
                placeholder="Itahari"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="ZIP/Postal Code"
                size="small"
                autoComplete="off"
                placeholder="56750"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={2}
                label="Reason"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setReason(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                select
                label="Urgency"
                size="small"
                sx={{ width: "100%" }}
                helperText="Please Select Based on the Severity"
                value={urgency}
                onChange={(e) => {
                  setUrgency(e.target.value);
                }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Minor">Minor</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Major">Major</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            </div>

            <div className={classes.item}>
              <Button
                // component={Link}
                onClick={() => {
                  setBecomeReceiver(false);
                  addReceiver();
                }}
                color="success"
                variant="contained"
                // startIcon={<SearchIcon />}
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
                Confirm
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => setBecomeReceiver(false)}
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
    </Container>
  );
};

export default Feed;
