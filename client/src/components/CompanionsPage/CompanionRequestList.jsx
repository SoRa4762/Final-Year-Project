import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CompanionRequestList = ({ user }) => {
  return (
    <Container>
      <Card
        sx={{
          whiteSpace: "noWrap",
          marginTop: useTheme().spacing(10),
        }}
      >
        <CardActionArea>
          <CardMedia
            //onclick redirect to users profile
            component="img"
            sx={{
              backgroundColor: "#AEADA3",
              height: { sm: 200, xs: 150, md: 250 },
              objectFit: "cover",
            }}
            image={user?.profilePicture}
            title={user?.userName}
          />
          <CardContent
            sx={{
              backgroundColor: "#E5E0DD",
              color: "#393939",
              borderTop: "1px solid #393939",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: 16 }}>
              {user?.userName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            borderTop: "1px solid #393939",
            backgroundColor: "#E5E0DD",
          }}
        >
          <Grid container spacing={1} justifyContent="center">
            <Grid item sm={6}>
              <Button
                variant="contained"
                // onClick={() => setOpenAlert(true) & setEditProfile(false)}
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
                // onClick={() => setEditProfile(false)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

export default CompanionRequestList;
