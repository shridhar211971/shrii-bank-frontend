import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getProfile,
  updatePassword,
  uploadProfilePhoto,
} from "../../features/profile/profileSlice";

import { getMyAccounts } from "../../features/account/accountSlice";

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import toast from "react-hot-toast";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LockResetIcon from "@mui/icons-material/LockReset";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import ChangePassword from "./ChangePassword";

const Profile = () => {
  const dispatch = useDispatch();

  const [openPassword, setOpenPassword] = useState(false);

  const { profile, loading } = useSelector((state) => state.profile);

  const { accounts } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyAccounts());
  }, [dispatch]);

  const account = accounts?.[0];

  // PASSWORD UPDATE
  const handleSubmitPassword = async (formData) => {
    try {
      const result = await dispatch(updatePassword(formData)).unwrap();

      toast.success(result?.message || "Password updated");

      setOpenPassword(false);
    } catch (error) {
      toast.error(error || "Failed to update password");
    }
  };

  // PHOTO UPLOAD
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const result = await dispatch(uploadProfilePhoto(file)).unwrap();

      toast.success(result?.message || "Photo updated");

      dispatch(getProfile());
    } catch (error) {
      toast.error(error || "Upload failed");
    }
  };

  if (loading || !profile || !accounts?.length) {
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center"  minHeight="80vh">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
  <DashboardLayout>
    <Box  sx={{ width: "100%" }}>
      {/* HEADER */}

      <Box mb={5}>
        <Typography
          variant="h4"
          sx={{
            color: "var(--body-text)",
            fontWeight: 900,
            mb: 1,
          }}
        >
          My Profile
        </Typography>

        <Typography
          sx={{
            color: "var(--muted)",
            fontSize: "16px",
          }}
        >
          Manage your banking account information
        </Typography>
      </Box>

      {/* ================= TOP SECTION ================= */}

      <Grid container spacing={3}  alignItems="stretch">
        {/* PROFILE CARD */}

        <Grid item xs={12} md={4} display="flex">
          <Paper
            elevation={0}
            
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
              borderRadius: "32px",
              height: "100%",
              minHeight: 420,
              width: "100%",
              background: "var(--surface-soft)",
              backdropFilter: "blur(24px)",
              border: "1px solid var(--border)",
            }}
          >
            <Stack  spacing={3}>
              <Avatar
                src={
                  profile?.profilePictureUrl
                    ? `http://localhost:8080/${profile.profilePictureUrl}`
                    : ""
                }
                sx={{
                  width: {
                    xs: 140,
                    sm: 180,
                    md: 200,
                  },
                  height: {
                    xs: 140,
                    sm: 180,
                    md: 200,
                  },
                  border: "4px solid rgba(34,211,238,0.35)",
                  background:
                    "linear-gradient(135deg,var(--accent),#2563eb)",
                  fontSize: {
                    xs: "50px",
                    md: "70px",
                  },
                  fontWeight: 700,
                }}
              >
                {profile?.firstName?.[0]}
              </Avatar>

              <Button
                component="label"
                startIcon={<CameraAltIcon />}
                variant="contained"
                sx={{
                  borderRadius: "16px",
                  background: "#06b6d4",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  width: "100%",
                  maxWidth: "320px",

                  "&:hover": {
                    background: "#22d3ee",
                  },
                }}
              >
                Upload / Update Photo

                <input
                  hidden
                  type="file"
                  onChange={handlePhotoUpload}
                />
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* ACCOUNT DETAILS */}

        <Grid item xs={12} md={8} display="flex">
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              p: {
                xs: 3,
                md: 5,
              },
              borderRadius: "32px",
              height: "100%",
              minHeight: 420,
              background: "var(--surface-soft)",
              backdropFilter: "blur(24px)",
              border: "1px solid var(--border)",
            }}
          >
            <Stack spacing={4}>
              {/* TITLE */}

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "var(--body-text)",
                    fontWeight: 900,
                    mb: 1,
                    fontSize: {
                      xs: "28px",
                      md: "38px",
                    },
                  }}
                >
                  Account Details
                </Typography>

                <Typography
                  sx={{
                    color: "var(--muted)",
                  }}
                >
                  {profile?.email}
                </Typography>
              </Box>

              <Divider
                sx={{
                  borderColor: "var(--border)",
                }}
              />

              {/* ACCOUNT CARDS */}

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={infoCard}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Box sx={iconBox}>
                        <CreditCardIcon />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Account Number
                        </Typography>

                        <Typography sx={valueStyle}>
                          {account?.accountNumber}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={infoCard}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Box sx={iconBox}>
                        <AccountBalanceWalletIcon />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Account Type
                        </Typography>

                        <Typography sx={valueStyle}>
                          {account?.accountType}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={infoCard}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Box sx={iconBox}>
                        <CurrencyRupeeIcon />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Balance
                        </Typography>

                        <Typography
                          sx={{
                            ...valueStyle,
                            color: "#22c55e",
                          }}
                        >
                          ₹ {account?.balance}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={infoCard}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Box sx={iconBox}>
                        <AccountBalanceWalletIcon />
                      </Box>

                      <Box>
                        <Typography sx={labelStyle}>
                          Status
                        </Typography>

                        <Chip
                          label={account?.status}
                          sx={{
                            background:
                              "rgba(34,197,94,0.15)",
                            color: "#22c55e",
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              {/* BUTTON */}

              <Button
                startIcon={<LockResetIcon />}
                onClick={() => setOpenPassword(true)}
                variant="outlined"
                sx={{
                  borderRadius: "16px",
                  textTransform: "none",
                  fontWeight: 700,
                  height: 52,
                  width: {
                    xs: "100%",
                    sm: "260px",
                  },

                  color: "var(--body-text)",

                  border: "1px solid var(--border)",

                  "&:hover": {
                    border: "1px solid var(--accent)",
                    background: "rgba(6,182,212,0.08)",
                  },
                }}
              >
                Change Password
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= PERSONAL DETAILS ================= */}

      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
              borderRadius: "32px",
              background: "var(--surface-soft)",
              backdropFilter: "blur(24px)",
              border: "1px solid var(--border)",
            }}
          >
            {/* HEADER */}

            <Box mb={4}>
              <Typography
                variant="h4"
                sx={{
                  color: "var(--body-text)",
                  fontWeight: 900,
                  mb: 1,
                  fontSize: {
                    xs: "28px",
                    md: "38px",
                  },
                }}
              >
                Personal Details
              </Typography>

              <Typography
                sx={{
                  color: "var(--muted)",
                }}
              >
                {profile?.email}
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor: "var(--border)",
                mb: 4,
              }}
            />

            {/* PERSONAL INFO */}

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={0} sx={infoCard}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Box sx={iconBox}>
                      <PersonIcon />
                    </Box>

                    <Box>
                      <Typography sx={labelStyle}>
                        First Name
                      </Typography>

                      <Typography sx={valueStyle}>
                        {profile?.firstName}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={0} sx={infoCard}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Box sx={iconBox}>
                      <PersonIcon />
                    </Box>

                    <Box>
                      <Typography sx={labelStyle}>
                        Last Name
                      </Typography>

                      <Typography sx={valueStyle}>
                        {profile?.lastName}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Paper elevation={0} sx={infoCard}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Box sx={iconBox}>
                      <PhoneIcon />
                    </Box>

                    <Box>
                      <Typography sx={labelStyle}>
                        Mobile Number
                      </Typography>

                      <Typography sx={valueStyle}>
                        {profile?.phoneNumber}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper elevation={0} sx={infoCard}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Box sx={iconBox}>
                      <EmailIcon />
                    </Box>

                    <Box>
                      <Typography sx={labelStyle}>
                        Email Address
                      </Typography>

                      <Typography sx={valueStyle}>
                        {profile?.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* PASSWORD MODAL */}

      <ChangePassword
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
        handleSubmitPassword={handleSubmitPassword}
      />
    </Box>
  </DashboardLayout>
);
};

// CARD STYLE

const infoCard = {
  p: 3,
  height: "100%",
  borderRadius: "24px",
  background: "var(--surface-soft)",
  border: "1px solid var(--border)",

  transition: "0.3s",

  "&:hover": {
    transform: "translateY(-4px)",
    border: "1px solid var(--accent)",
  },
};

// ICON STYLE

const iconBox = {
  width: 50,
  height: 50,
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(6,182,212,0.15)",
  color: "#22d3ee",
  flexShrink: 0,
};

// LABEL STYLE

const labelStyle = {
  color: "var(--muted)",
  fontSize: "14px",
  mb: 0.5,
};

// VALUE STYLE

const valueStyle = {
  color: "var(--body-text)",
  fontWeight: 700,
  fontSize: "18px",
};

export default Profile;