import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phoneNumber.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      const result = await dispatch(registerUser(formData)).unwrap();

      toast.success(
        result?.message || result?.data?.message || "Registration successful!",
      );

      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  // Reusable White TextField Style
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      height: 56,
      borderRadius: "18px",
      color: "var(--body-text)",

      "& fieldset": {
        borderColor: "var(--border)",
      },

      "&:hover fieldset": {
        borderColor: "var(--border)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "var(--accent)",
        borderWidth: "2px",
      },
    },

    "& input": {
      color: "var(--body-text)",
    },

    "& input::placeholder": {
      color: "var(--muted)",
      opacity: 1,
    },
  };

  return (
    <AuthLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        py={3}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "760px",
            borderRadius: "32px",
            p: { xs: 2, sm: 3, md: 4 },
            background: "var(--surface-soft)",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--border)",
          }}
          style={{marginBottom:"20px"}}

        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "var(--body-text)",
              mb: 1,
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
              lineHeight: 1,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              color: "var(--muted)",
              mb: 1,
              fontSize: {
                xs: "14px",
                sm: "16px",
              },
            }}
          >
            Start your digital banking journey
          </Typography>

          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    // mb: 1,
                    color: "var(--body-text)",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  First Name
                </Typography>

                <TextField
                  fullWidth
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={textFieldSx}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    // mb: 1,
                    color: "var(--body-text)",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  Last Name
                </Typography>

                <TextField
                  fullWidth
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={textFieldSx}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography
                sx={{
                  // mb: 1,
                  color: "var(--body-text)",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                Email Address
              </Typography>

              <TextField
                fullWidth
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                sx={textFieldSx}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  // mb: 1,
                  color: "var(--body-text)",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                Phone Number
              </Typography>

              <TextField
                fullWidth
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: value,
                    }));
                  }
                }}
                sx={textFieldSx}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  // mb: 1,
                  color: "var(--body-text)",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                Password
              </Typography>

              <TextField
                fullWidth
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                sx={textFieldSx}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: 56,
                borderRadius: "18px",
                background: "var(--accent)",
                color: "var(--surface)",
                fontSize: "18px",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 16px 40px rgba(34,211,238,0.16)",

                "&:hover": {
                  background: "rgba(34,211,238,0.95)",
                },
              }}
            >
              Create Account
            </Button>

            <Typography
              align="center"
              sx={{
                color: "var(--muted)",
              }}
            >
              Already have an account?
              <Link
                to="/login"
                style={{
                  color: "var(--accent)",
                  marginLeft: "8px",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </AuthLayout>
  );
};

export default Register;
