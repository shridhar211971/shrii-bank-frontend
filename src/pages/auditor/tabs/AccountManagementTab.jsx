import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  registerUser,
  forgotPassword,
  resetPassword,
} from "../../../features/auth/authSlice";
import { transferMoney } from "../../../features/transaction/transactionSlice";
import { ROLES } from "../../../constants/roles";
import toast from "react-hot-toast";
// import Register from "../../auth/Register";

const AccountManagementTab = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  // Register Form State
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    roles: "",
  });

  // Deposit Form State
  const [depositData, setDepositData] = useState({
    accountNumber: "",
    amount: "",
    description: "Deposit by Auditor",
  });

  // Reset Password Form State
  const [resetMode, setResetMode] = useState("request");
  const [resetData, setResetData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      height: 56,
      borderRadius: "18px",
      color: "var(--body-text)",
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
      color: "var(--muted)",
      opacity: 1,
    },
  };

  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDepositChange = (e) => {
    setDepositData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetChange = (e) => {
    setResetData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Register User Handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.phoneNumber ||
      !registerData.password ||
      !registerData.roles
    ) {
      toast.error("Please fill all fields, including role");
      return;
    }
    if (Number(depositData.amount) <= 0) {
  toast.error("Amount must be greater than 0");
  return;
}
    if (registerData.phoneNumber.length !== 10) {
  toast.error("Phone number must be 10 digits");
  return;
}
    setLoading(true);
    try {
      const result = await dispatch(registerUser(registerData)).unwrap();
      toast.success(result?.message || "User registered successfully!");
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        roles: "",
      });
    } catch (error) {
      toast.error(error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Deposit Handler
  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    if (!depositData.accountNumber || !depositData.amount) {
      toast.error("Please enter account number and amount");
      return;
    }

    setLoading(true);
    try {
      // Deposit is a transfer with type DEPOSIT
      const result = await dispatch(
        transferMoney({
          ...depositData,
          destinationAccountNumber: depositData.accountNumber,
          type: "DEPOSIT",
        })
      ).unwrap();

      toast.success(result?.message || "Deposit processed successfully!");
      setDepositData({
        accountNumber: "",
        amount: "",
        description: "Deposit by Auditor",
      });
    } catch (error) {
      toast.error(error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Handler
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!resetData.email) {
      toast.error("Please enter the user email");
      return;
    }

    setLoading(true);
    try {
      await dispatch(forgotPassword({ email: resetData.email })).unwrap();
      toast.success("Reset code sent to user email");
      setResetMode("confirm");
    } catch (error) {
      toast.error(error || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password Handler
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!resetData.code || !resetData.newPassword) {
      toast.error("Please enter the reset code and new password");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(
        resetPassword({ code: resetData.code, password: resetData.newPassword })
      ).unwrap();
      toast.success(result?.message || "Password reset successfully");
      setResetMode("request");
      setResetData({
        email: "",
        code: "",
        newPassword: "",
      });
    } catch (error) {
      toast.error(error || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* TAB NAVIGATION */}
      {/* <Paper
        elevation={0}
        sx={{
          background: "var(--surface-soft)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          mb: 4,
        }}
      > */}
           <Box mb={5}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "var(--body-text)",
                            fontWeight: 900,
                            mb: 1,
                          }}
                        >
                          Account Management
                        </Typography>
                
                        <Typography
                          sx={{
                            color: "var(--muted)",
                            fontSize: "16px",
                          }}
                        >
                          Manage your bank accounts and transactions
                        </Typography>
                      </Box>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            mb: 2,
            "& .MuiTab-root": {
              color: "var(--body-text)",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              "&.Mui-selected": {
                color: "var(--accent)",
              },
            },
            "& .MuiTabs-indicator": {
              background: "var(--accent)",
              height: 3,
            },
          }}
        >
          <Tab label="Register User" />
          <Tab label="Reset Password" />
          <Tab label="Deposit Money" />
        </Tabs>
      {/* </Paper> */}

      {/* TAB CONTENT */}
      <Grid container spacing={4}>
        {/* REGISTER USER TAB */}
        {activeTab === 0 && (
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: "var(--surface-soft)",
                border: "1px solid var(--border)",
                borderRadius: "24px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--body-text)",
                  fontWeight: 900,
                  mb: 2,
                }}
              >
                Register New User
              </Typography>

              <form onSubmit={handleRegisterSubmit}>
                <Stack spacing={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                        First Name
                      </Typography>
                      <TextField
                        fullWidth
                        name="firstName"
                        placeholder="John"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        sx={textFieldSx}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                        Last Name
                      </Typography>
                      <TextField
                        fullWidth
                        name="lastName"
                        placeholder="Doe"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        sx={textFieldSx}
                      />
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      placeholder="user@example.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      sx={textFieldSx}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      placeholder="+91 XXXXXXXXXX"
                      value={registerData.phoneNumber}
                    //   onChange={handleRegisterChange}
                    //   sx={textFieldSx}
                     onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setRegisterData((prev) => ({
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
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      sx={textFieldSx}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      Role
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      name="roles"
                      value={registerData.roles}
                      onChange={handleRegisterChange}
                      sx={textFieldSx}
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select role</option>
                      {Object.values(ROLES).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </TextField>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      height: 56,
                      borderRadius: "18px",
                      background: "var(--accent)",
                      color: "var(--surface)",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Register User"}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        // <Register isAuditor={true} />
        
        )}

        {/* RESET PASSWORD TAB */}
        {activeTab === 1 && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: "var(--surface-soft)",
                border: "1px solid var(--border)",
                borderRadius: "24px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--body-text)",
                  fontWeight: 900,
                  mb: 4,
                }}
              >
                Reset User Password
              </Typography>

              <form onSubmit={resetMode === "confirm" ? handleResetSubmit : handleForgotSubmit}>
                <Stack spacing={3}>
                  <Box>
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      User Email
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      placeholder="user@example.com"
                      value={resetData.email}
                      onChange={handleResetChange}
                      sx={textFieldSx}
                      disabled={resetMode === "confirm"}
                    />
                  </Box>

                  {resetMode === "confirm" && (
                    <>
                      <Box>
                        <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                          Reset Code
                        </Typography>
                        <TextField
                          fullWidth
                          name="code"
                          placeholder="Enter reset code"
                          value={resetData.code}
                          onChange={handleResetChange}
                          sx={textFieldSx}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                          New Password
                        </Typography>
                        <TextField
                          fullWidth
                          name="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          value={resetData.newPassword}
                          onChange={handleResetChange}
                          sx={textFieldSx}
                        />
                      </Box>
                    </>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      height: 56,
                      borderRadius: "18px",
                      background: "var(--accent)",
                      color: "var(--surface)",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : resetMode === "confirm" ? (
                      "Submit New Password"
                    ) : (
                      "Send Reset Email"
                    )}
                  </Button>

                  {resetMode === "confirm" && (
                    <Button
                      type="button"
                      fullWidth
                      variant="outlined"
                      onClick={handleForgotSubmit}
                      disabled={loading || !resetData.email}
                      sx={{
                        height: 56,
                        borderRadius: "18px",
                        borderColor: "var(--accent)",
                        color: "var(--accent)",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      Resend Code
                    </Button>
                  )}
                </Stack>
              </form>
            </Paper>
          </Grid>
        )}

        {/* DEPOSIT MONEY TAB */}
        {activeTab === 2 && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: "var(--surface-soft)",
                border: "1px solid var(--border)",
                borderRadius: "24px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--body-text)",
                  fontWeight: 900,
                  mb: 4,
                }}
              >
                Deposit Money
              </Typography>

              <form onSubmit={handleDepositSubmit}>
                <Stack spacing={3}>
                  <Box>
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      Account Number
                    </Typography>
                    <TextField
                      fullWidth
                      name="accountNumber"
                      placeholder="Enter account number"
                      value={depositData.accountNumber}
                      onChange={handleDepositChange}
                      sx={textFieldSx}
                      type="number"
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      Amount (₹)
                    </Typography>
                    <TextField
                      fullWidth
                      name="amount"
                      placeholder="Enter amount"
                      value={depositData.amount}
                      onChange={handleDepositChange}
                      sx={textFieldSx}
                      type="number"
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ color: "var(--body-text)", mb: 1, fontWeight: 500 }}>
                      Description
                    </Typography>
                    <TextField
                      fullWidth
                      name="description"
                      placeholder="Deposit details"
                      multiline
                      rows={3}
                      value={depositData.description}
                      onChange={handleDepositChange}
                      sx={{
                        ...textFieldSx,
                        "& .MuiOutlinedInput-root": {
                          ...textFieldSx["& .MuiOutlinedInput-root"],
                          height: "auto",
                        },
                      }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      height: 56,
                      borderRadius: "18px",
                      background: "#22c55e",
                      color: "white",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Process Deposit"}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AccountManagementTab;
