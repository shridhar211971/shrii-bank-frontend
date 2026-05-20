import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { forgotPassword } from "../../features/auth/authSlice";
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

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        forgotPassword({ email })
      ).unwrap();

      toast.success(
        result?.message ||
          result?.data?.message ||
          "Reset code sent to your email!"
      );

      navigate("/reset-password");
    } catch (error) {
      toast.error(error || "Failed to send reset code");
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
        borderColor: "#fff",
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
      color: "#fff",
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
        px={2}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "620px",
            borderRadius: "32px",
            p: { xs: 3, sm: 5, md: 6 },
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
                md: "4.5rem",
              },
              lineHeight: 1,
            }}
          >
            Forgot Password
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mb: 5,
              fontSize: {
                xs: "14px",
                sm: "16px",
              },
            }}
          >
            Receive reset code on your email
          </Typography>

          <Stack spacing={4}>
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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Send Reset Code
            </Button>
            <Typography
    align="center"
    sx={{
      color: "#cbd5e1",
    }}
  >
    Remember your password?

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

export default ForgotPassword;