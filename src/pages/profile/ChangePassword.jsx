import { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const ChangePassword = ({ open, handleClose, handleSubmitPassword }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      height: 56,

      borderRadius: "18px",

      color: "#fff",

      background: "rgba(255,255,255,0.03)",

      "& fieldset": {
        borderColor: "rgba(255,255,255,0.12)",
      },

      "&:hover fieldset": {
        borderColor: "#22d3ee",
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
      color: "#94a3b8",
      opacity: 1,
    },
  };

  const handleSubmit = () => {
    handleSubmitPassword(formData);

    setFormData({
      oldPassword: "",
      newPassword: "",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg,#071120,#0f172a)",

          border: "1px solid rgba(255,255,255,0.08)",

          borderRadius: "32px",

          overflow: "hidden",

          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        },
      }}
    >
      <DialogContent
        sx={{
          p: {
            xs: 3,
            md: 5,
          },
        }}
      >
        {/* HEADER */}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={5}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 900,
                mb: 1,
              }}
            >
              Change Password
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
              }}
            >
              Secure your banking account
            </Typography>
          </Box>

          <IconButton
            onClick={handleClose}
            sx={{
              color: "#fff",

              background: "rgba(255,255,255,0.05)",

              "&:hover": {
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* FORM */}

        <Stack spacing={4}>
          <Box>
            <Typography
              sx={{
                color: "#fff",
                mb: 1,
                fontWeight: 600,
              }}
            >
              Current Password
            </Typography>

            <TextField
              fullWidth
              type="password"
              name="oldPassword"
              placeholder="Enter current password"
              value={formData.oldPassword}
              onChange={handleChange}
              sx={textFieldSx}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                color: "#fff",
                mb: 1,
                fontWeight: 600,
              }}
            >
              New Password
            </Typography>

            <TextField
              fullWidth
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              sx={textFieldSx}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              height: 56,

              borderRadius: "18px",

              background: "#06b6d4",

              fontWeight: 800,

              textTransform: "none",

              fontSize: "17px",

              boxShadow: "0 10px 30px rgba(6,182,212,0.35)",

              "&:hover": {
                background: "#22d3ee",
              },
            }}
          >
            Update Password
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
