import { useState } from "react";

import { useDispatch } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  transferMoney,
  withdrawMoney,
} from "../../features/transaction/transactionSlice";

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

const Transfer = () => {
  const dispatch = useDispatch();
  const myAccountNumber = sessionStorage.getItem("accountNumber");
  // TRANSFER STATE

  const [transferData, setTransferData] = useState({
    accountNumber: myAccountNumber || "",
    destinationAccountNumber: "",
    amount: "",
    description: "",
  });

  // WITHDRAW STATE

  const [withdrawData, setWithdrawData] = useState({
    accountNumber: myAccountNumber || "",
    amount: "",
    description: "",
  });

  // COMMON STYLE

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

  // TRANSFER CHANGE

  const handleTransferChange = (e) => {
    setTransferData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // WITHDRAW CHANGE

  const handleWithdrawChange = (e) => {
    setWithdrawData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // TRANSFER SUBMIT

  const handleTransferSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(transferMoney(transferData)).unwrap();

      toast.success(result?.message || "Transfer successful!");

      setTransferData({
        accountNumber: "",
        destinationAccountNumber: "",
        amount: "",
        description: "",
      });
    } catch (error) {
      toast.error(error || "Transfer failed");
    }
  };

  // WITHDRAW SUBMIT

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(withdrawMoney(withdrawData)).unwrap();

      toast.success(result?.message || "Withdraw successful!");

      setWithdrawData({
        accountNumber: "",
        amount: "",
        description: "",
      });
    } catch (error) {
      toast.error(error || "Withdraw failed");
    }
  };

  return (
    <DashboardLayout>
      <Box>
        {/* TITLE */}

        <Box mb={5}>
          <Typography
            variant="h4"
            sx={{
              color: "var(--body-text)",
              fontWeight: 900,
              mb: 1,
            }}
          >
            Transaction Funds
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "16px",
              mb: 1,
            }}
          >
            Send or withdraw money securely
          </Typography>
        </Box>

        {/* GRID */}

        <Grid container spacing={6}>
          {/* TRANSFER */}

          <Grid item xs={12} lg={6}>
            <Paper
              component="form"
              onSubmit={handleTransferSubmit}
              elevation={0}
              sx={{
                borderRadius: "32px",
                p: 4,
                background: "var(--surface-soft)",
                backdropFilter: "blur(24px)",
                border: "1px solid var(--border)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--body-text)",
                  fontWeight: 900,
                  mb: 1,
                }}
              >
                Transfer Money
              </Typography>

              <Stack spacing={2}>
                {/* <TextField
                  fullWidth
                  name="accountNumber"
                  placeholder="Your account number"
                  value={transferData.accountNumber}
                  onChange={handleTransferChange}
                  sx={textFieldSx}
                /> */}

                <TextField
                  fullWidth
                  name="destinationAccountNumber"
                  placeholder="Receiver account number"
                  value={transferData.destinationAccountNumber}
                  onChange={handleTransferChange}
                  sx={textFieldSx}
                  type="number"
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />

                <TextField
                  fullWidth
                  name="amount"
                  placeholder="Enter amount"
                  value={transferData.amount}
                  onChange={handleTransferChange}
                  sx={textFieldSx}
                  type="number"
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />

                <TextField
                  fullWidth
                  name="description"
                  placeholder="Payment note"
                  value={transferData.description}
                  onChange={handleTransferChange}
                  sx={textFieldSx}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    height: 56,
                    borderRadius: "18px",
                    background: "#06b6d4",
                    fontWeight: 700,
                    textTransform: "none",

                    "&:hover": {
                      background: "#22d3ee",
                    },
                  }}
                >
                  Send Transfer
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* WITHDRAW */}

          <Grid item xs={12} lg={6}>
            <Paper
              component="form"
              onSubmit={handleWithdrawSubmit}
              elevation={0}
              sx={{
                borderRadius: "32px",
                p: 4,
                background: "var(--surface-soft)",
                backdropFilter: "blur(24px)",
                border: "1px solid var(--border)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "var(--body-text)",
                  fontWeight: 800,
                  mb: 4,
                }}
              >
                Withdraw Money
              </Typography>

              <Stack spacing={2}>
                {/* <TextField
                  fullWidth
                  name="accountNumber"
                  placeholder="Your account number"
                  value={withdrawData.accountNumber}
                  onChange={handleWithdrawChange}
                  sx={textFieldSx}
                /> */}

                <TextField
                  fullWidth
                  name="amount"
                  placeholder="Enter amount"
                  value={withdrawData.amount}
                  onChange={handleWithdrawChange}
                  sx={textFieldSx}
                  type="number"
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />

                <TextField
                  fullWidth
                  name="description"
                  placeholder="Withdraw note"
                  value={withdrawData.description}
                  onChange={handleWithdrawChange}
                  sx={textFieldSx}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    height: 56,
                    borderRadius: "18px",
                    background: "#ef4444",
                    fontWeight: 700,
                    textTransform: "none",

                    "&:hover": {
                      background: "#f87171",
                    },
                  }}
                >
                  Withdraw Money
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Transfer;
