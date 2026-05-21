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
  Divider,
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
      color: "var(--body-text)",
      background: "var(--surface-soft)",
      "& fieldset": {
        borderColor: "var(--border)",
      },
      "&:hover fieldset": {
        borderColor: "var(--accent)",
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
          background: "var(--surface)",

          

          borderRadius: "32px",

          overflow: "hidden",

          boxShadow: "var(--shadow)",
        },
      }}
    >
      <DialogContent
          sx={{
            background: "var(--surface)",
            color: "var(--body-text)",
            // borderRadius: "28px",
            p: 5,
            position: "relative",
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
                color: "var(--body-text)",
                fontWeight: 900,
              }}
            >
              Change Password
            </Typography>

            <Typography
             sx={{
              color: "var(--body-text)",
              fontWeight: 700,
            }}
            >
              Secure your banking account
            </Typography>
             <Divider
              sx={{
                borderColor: "var(--border)",
                mb: 4,
              }}
            />
          </Box>

         <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,

              background: "var(--surface-soft)",
              color: "var(--body-text)",

              "&:hover": {
                background: "rgba(34,211,238,0.15)",
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
                color: "var(--body-text)",
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
                color: "var(--body-text)",
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
              background: "var(--accent)",
              fontWeight: 800,
              textTransform: "none",
              fontSize: "17px",
              boxShadow: "0 10px 30px rgba(34,211,238,0.25)",
              "&:hover": {
                background: "rgba(34,211,238,0.95)",
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
