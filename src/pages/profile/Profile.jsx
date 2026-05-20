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

  if (loading && !profile) {
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
  <DashboardLayout>
    <Box>
      {/* HEADER */}

      <Box mb={5}>
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 900,
            mb: 1,
          }}
        >
          My Profile
        </Typography>

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: "16px",
          }}
        >
          Manage your banking account information
        </Typography>
      </Box>

      {/* ================= TOP SECTION ================= */}

      <Grid container spacing={4}>
        {/* PROFILE CARD */}

        <Grid item xs={12} lg={4.8}>
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
              borderRadius: "32px",
              height: "100%",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Stack alignItems="center" spacing={3}>
              <Avatar
                src={
                  profile?.profilePictureUrl
                    ? `http://localhost:8080/${profile.profilePictureUrl}`
                    : ""
                }
                sx={{
                  width: {
                    xs: 150,
                    sm: 220,
                    md: 250,
                  },
                  height: {
                    xs: 150,
                    sm: 220,
                    md: 250,
                  },
                  border: "4px solid rgba(6,182,212,0.4)",
                  background:
                    "linear-gradient(135deg,#06b6d4,#2563eb)",
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

        <Grid item xs={12} lg={7.2}>
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
              borderRadius: "32px",
              height: "100%",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Stack spacing={4}>
              {/* TITLE */}

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
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
                    color: "#94a3b8",
                  }}
                >
                  {profile?.email}
                </Typography>
              </Box>

              <Divider
                sx={{
                  borderColor: "rgba(255,255,255,0.08)",
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

                  color: "#fff",

                  border:
                    "1px solid rgba(255,255,255,0.15)",

                  "&:hover": {
                    border: "1px solid #22d3ee",
                    background:
                      "rgba(6,182,212,0.08)",
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
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* HEADER */}

            <Box mb={4}>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
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
                  color: "#94a3b8",
                }}
              >
                {profile?.email}
              </Typography>
            </Box>

            <Divider
              sx={{
                borderColor: "rgba(255,255,255,0.08)",
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
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",

  transition: "0.3s",

  "&:hover": {
    transform: "translateY(-4px)",
    border: "1px solid rgba(34,211,238,0.3)",
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
  color: "#94a3b8",
  fontSize: "14px",
  mb: 0.5,
};

// VALUE STYLE

const valueStyle = {
  color: "#fff",
  fontWeight: 700,
  fontSize: "18px",
};

export default Profile;