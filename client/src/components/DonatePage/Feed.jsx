import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Fab,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PreviewIcon from "@mui/icons-material/Preview";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Image } from "cloudinary-react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: useTheme().spacing(1),
    marginBottom: useTheme().spacing(2),
    textDecoration: "none",
    boxShadow: "none",
  },
}));

const Feed = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAll, setOpenAll] = useState(false);

  const [city, setCity] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [openAllReceiversModal, setOpenAllReceiversModal] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);

  //storing data from backend
  const [locReceivers, setLocReceivers] = useState({});
  const [locReceiversBB, setLocReceiversBB] = useState({});

  const [btReceivers, setBTReceivers] = useState({});
  const [allReceiversBB, setAllReceiversBB] = useState({});

  //requests handeling
  // const [sentRequests, setSentRequests] = useState({});
  // const [receiverBloodtype, setBloodType] = useState("");

  //searching by location
  const searchWithLocation = () => {
    axios
      .post(
        "http://localhost:3006/roles/getreceiver",
        {
          city: city,
          bloodType: bloodType,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setLocReceivers(response.data);
        }
      });

    axios
      .post(
        "http://localhost:3006/roles/getreceiverbb",
        {
          city: city,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setLocReceiversBB(response.data);
        }
      });
  };

  //searching all receivers by bloodtype
  const search = () => {
    axios
      .post(
        "http://localhost:3006/roles/getreceiver/bt",
        {
          bloodType: bloodType,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setBTReceivers(response.data);
        }
      });

    axios
      .get("http://localhost:3006/roles/allreceiverbb", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setAllReceiversBB(response.data);
        }
      });
  };

  //help request
  const sendRequest = (receiverId) => {
    axios
      .post(
        "http://localhost:3006/transactions/donorRequest",
        {
          UserId2: receiverId,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.message);
        }
      });
  };

  //

  const columnsUserApprovedReceiverList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params4) => {
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
              publicId={params4.row.profilePicture}
            />
            {params4.row.username}
          </div>
        );
      },
    },
    { field: "phoneNumber", headerName: "Phone", width: 130 },
    { field: "bloodType", headerName: "Blood Type", width: 130 },
    {
      field: "role",
      headerName: "Role",
      width: 90,
    },
    {
      field: "location",
      headerName: "Location",
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      width: 160,
    },
    {
      field: "zip",
      headerName: "ZIP/Postal Code",
      width: 160,
    },
    { field: "urgency", headerName: "Urgency", width: 130 },
    { field: "reason", headerName: "Reason", width: 400 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params4) => {
        return (
          <>
            <Button
              component={Link}
              to={"/profile/" + params4.row.UserId}
              size="small"
              variant="contained"
              //   onClick={() => setOpenAlert(true) & setOpen(false)}
              sx={{
                mr: 1,
                background: "white",
                color: "#000",
                borderRadius: 5,
                fontWeight: "bold",
                textDecoration: "none",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                "&:hover": {
                  color: "#000",
                  background: "#EDEDED",
                  textDecoration: "none",
                },
              }}
            >
              Visit User
            </Button>

            <Tooltip title="Send Help Request?" aria-label="Request">
              <Fab
                sx={{
                  justifyContent: "center",
                  fontWeight: 600,
                  color: "#EDEDED",
                  backgroundColor: "#4e9258",
                  borderRadius: "50%",
                  width: 35,
                  height: 35,
                  marginLeft: { xs: 1 },
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#4e9258",
                  },
                }}
              >
                <SendIcon
                  sx={{ fontSize: 20 }}
                  onClick={() => sendRequest(params4.row.UserId)}
                />
              </Fab>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const columnsBloodbankApprovedReceiverList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Bloodbank",
      width: 200,
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
              publicId={params.row.profilePicture}
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "phoneNumber", headerName: "Phone", width: 130 },
    { field: "bloodType", headerName: "Blood Type", width: 130 },
    {
      field: "role",
      headerName: "Role",
      width: 90,
    },
    {
      field: "location",
      headerName: "Location",
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      width: 160,
    },
    {
      field: "zip",
      headerName: "ZIP/Postal Code",
      width: 160,
    },
    { field: "urgency", headerName: "Urgency", width: 130 },
    { field: "reason", headerName: "Reason", width: 400 },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              to={"/profile/" + params.row.UserId}
              size="small"
              variant="contained"
              //   onClick={() => setOpenAlert(true) & setOpen(false)}
              sx={{
                mr: 1,
                background: "white",
                color: "#000",
                borderRadius: 5,
                fontWeight: "bold",
                textDecoration: "none",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                "&:hover": {
                  color: "#000",
                  background: "#EDEDED",
                  textDecoration: "none",
                },
              }}
            >
              Visit Bloodbank
            </Button>

            <Tooltip title="Send Help Request?" aria-label="Request">
              <Fab
                sx={{
                  justifyContent: "center",
                  fontWeight: 600,
                  color: "#EDEDED",
                  backgroundColor: "#4e9258",
                  borderRadius: "50%",
                  width: 35,
                  height: 35,
                  marginLeft: { xs: 1 },
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#4e9258",
                  },
                }}
              >
                <SendIcon
                  sx={{ fontSize: 20 }}
                  onClick={() => sendRequest(params.row.UserId)}
                />
              </Fab>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <Container
      sx={{
        height: "100vh",
        width: "100wh",
        backgroundColor: "#252424",
        display: "flex",
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
        style={{ height: "80vh" }}
      >
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<LocationSearchingIcon />}
            onClick={() => setOpen(true)}
            sx={{
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
            search receivers with location
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={() => setOpenAll(true)}
            sx={{
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
            Search receivers with bloodtype
          </Button>
        </Grid>
      </Grid>

      {/* search with location*/}
      <Modal open={open}>
        <Container
          sx={{
            width: 400,
            height: 230,
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
              Search Receivers
            </Typography>

            <div className={classes.item}>
              <TextField
                id="standard-adornment-password"
                variant="standard"
                label="City"
                size="small"
                placeholder="Itahari"
                autoComplete="off"
                onChange={(e) => {
                  setCity(e.target.value);
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
              <Button
                color="success"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  searchWithLocation();
                  setOpenLocationModal(true);
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
                Search
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

      {/* for show all */}
      <Modal open={openAll}>
        <Container
          sx={{
            width: 400,
            height: 170,
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
              Search All Receivers
            </Typography>
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
              <Button
                color="success"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  search();
                  setOpenAllReceiversModal(true);
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
                Search
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => setOpenAll(false)}
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

      {/* modal for search through location */}

      <Modal open={openLocationModal}>
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
          <IconButton onClick={() => setOpenLocationModal(false)}>
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
            Receivers Around {city} with Bloodtype {bloodType}
          </Typography>

          <hr style={{ color: "white" }}></hr>

          {/* Recivers Details */}
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={600}
            fontSize="16"
            sx={{ marginTop: 1, color: "#EDEDED" }}
          >
            Receiver Details
          </Typography>

          <div style={{ color: "#ededed", height: 400, width: "100%" }}>
            <DataGrid
              autoHeight
              rows={locReceivers}
              columns={columnsUserApprovedReceiverList}
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

          <hr style={{ color: "white" }}></hr>

          {/* Location Donor BB Details */}
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={600}
            fontSize="16"
            sx={{ marginTop: 1, color: "#EDEDED" }}
          >
            Bloodbank Details
          </Typography>

          <div style={{ color: "#ededed", height: 400, width: "100%" }}>
            <DataGrid
              autoHeight
              rows={locReceiversBB}
              columns={columnsBloodbankApprovedReceiverList}
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

      <hr style={{ color: "white" }}></hr>

      {/* modal for search through bloodtypes */}

      <Modal open={openAllReceiversModal}>
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
          <IconButton onClick={() => setOpenAllReceiversModal(false)}>
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
            All Available Receivers with Bloodtype {bloodType}
          </Typography>

          <hr style={{ color: "white" }}></hr>

          {/* Recivers BloodType Details */}
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={600}
            fontSize="16"
            sx={{ marginTop: 1, color: "#EDEDED" }}
          >
            Receiver Details
          </Typography>

          <div style={{ color: "#ededed", height: 400, width: "100%" }}>
            <DataGrid
              autoHeight
              rows={btReceivers}
              columns={columnsUserApprovedReceiverList}
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

          <hr style={{ color: "white" }}></hr>

          {/* All Recivers BB Details */}
          <Typography
            gutterBottom
            variant="h6"
            fontWeight={600}
            fontSize="16"
            sx={{ marginTop: 1, color: "#EDEDED" }}
          >
            Bloodbank Details
          </Typography>

          <div style={{ color: "#ededed", height: 400, width: "100%" }}>
            <DataGrid
              autoHeight
              rows={allReceiversBB}
              columns={columnsBloodbankApprovedReceiverList}
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
