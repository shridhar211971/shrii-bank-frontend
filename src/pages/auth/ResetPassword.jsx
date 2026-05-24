import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../features/auth/authSlice";
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

const ResetPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const result = await dispatch(resetPassword(formData)).unwrap();
      const message = result?.message || result?.data?.message || "Password reset successful! Please login.";
      toast.success(message);

      navigate("/login");
    } catch (error) {
      toast.error(error || "Failed to reset password");
    }
  };

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
            Reset Password
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
            Enter your reset code and new password.
          </Typography>

          <Stack spacing={4}>
            <TextField
              fullWidth
              name="code"
              label="Reset Code"
              placeholder="Enter reset code"
              value={formData.code}
              onChange={handleChange}
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              type="password"
              name="password"
              label="New Password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              sx={textFieldSx}
            />

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
              Reset Password
            </Button>
          </Stack>
        </Paper>
      </Box>
    </AuthLayout>
  );
};

export default ResetPassword;