import React from "react";
// import { makeStyles } from "@mui/styles";
import { Container, Grid } from "@mui/material";
import { Users } from "../HomePage/DummyData";
import CompanionRequestList from "./CompanionRequestList";

// const useStyles = makeStyles((theme) => ({}));

const Feed = () => {
  // const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={0}>
        {Users.map((u) => (
          <Grid item xs={6} md={4} lg={3}>
            <CompanionRequestList key={u.id} user={u} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Feed;
