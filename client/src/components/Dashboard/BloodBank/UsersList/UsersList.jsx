import React, { useContext, useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import DeleteIcon from "@mui/icons-material/Delete";
// import BeenhereIcon from "@mui/icons-material/Beenhere";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Button,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { Image } from "cloudinary-react";
import { format } from "timeago.js";
import { AuthContext } from "../../../helpers/AuthContext";

const UsersList = () => {
  const [donors, setDonors] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [unDonors, setUnDonors] = useState([]);
  const [unReceivers, setUnReceivers] = useState([]);
  const { authState } = useContext(AuthContext);
  const username = authState.username;
  const profilePicture = authState.profilePicture;
  const userId = authState.id;

  useEffect(() => {
    axios
      .get("http://localhost:3006/transactions/gettingDonors", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setDonors(response.data);
      });

    axios
      .get("http://localhost:3006/transactions/gettingReceivers", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setReceivers(response.data);
      });

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
  }, []);

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

  //debugging empty lists for conditional rendering
  // console.log(donors);
  // console.log(receivers);

  return (
    <div
      style={{
        marginTop: 50,
        marginLeft: "1%",
        marginRight: "1%",
        marginBottom: "1%",
      }}
    >
      {/* donors list */}
      <Typography gutterBottom variant="h6" fontWeight={600} fontSize="16">
        Donor Details
      </Typography>
      <>
        {donors.length > 0 ? (
          donors.map((users) => (
            <div key={users.UserId}>
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
                      <Grid item sm={12}>
                        <Button
                          component={Link}
                          to={"/bloodbank/visituser/" + users.UserId}
                          size="small"
                          variant="contained"
                          startIcon={<VisibilityOutlinedIcon />}
                          //   onClick={() => setOpenAlert(true) & setOpen(false)}
                          sx={{
                            pl: 2,
                            pr: 2,
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
                      </Grid>
                    </Grid>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      component={Link}
                      to={"/bloodbank/visituser/" + users.UserId}
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
                          publicId={users.donorProfilePicture}
                        />
                      </div>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component={Link}
                          to={"/bloodbank/visituser/" + users.UserId}
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
                          {users.donorName} {/*  {User.username} */}
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
                        <b>Record:</b> {format(users.createdAt)}{" "}
                        <b>BloodType:</b> {users.bloodType}
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
                        {"There are no Donors right now"}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        )}
      </>
      <Typography
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        mt={2}
      >
        Receiver Details
      </Typography>
      <>
        {receivers.length > 0 ? (
          receivers.map((users) => (
            <div key={users.UserId2}>
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
                      <Grid item sm={12}>
                        <Button
                          component={Link}
                          to={"/bloodbank/visituser/" + users.UserId2}
                          size="small"
                          variant="contained"
                          startIcon={<VisibilityOutlinedIcon />}
                          //   onClick={() => setOpenAlert(true) & setOpen(false)}
                          sx={{
                            pl: 2,
                            pr: 2,
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
                      </Grid>
                    </Grid>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      component={Link}
                      to={"/bloodbank/visituser/" + users.UserId2}
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
                          publicId={users.receiverProfilePicture}
                        />
                      </div>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component={Link}
                          to={"/bloodbank/visituser/" + users.UserId2}
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
                          {users.receiverName} {/*  {User.username} */}
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
                        <b>Record:</b> {format(users.createdAt)}{" "}
                        <b>BloodType:</b> {users.bloodType}
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
                        {"There are no Receivers right now"}
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
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        mt={2}
      >
        Help Requests
      </Typography>
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
                      to={"/bloodbank/visituser/" + unDonors.UserId}
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
                          publicId={unDonors.donorProfilePicture}
                        />
                      </div>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component={Link}
                          to={"/bloodbank/visituser/" + unDonors.UserId}
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
                        {" wants to confirm the help"}
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
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        mt={2}
      >
        Donation Requests
      </Typography>
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
                          onClick={() => receiverRequestAccept(unReceivers.id)}
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
                      to={"/bloodbank/visituser/" + unReceivers.UserId2}
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
                          to={"/bloodbank/visituser/" + unReceivers.UserId2}
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
                          {unReceivers.receiverName} {/*  {User.username} */}
                        </Typography>
                        {" wants to confirm the help"}
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
    </div>
  );
};

export default UsersList;
