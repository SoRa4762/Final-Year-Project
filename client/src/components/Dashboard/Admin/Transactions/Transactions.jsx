import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
// import { transactionHistory } from "../../../HomePage/DummyData";
import axios from "axios";
import { Image } from "cloudinary-react";

const Transactions = () => {
  const [transactionHistory, setTransactionHistory] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3006/transactions/allhistory", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setTransactionHistory(response.data);
      });
  }, []);

  //frist table - user details
  const columnsUserList = [
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
        Transaction History
      </Typography>

      <div
        style={{
          color: "#ededed",
          height: "calc(100vh - 50px)",
          width: "100%",
        }}
      >
        <DataGrid
          autoHeight
          rows={transactionHistory}
          columns={columnsUserList}
          disableSelectionOnClick={true}
          pageSize={10}
          rowsPerPageOptions={[10]}
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

export default Transactions;
