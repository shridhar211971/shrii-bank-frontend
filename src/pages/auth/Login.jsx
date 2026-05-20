import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      const result = await dispatch(loginUser(formData)).unwrap();

      toast.success(
        result?.message ||
          result?.data?.message ||
          "Login successful!"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(error || "Login failed");
    }
  };

  // Reusable TextField Style
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      height: 56,
      borderRadius: "18px",
      color: "#fff",

      "& fieldset": {
        borderColor: "#fff",
      },

      "&:hover fieldset": {
        borderColor: "#fff",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#22d3ee",
        borderWidth: "2px",
      },
    },

    "& input::placeholder": {
      color: "#fff",
      opacity: 1,
    },
  };

  return (
    <AuthLayout>
      <Box display="flex" justifyContent="center">
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "720px",
            borderRadius: "32px",
            p: { xs: 3, sm: 5, md: 7 },
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
                sm: "4rem",
                md: "5rem",
              },
              lineHeight: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mb: 5,
              fontSize: {
                xs: "14px",
                sm: "16px",
                md: "18px",
              },
            }}
          >
            Login to continue your banking journey
          </Typography>

          <Stack spacing={4}>
            {/* Email */}
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

            {/* Password */}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                sx={textFieldSx}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Link
                to="/forgot-password"
                style={{
                  color: "#22d3ee",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Forgot Password?
              </Link>
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
              Login
            </Button>

            <Typography align="center" sx={{ color: "#cbd5e1" }}>
              Don&apos;t have an account?

              <Link
                to="/register"
                style={{
                  color: "#22d3ee",
                  marginLeft: "8px",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </AuthLayout>
  );
};

export default Login;