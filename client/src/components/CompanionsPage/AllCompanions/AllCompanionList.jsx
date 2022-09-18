import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CompanionRequestList = ({ user }) => {
  return (
    <Container>
      <Card
        sx={{
          width: "100%",
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
              width: "100%",
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
              height: 50,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: 16 }}>
              {user?.userName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default CompanionRequestList;
