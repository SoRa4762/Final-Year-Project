import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Image } from "cloudinary-react";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const UsersList = () => {
  //!Globally Applicable
  const [users, setUsers] = useState({});
  const [unDonors, setUnDonors] = useState({});
  const [unReceivers, setUnReceivers] = useState({});
  const [donors, setDonors] = useState({});
  const [receivers, setReceivers] = useState({});
  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3006/users", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUsers(response.data);
        // setProfilePicture(response.data.profilePicure);
      });

    axios
      .get("http://localhost:3006/roles/admin/donor", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUnDonors(response.data);
        // setProfilePicture(response.data.profilePicure);
      });

    axios
      .get("http://localhost:3006/roles/admin/receiver", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUnReceivers(response.data);
        // setProfilePicture(response.data.profilePicure);
      });

    axios
      .get("http://localhost:3006/roles/alldonor", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setDonors(response.data);
        // setProfilePicture(response.data.profilePicure);
      });

    axios
      .get("http://localhost:3006/roles/allreceiver", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setReceivers(response.data);
        // setProfilePicture(response.data.profilePicure);
      });
  }, []);

  //!approve
  const approve = (id) => {
    axios
      .put(
        `http://localhost:3006/roles/admin/approve/${id}`
        // {
        //   headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        alert(response.data);
        window.location.reload();
      });
  };

  //!deny
  const deny = (id) => {
    axios
      .delete(`http://localhost:3006/roles/admin/deny/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert(response.data);
      });
  };

  //!users details table
  const columnsUserList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "Username",
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
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 220,
    },
    {
      field: "isApproved",
      headerName: "Approved",
      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              to={"/admin/edituser/" + params.row.id}
              size="small"
              variant="contained"
              startIcon={<VisibilityOutlinedIcon />}
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
            <IconButton
              sx={{
                justifyContent: "center",
                fontWeight: 600,
                color: "#EDEDED",
                backgroundColor: "#d45439",
                borderRadius: 5,
                marginLeft: { xs: 1 },
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#d45439",
                },
              }}
            >
              <DeleteIcon
                sx={{ fontSize: 20 }}
                onClick={() => handleDelete(params.row.id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!second table - donor details
  const handleDelete3 = (id3) => {
    setDonors(donors.filter((item3) => item3.id !== id3));
  };

  const columnsUserApprovedDonorList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params3) => {
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
              publicId={params3.row.profilePicture}
            />
            {params3.row.username}
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
    { field: "disease", headerName: "Disease", width: 130 },
    {
      field: "location",
      headerName: "Location",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "zip",
      headerName: "ZIP/Postal Code",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params3) => {
        return (
          <>
            <Button
              component={Link}
              to={"/admin/edituser/" + params3.row.UserId}
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
              Edit
            </Button>
            <IconButton
              sx={{
                justifyContent: "center",
                fontWeight: 600,
                color: "#EDEDED",
                backgroundColor: "#d45439",
                borderRadius: 5,
                marginLeft: { xs: 1 },
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#d45439",
                },
              }}
            >
              <DeleteIcon
                sx={{ fontSize: 20 }}
                onClick={() => handleDelete3(params3.row.id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!third table - receiver details
  const handleDelete4 = (id4) => {
    setReceivers(receivers.filter((item4) => item4.id !== id4));
  };

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
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "zip",
      headerName: "ZIP/Postal Code",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    { field: "urgency", headerName: "Urgency", width: 130 },
    { field: "reason", headerName: "Reason", width: 400 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params4) => {
        return (
          <>
            <Button
              component={Link}
              to={"/admin/edituser/" + params4.row.UserId}
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
              Edit
            </Button>
            <IconButton
              sx={{
                justifyContent: "center",
                fontWeight: 600,
                color: "#EDEDED",
                backgroundColor: "#d45439",
                borderRadius: 5,
                marginLeft: { xs: 1 },
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#d45439",
                },
              }}
            >
              <DeleteIcon
                sx={{ fontSize: 20 }}
                onClick={() => handleDelete4(params4.row.id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!fourth table - donor approval details
  const handleDelete1 = (id1) => {
    setUnDonors(unDonors.filter((item1) => item1.id !== id1));
  };

  const columnsUserUnapprovedDonorList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params1) => {
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
              publicId={params1.row.profilePicture}
            />
            {params1.row.username}
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
    { field: "disease", headerName: "Disease", width: 130 },
    {
      field: "location",
      headerName: "Location",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "zip",
      headerName: "ZIP/Postal Code",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params1) => {
        return (
          <>
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
              <BeenhereIcon
                sx={{ fontSize: 20 }}
                onClick={() => {
                  approve(params1.row.id);
                }}
              />
            </IconButton>

            <IconButton
              sx={{
                justifyContent: "center",
                fontWeight: 600,
                color: "#EDEDED",
                backgroundColor: "#d45439",
                borderRadius: 5,
                marginLeft: { xs: 1 },
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#d45439",
                },
              }}
            >
              <DeleteIcon
                sx={{ fontSize: 20 }}
                onClick={() => {
                  handleDelete1(params1.row.id);
                  deny(params1.row.id);
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!fifth table - receiver approval requests
  const handleDelete2 = (id2) => {
    setUnReceivers(unReceivers.filter((item2) => item2.id !== id2));
  };

  const columnsUserUnApprovedReceiverList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params2) => {
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
              publicId={params2.row.profilePicture}
            />
            {params2.row.username}
          </div>
        );
      },
    },
    { field: "phoneNumber", headerName: "Phone", width: 130 },
    { field: "urgency", headerName: "Urgency", width: 150 },
    { field: "bloodType", headerName: "Blood Type", width: 130 },
    {
      field: "role",
      headerName: "Role",
      width: 90,
    },
    {
      field: "location",
      headerName: "Location",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "zip",
      headerName: "ZIP/Postal Code",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    { field: "reason", headerName: "Reason", width: 400 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params2) => {
        return (
          <>
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
              <BeenhereIcon
                sx={{ fontSize: 20 }}
                onClick={() => {
                  approve(params2.row.id);
                  handleDelete2(params2.row.id);
                }}
              />
            </IconButton>

            <IconButton
              sx={{
                justifyContent: "center",
                fontWeight: 600,
                color: "#EDEDED",
                backgroundColor: "#d45439",
                borderRadius: 5,
                marginLeft: { xs: 1 },
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#d45439",
                },
              }}
            >
              <DeleteIcon
                sx={{ fontSize: 20 }}
                onClick={() => {
                  handleDelete2(params2.row.id);
                  deny(params2.row.id);
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div
      style={{
        marginTop: 50,
        marginLeft: "1%",
        marginRight: "1%",
        marginBottom: "1%",
      }}
    >
      {/* user table display */}
      <Typography gutterBottom variant="h6" fontWeight={600} fontSize="16">
        User Details
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={users}
          columns={columnsUserList}
          disableSelectionOnClick={true}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            boxShadow: 2,
            border: 2,
            color: "#ededed",
            backgroundColor: "#555",
            // "& .MuiDataGrid-cell:hover": {
            //   color: "#d45439",
            // },
          }}
        />
      </div>

      {/* Donor Details */}
      <Typography
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        sx={{ marginTop: 1 }}
      >
        Donor Details
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={donors}
          columns={columnsUserApprovedDonorList}
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

      {/* Recivers Details */}
      <Typography
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        sx={{ marginTop: 1 }}
      >
        Receiver Details
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={receivers}
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

      {/* donor request table display */}
      <Typography
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        sx={{ marginTop: 1 }}
      >
        Donor Requests
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={unDonors}
          columns={columnsUserUnapprovedDonorList}
          disableSelectionOnClick={true}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            boxShadow: 2,
            border: 2,
            color: "#ededed",
            backgroundColor: "#555",
            // "& .MuiDataGrid-cell:hover": {
            //   color: "#d45439",
            // },
          }}
        />
      </div>

      {/* receiver request table display */}
      <Typography
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        sx={{ marginTop: 1 }}
      >
        Receiver Requests
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={unReceivers}
          columns={columnsUserUnApprovedReceiverList}
          disableSelectionOnClick={true}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            boxShadow: 2,
            border: 2,
            color: "#ededed",
            backgroundColor: "#555",
            // "& .MuiDataGrid-cell:hover": {
            //   color: "#d45439",
            // },
          }}
        />
      </div>
    </div>
  );
};

export default UsersList;
