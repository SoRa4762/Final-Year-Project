import React, { useState, useContext } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      fontFamily="Open Sans"
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Ragat ra Sambandha
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans", "Outfit", "Helvetica", "Arial", sans-serif`,
  },
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { email: email, password: password, type: userType };
    axios.post("http://localhost:3006/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        //(response after accessToken means i am putting the value to the accessToken)
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          type: response.data.type,
          username: response.data.username,
          profilePicture: response.data.profilePicture,
          status: true,
        });
        if (response.data.type === "user") {
          navigate("/home");
        } else if (response.data.type === "bloodbank") {
          navigate(`/bloodbank/${response.data.id}`);
        } else {
          navigate("/admin");
        }
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Sign In
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              select
              required
              fullWidth
              name="type"
              id="type"
              label="Sign In As"
              helperText="Select The User Type"
              value={userType}
              onChange={(event) => {
                setUserType(event.target.value);
              }}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="bloodbank">Bloodbank</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => {
                login();
                e.preventDefault();
              }}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#01BF71",
                "&:hover": { bgcolor: "#4e9258" },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 3 }} />
      </Container>
    </ThemeProvider>
  );
}
