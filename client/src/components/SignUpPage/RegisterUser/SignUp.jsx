import React from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        fontFamily="Open Sans"
        {...props}
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

  const onSubmit = (data) => {
    axios.post("http://localhost:3006/auth", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        navigate("/signIn");
      }
    });
  };

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "Must be within 20 characters")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be within 20 characters")
      .required("Required"),
    email: Yup.string().email().required("Email required"),
    password: Yup.string()
      .min(6, "Must be more than 6 characters")
      .required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validate}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 fw-bold display-5">Sign Up</h1>
          <Form>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="Last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="text" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#01BF71",
                "&:hover": { bgcolor: "#4e9258" },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signUpBB" variant="body2">
                  Sign Up as Bloodbank?
                </Link>
                <br />
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
          <Copyright sx={{ mt: 5, mb: 3 }} />
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
