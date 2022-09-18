import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, IconButton, Typography } from "@mui/material";
import { Users } from "../../../HomePage/DummyData";
import { rowsUserDonorList } from "../../../HomePage/DummyData";
import { rowsUserReceiverList } from "../../../HomePage/DummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

const UsersList = () => {
  //frist table - user details
  const [data, setData] = useState(Users);
  //not useful now but i need it to filer users later
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columnsUserList = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 10,
              }}
              src={params.row.profilePicture}
              alt="profilePicture"
            />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "bloodType", headerName: "Blood Type", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
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
    { field: "totalDonation", headerName: "Total Donation", width: 130 },
    { field: "creditScore", headerName: "Credit Score", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              to={"/profile/" + params.row.id}
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
              Display User
            </Button>
          </>
        );
      },
    },
  ];

  //THIRD TABLE - DONATION REQUESTS
  const [donorData, setDonorData] = useState(rowsUserDonorList);
  const handleDelete1 = (id1) => {
    setDonorData(donorData.filter((item1) => item1.id !== id1));
  };

  const columnsUserDonorList = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params1) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 10,
              }}
              src={params1.row.avatar}
              alt="profilePicture"
            />
            {params1.row.userName}
          </div>
        );
      },
    },
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
    { field: "disease", headerName: "Disease", width: 130 },
    { field: "range", headerName: "Range", width: 250 },
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
                // onClick={()}
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
                onClick={() => handleDelete1(params1.row.id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //second table - BLOOD REQUESTS
  const [receiverData, setReceiverData] = useState(rowsUserReceiverList);
  const handleDelete2 = (id2) => {
    setReceiverData(receiverData.filter((item2) => item2.id !== id2));
  };

  const columnsUserReceiverList = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params2) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 10,
              }}
              src={params2.row.avatar}
              alt="profilePicture"
            />
            {params2.row.userName}
          </div>
        );
      },
    },
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
    { field: "reason", headerName: "Reason", width: 250 },
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
                // onClick={()}
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
                onClick={() => handleDelete2(params2.row.id)}
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
      {/* blood requests table display */}

      <Typography variant="h6" fontWeight={600} fontSize="16">
        User Details
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
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

      {/* blood donation request table display */}

      <Typography
        variant="h6"
        fontWeight={600}
        fontSize="16"
        sx={{ marginTop: 1 }}
      >
        Blood Requests
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          rows={receiverData}
          columns={columnsUserReceiverList}
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

      {/* donor request table display */}
      <Typography
        variant="h6"
        fontWeight={600}
        fontSize="16"
        sx={{ marginTop: 1 }}
      >
        Donation Requests
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          rows={donorData}
          columns={columnsUserDonorList}
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
