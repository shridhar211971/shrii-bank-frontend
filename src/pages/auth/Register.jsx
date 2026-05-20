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

    try {
      const result = await dispatch(registerUser(formData)).unwrap();

      toast.success(
        result?.message ||
          result?.data?.message ||
          "Registration successful!"
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
      color: "#fff",

      "& fieldset": {
        borderColor: "#fff",
      },

      "&:hover fieldset": {
        borderColor: "rgb(10, 191, 236)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#22d3ee",
        borderWidth: "2px",
      },
    },

    "& input": {
      color: "#fff",
    },

    "& input::placeholder": {
      color: "#5c5656",
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
            p: { xs: 3, sm: 4, md: 5 },
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: "#fff",
              mb: 1,
              fontSize: {
                xs: "2.5rem",
                sm: "3.5rem",
                md: "4.5rem",
              },
              lineHeight: 1,
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mb: 4,
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
                    mb: 1,
                    color: "#fff",
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
                    mb: 1,
                    color: "#fff",
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
                  mb: 1,
                  color: "#fff",
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
                  mb: 1,
                  color: "#fff",
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
                onChange={handleChange}
                sx={textFieldSx}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  color: "#fff",
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
                background: "#06b6d4",
                fontSize: "18px",
                fontWeight: 700,
                textTransform: "none",

                "&:hover": {
                  background: "#22d3ee",
                },
              }}
            >
              Create Account
            </Button>

            <Typography
              align="center"
              sx={{
                color: "#cbd5e1",
              }}
            >
              Already have an account?

              <Link
                to="/login"
                style={{
                  color: "#22d3ee",
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