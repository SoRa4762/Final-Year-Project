import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const BloodBanksList = () => {
  //!Globally Applicable
  const [bloodbanks, setBloodbanks] = useState({});
  const [unBloodbanks, setUnBloodbanks] = useState({});
  const [unDonors, setUnDonors] = useState({});
  const [unReceivers, setUnReceivers] = useState({});
  const [allDonorBB, setAllDonorBB] = useState({});
  const [allReceiverBB, setAllReceiverBB] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3006/users/bloodbanks", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setBloodbanks(response.data);
      });

    axios
      .get("http://localhost:3006/users/unbloodbanks", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUnBloodbanks(response.data);
      });

    axios
      .get("http://localhost:3006/roles/admin/donorbb", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUnDonors(response.data);
      });

    axios
      .get("http://localhost:3006/roles/admin/receiverbb", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUnReceivers(response.data);
      });

    axios
      .get("http://localhost:3006/roles/alldonorbb", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setAllDonorBB(response.data);
      });

    axios
      .get("http://localhost:3006/roles/allreceiverbb", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setAllReceiverBB(response.data);
      });
  }, []);

  //! yesRegister
  const yesRegister = (id) => {
    axios
      .put(`http://localhost:3006/users/yesregister/${id}`)
      .then((response) => {
        alert(response.data);
        window.location.reload();
      });
  };

  //!noRegister
  const noRegister = (id) => {
    axios
      .put(`http://localhost:3006/users/noregister/${id}`)
      .then((response) => {
        alert(response.data);
        window.location.reload();
      });
  };

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

  //!first table - bloodbank details
  const handleDelete = (id) => {
    setBloodbanks(bloodbanks.filter((item) => item.id !== id));
  };

  const columnsBloodBankList = [
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
      width: 200,
    },
    {
      field: "isApproved",
      headerName: "Approved",
      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      width: 260,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              to={"/admin/editbloodstock/" + params.row.id}
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
              Show Bloodstock
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

  //!second table - bloodbank approval details
  const handleDelete1 = (id1) => {
    setUnBloodbanks(unBloodbanks.filter((item1) => item1.id !== id1));
  };

  const columnsBloodBankApprovalList = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "Bloodbank",
      width: 250,
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
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "isApproved",
      headerName: "Approved",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
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
                  yesRegister(params1.row.id);
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
                  noRegister(params1.row.id);
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!third table - donor details
  const handleDelete2 = (id3) => {
    setAllDonorBB(allDonorBB.filter((item3) => item3.id !== id3));
  };

  const columnsUserApprovedDonorList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "Bloodbank",
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
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params3) => {
        return (
          <>
            <Button
              component={Link}
              to={"/admin/edituser/" + params3.row.id}
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
                onClick={() => handleDelete2(params3.row.id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!fourth table - receiver  details
  const handleDelete3 = (id4) => {
    setAllReceiverBB(allReceiverBB.filter((item4) => item4.id !== id4));
  };

  const columnsUserApprovedReceiverList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Bloodbank",
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
    { field: "reason", headerName: "Reason", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params4) => {
        return (
          <>
            <Button
              component={Link}
              to={"/admin/edituser/" + params4.row.id}
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
                onClick={() => handleDelete3(params4.row.id)}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!fifth table - donor approval details
  const handleDelete4 = (id1) => {
    setUnDonors(unDonors.filter((item1) => item1.id !== id1));
  };

  const columnsUserUnapprovedDonorList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "Bloodbank",
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
                  handleDelete4(params1.row.id);
                  deny(params1.row.id);
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  //!sixth table - receiver approval requests
  const handleDelete5 = (id2) => {
    setUnReceivers(unReceivers.filter((item2) => item2.id !== id2));
  };

  const columnsUserUnApprovedReceiverList = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Bloodbank",
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
                onClick={() => {
                  approve(params2.row.id);
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
                  handleDelete5(params2.row.id);
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
        Blood Bank Details
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={bloodbanks}
          columns={columnsBloodBankList}
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

      {/* Blood Bank request table display */}
      <Typography
        gutterBottom
        variant="h6"
        fontWeight={600}
        fontSize="16"
        sx={{ marginTop: 1 }}
      >
        Registration Approval Requests
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={unBloodbanks}
          columns={columnsBloodBankApprovalList}
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
        Donor Bloodbank Details
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={allDonorBB}
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
        Receiver Bloodbank Details
      </Typography>

      <div style={{ color: "#ededed", height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={allReceiverBB}
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
        Donor Bloodbank Requests
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
        Receiver Bloodbank Requests
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

export default BloodBanksList;
