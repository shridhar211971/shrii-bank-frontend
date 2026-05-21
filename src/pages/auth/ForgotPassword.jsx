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
            background: "var(--surface-soft)",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--border)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: "var(--body-text)",
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
              color: "var(--muted)",
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
                  color: "var(--body-text)",
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
              Send Reset Code
            </Button>
            <Typography
    align="center"
    sx={{
      color: "var(--muted)",
    }}
  >
    Remember your password?

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

export default ForgotPassword;