import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PasswordIcon from "@mui/icons-material/Password";
import BloodReceivedOutlined from "@mui/icons-material/BloodtypeOutlined";
import BloodDonationOutlined from "@mui/icons-material/VolunteerActivismOutlined";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Image } from "cloudinary-react";
import { format } from "timeago.js";

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
  const [age, setAge] = useState(0);
  const [bloodType, setBloodType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  //for become a donor
  const [becomeDonor, setBecomeDonor] = useState(false);
  const [disease, setDisease] = useState("");

  //!axios
  const addDonor = () => {
    axios
      .post(
        "http://localhost:3006/roles/donor",
        {
          age: age,
          email: email,
          bloodType: bloodType,
          phoneNumber: phoneNumber,
          location: location,
          disease: disease,
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
        "http://localhost:3006/roles/receiver",
        {
          age: age,
          email: email,
          bloodType: bloodType,
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

  //!for requests
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [unDonors, setUnDonors] = useState([]);
  const [unReceivers, setUnReceivers] = useState([]);
  const { authState } = useContext(AuthContext);
  const username = authState.username;
  const profilePicture = authState.profilePicture;
  const userId = authState.id;

  //getting requests
  const gettingRequests = () => {
    axios
      .get("http://localhost:3006/transactions/getHelpRequests", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUnReceivers(response.data);
      });

    axios
      .get("http://localhost:3006/transactions/getDonationRequests", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUnDonors(response.data);
        // setProfilePicture(response.data.profilePicure);
      });
  };

  //accepting and declining donor's request
  const donorRequestAccept = (id) => {
    axios
      .put(`http://localhost:3006/transactions/donorRequestAccept/${id}`, {
        receiverName: username,
        receiverProfilePicture: profilePicture,
        UserId2: userId,
      })
      .then((response) => {
        alert(response.data);
        window.location.reload();
      });
  };

  //accepting and declining receiver's request
  const receiverRequestAccept = (id) => {
    axios
      .put(`http://localhost:3006/transactions/receiverRequestAccept/${id}`, {
        donorName: username,
        donorProfilePicture: profilePicture,
        UserId: userId,
      })
      .then((response) => {
        alert(response.data);
        window.location.reload();
      });
  };

  //canceling requests
  const cancelRequest = (id) => {
    axios
      .delete(`http://localhost:3006/transactions/cancelRequest/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert(response.data);
        window.location.reload();
      });
  };

  //!for transactionHistory
  const [transactionHistory, setTransactionHistory] = useState({});
  const [openTransactionHistoryModal, setOpenTransactionHistoryModal] =
    useState(false);
  const gettingTransactionHistory = () => {
    axios
      .get("http://localhost:3006/transactions/indiHistory", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setTransactionHistory(response.data);
      });
  };
  const columnsTransactionHistory = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "donorName",
      headerName: "Donor",
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 10,
              }}
              cloudName="soragatrasambandha"
              publicId={params.row.donorProfilePicture}
            />
            {params.row.donorName}
          </div>
        );
      },
    },
    { field: "bloodType", headerName: "Blood Type", width: 150 },
    {
      field: "receiverName",
      headerName: "Receiver",
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 10,
              }}
              cloudName="soragatrasambandha"
              publicId={params.row.receiverProfilePicture}
            />
            {params.row.receiverName}
          </div>
        );
      },
    },
    {
      field: "isComplete",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 90,
    },
  ];

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

        <Grid item>
          <Button
            onClick={() => {
              gettingRequests();
              setOpenRequestModal(true);
            }}
            variant="outlined"
            startIcon={<CoPresentOutlinedIcon />}
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
            Requests
          </Button>
        </Grid>

        <Grid item>
          <Button
            //!for Transaction we need to do this we gonna add it like this pass params
            // component={Link}
            // to="/transactions/:id"
            onClick={() => {
              gettingTransactionHistory();
              setOpenTransactionHistoryModal(true);
            }}
            variant="outlined"
            startIcon={<HistoryIcon />}
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
            Transaction History
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
              height: "vh",
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
            height: 598,
            overflowY: "scroll",
            backgroundColor: "#E5E0DD",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            borderRadius: 5,
            [useTheme().breakpoints.down("sm")]: {
              width: "50vh",
              height: "vh",
            },
          }}
        >
          <form
            action="submit"
            sx={{ padding: useTheme().spacing(2) }}
            autoComplete="off"
          >
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Become a Donor
            </Typography>

            <div className={classes.item}>
              <TextField
                id="standard"
                variant="standard"
                type="number"
                label="Age"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                select
                label="Blood Type"
                size="small"
                sx={{ width: "100%" }}
                value={bloodType}
                onChange={(e) => {
                  setBloodType(e.target.value);
                }}
                helperText="Please Select The Required Blood Type"
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </TextField>
            </div>

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
                id="standard-adornment-password"
                variant="standard"
                label="Disease"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setDisease(e.target.value);
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
            height: 693,
            overflowY: "scroll",
            backgroundColor: "#E5E0DD",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            borderRadius: 5,
            [useTheme().breakpoints.down("sm")]: {
              width: "50vh",
              height: "vh",
            },
          }}
        >
          <form
            action="submit"
            sx={{ padding: useTheme().spacing(2) }}
            autoComplete="off"
          >
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Become a Receiver
            </Typography>

            <div className={classes.item}>
              <TextField
                id="standard"
                variant="standard"
                type="number"
                label="Age"
                size="small"
                autoComplete="off"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <TextField
                select
                label="Blood Type"
                size="small"
                sx={{ width: "100%" }}
                value={bloodType}
                onChange={(e) => {
                  setBloodType(e.target.value);
                }}
                helperText="Please Select The Required Blood Type"
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </TextField>
            </div>

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

      <Modal open={openRequestModal}>
        {/* blood donation request table display */}
        <Container
          sx={{
            maxWidth: "100vh",
            maxHeight: "100vh",
            backgroundColor: "#252424",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            overflowY: "scroll",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setOpenRequestModal(false)}>
            <CloseIcon
              fontSize="large"
              sx={{
                position: "fixed",
                top: 20,
                right: 100,
                color: "#fff",
                [useTheme().breakpoints.down("sm")]: {
                  position: "fixed",
                  top: 10,
                  right: 10,
                },
              }}
            />
          </IconButton>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
            Help Requests
          </Typography>

          <hr style={{ color: "white" }}></hr>
          <>
            {unDonors.length > 0 ? (
              unDonors.map((unDonors) => (
                <div key={unDonors.UserId}>
                  <List
                    sx={{
                      // border: "1px solid #fff",
                      borderRadius: 5,
                      width: "100%",
                      bgcolor: "#525252",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItem
                      justifyContent="center"
                      alignItems="center"
                      secondaryAction={
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item md={6}>
                            <Button
                              variant="contained"
                              onClick={() => donorRequestAccept(unDonors.id)}
                              sx={{
                                maxWidth: 90,
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
                          </Grid>
                          <Grid item md={6}>
                            <Button
                              variant="contained"
                              sx={{
                                maxWidth: 90,
                                background: "#d45439",
                                color: "#fff",
                                borderRadius: 5,
                                fontWeight: "bold",
                                "&:hover": {
                                  color: "#fff",
                                  background: "#d45439",
                                },
                              }}
                              onClick={() => cancelRequest(unDonors.id)}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          component={Link}
                          to={"/profile/" + unDonors.UserId}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Image
                              style={{
                                cursor: "pointer",
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              cloudName="soragatrasambandha"
                              publicId={unDonors.donorProfilePicture}
                            />
                          </div>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment style={{ color: "#ededed" }}>
                            <Typography
                              component={Link}
                              to={"/profile/" + unDonors.UserId}
                              sx={{
                                display: "inline",
                                fontWeight: "bold",
                                alignItems: "center",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": {
                                  color: "#ededed",
                                },
                              }}
                              variant="body1"
                              color="#ededed"
                            >
                              {unDonors.donorName} {/*  {User.username} */}
                            </Typography>

                            <Typography
                              sx={{
                                display: "inline",
                                alignItems: "center",
                              }}
                              variant="body1"
                              color="#ededed"
                            >
                              {" wants to confirm the help"}
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
                            color="#ededed"
                          >
                            {format(unDonors.createdAt)}
                          </Typography>
                        }
                      />
                    </ListItem>

                    <Divider sx={{ color: "#fff" }} variant="middle" />
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
                    bgcolor: "#525252",
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
                            color="#ededed"
                          >
                            {"There are no Help Requests Right Now"}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </div>
            )}
          </>

          {/* blood donation request table display */}
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: "bold", mt: 2 }}
          >
            Donation Requests
          </Typography>

          <hr style={{ color: "white" }}></hr>
          <>
            {unReceivers.length > 0 ? (
              unReceivers.map((unReceivers) => (
                <div key={unReceivers.UserId2}>
                  <List
                    sx={{
                      // border: "1px solid #fff",
                      borderRadius: 1.5,
                      width: "100%",
                      bgcolor: "#525252",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItem
                      justifyContent="center"
                      alignItems="center"
                      secondaryAction={
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item sm={6}>
                            <Button
                              variant="contained"
                              onClick={() =>
                                receiverRequestAccept(unReceivers.id)
                              }
                              sx={{
                                maxWidth: 90,
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
                          </Grid>
                          <Grid item sm={6}>
                            <Button
                              variant="contained"
                              sx={{
                                maxWidth: 90,
                                background: "#d45439",
                                color: "#fff",
                                borderRadius: 5,
                                fontWeight: "bold",
                                "&:hover": {
                                  color: "#fff",
                                  background: "#d45439",
                                },
                              }}
                              onClick={() => cancelRequest(unReceivers.id)}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          component={Link}
                          to={"/profile/" + unReceivers.UserId2}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Image
                              style={{
                                cursor: "pointer",
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              cloudName="soragatrasambandha"
                              publicId={unReceivers.receiverProfilePicture}
                            />
                          </div>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component={Link}
                              to={"/profile/" + unReceivers.UserId2}
                              sx={{
                                display: "inline",
                                fontWeight: "bold",
                                alignItems: "center",
                                cursor: "pointer",
                                textDecoration: "none",
                                "&:hover": {
                                  color: "#ededed",
                                },
                              }}
                              variant="body1"
                              color="#ededed"
                            >
                              {unReceivers.receiverName}{" "}
                              {/*  {User.username} */}
                            </Typography>

                            <Typography
                              sx={{
                                display: "inline",
                                alignItems: "center",
                              }}
                              variant="body1"
                              color="#ededed"
                            >
                              {" wants to confirm the help"}
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
                            color="#ededed"
                          >
                            {format(unReceivers.createdAt)}
                            {/*  {User.username} */}
                          </Typography>
                        }
                      />
                    </ListItem>

                    <Divider sx={{ color: "#fff" }} variant="middle" />
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
                    bgcolor: "#525252",
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
                            color="#ededed"
                          >
                            {"There are no Donation Requests Right Now"}
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
      </Modal>

      {/* Transaction History */}
      <Modal open={openTransactionHistoryModal}>
        <Container
          sx={{
            maxWidth: "100vh",
            maxHeight: "100vh",
            backgroundColor: "#252424",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            overflowY: "scroll",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setOpenTransactionHistoryModal(false)}>
            <CloseIcon
              fontSize="large"
              sx={{
                position: "fixed",
                top: 20,
                right: 100,
                color: "#fff",
                [useTheme().breakpoints.down("sm")]: {
                  position: "fixed",
                  top: 10,
                  right: 10,
                },
              }}
            />
          </IconButton>

          <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
            Transaction History
          </Typography>

          <hr style={{ color: "white" }}></hr>

          {/* <Typography
            gutterBottom
            variant="h6"
            fontWeight={600}
            fontSize="16"
            sx={{ marginTop: 1, color: "#EDEDED" }}
          >
            Transaction History
          </Typography> */}

          <div style={{ color: "#ededed", height: 400, width: "100%" }}>
            <DataGrid
              autoHeight
              rows={transactionHistory}
              columns={columnsTransactionHistory}
              disableSelectionOnClick={true}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              sx={{
                boxShadow: 2,
                border: 2,
                color: "#ededed",
                backgroundColor: "#555",
              }}
            />
          </div>
        </Container>
      </Modal>
    </Container>
  );
};

export default Feed;
