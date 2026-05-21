import { Paper, Stack, Typography, Chip, Box } from "@mui/material";

import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

import formatCurrency from "../../utils/formatCurrency";

const TransactionCard = ({ transaction }) => {
  const isTransfer = transaction?.transactionType === "TRANSFER";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "28px",
        background: "var(--surface-soft)",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--border)",
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        {/* ICON */}

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "16px",
            background: isTransfer
              ? "rgba(34,197,94,0.15)"
              : "rgba(239,68,68,0.15)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isTransfer ? (
            <ArrowUpRight size={24} color="#22c55e" />
          ) : (
            <ArrowDownLeft size={24} color="#ef4444" />
          )}
        </Box>

        {/* STATUS */}

        <Chip
          label={transaction?.status || "SUCCESS"}
          sx={{
            background: "rgba(34,197,94,0.15)",
            color: "#22c55e",
            fontWeight: 700,
          }}
        />
      </Stack>

      {/* TYPE */}

      <Typography
        sx={{
          color: "var(--body-text)",
          fontWeight: 800,
          fontSize: "22px",
          mb: 1,
        }}
      >
        {transaction?.transactionType}
      </Typography>

      {/* AMOUNT */}

      <Typography
        sx={{
          color: isTransfer ? "#22c55e" : "#ef4444",

          fontWeight: 900,
          fontSize: "30px",
          mb: 2,
        }}
      >
        {formatCurrency(transaction?.amount)}
      </Typography>

      {/* ACCOUNT */}

      <Typography
        sx={{
          color: "var(--muted)",
          fontSize: "14px",
          mb: 1,
        }}
      >
        Account: {transaction?.accountNumber}
      </Typography>

      {/* DESCRIPTION */}

      <Typography
        sx={{
          color: "var(--muted)",
          fontSize: "15px",
          mb: 3,
        }}
      >
        {transaction?.description || "No description"}
      </Typography>

      {/* DATE */}

      <Typography
        sx={{
          color: "var(--muted)",
          fontSize: "13px",
        }}
      >
        {new Date(transaction?.createdAt).toLocaleString()}
      </Typography>
    </Paper>
  );
};

export default TransactionCard;
