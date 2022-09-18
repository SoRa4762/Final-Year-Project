import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Modal, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { bloodStock } from "../../../HomePage/DummyData";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router";
import { AuthContext } from "../../../helpers/AuthContext";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: useTheme().spacing(1),
    marginBottom: useTheme().spacing(2),
  },
}));

const Stock = () => {
  //getting params
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const classes = useStyles();
  const [stock, setStock] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [bloodType, setBloodType] = useState(false);
  const [amount, setAmount] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3006/stock/${id}`).then((response) => {
      setStock(response.data);
    });
  }, [id]);

  const editAmount = () => {
    axios
      .put(`http://localhost:3006/stock/${id}`, {
        amount: amount,
        bloodType: bloodType,
      })
      .then(() => {
        window.location.reload();
      });
  };
  console.log(authState);
  // console.log(stock);
  console.log(id);

  const columnsUserList = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 3 },
    { field: "amount", headerName: "Amount (Pint)", flex: 3 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            {params.row.UserId === authState.id ||
            authState.type === "admin" ? (
              <>
                <Button
                  //onclick add modal?
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setOpenEdit(true);
                    setBloodType(params.row.bloodType);
                    setAmount(params.row.amount);
                  }}
                  // onClick={() => setOpenAlert(true) & setOpen(false)to={"/admin/edituser/" + params.row.id}}
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
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  //onclick add modal?
                  size="small"
                  variant="disabled"
                  // onClick={() => setOpenAlert(true) & setOpen(false)to={"/admin/edituser/" + params.row.id}}
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
                  Edit
                </Button>
              </>
            )}
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

      <Typography gutterBottom variant="h6" fontWeight={600} fontSize="16">
        Blood Stock
      </Typography>

      <div style={{ color: "#ededed", height: 600, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={stock}
          columns={columnsUserList}
          disableSelectionOnClick={true}
          pageSize={8}
          rowsPerPageOptions={[8]}
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

      <Modal open={openEdit}>
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
              Edit Amount
            </Typography>

            <div className={classes.item}>
              <TextField
                id="standard"
                label="Blood Type"
                variant="standard"
                size="small"
                sx={{ width: "100%" }}
                value={bloodType}
              ></TextField>
            </div>

            <div className={classes.item}>
              <TextField
                id="standard"
                type="number"
                variant="standard"
                label="Amount"
                size="small"
                autoComplete="off"
                defaultValue={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </div>

            <div className={classes.item}>
              <Button
                // component={Link}
                onClick={() => {
                  editAmount();
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
                onClick={() => setOpenEdit(false)}
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
    </div>
  );
};

export default Stock;
