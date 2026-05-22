// TransactionsTab.jsx

import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";

import {
  clearTransaction,
  clearTransactions,
  getTransactionById,
  getTransactionsByAccount,
} from "../../../features/auditor/auditorSlice";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import DownloadIcon from "@mui/icons-material/Download";

import toast from "react-hot-toast";

const TransactionsTab = () => {
  const dispatch = useDispatch();

  const { transactions, transaction, loading } = useSelector(
    (state) => state.auditor,
  );

  const [searchType, setSearchType] = useState("account");

  const [searchValue, setSearchValue] = useState("");

  // =========================
  // CLEAR DATA
  // =========================

  const handleFilterChange = (value) => {
    setSearchType(value);

    setSearchValue("");

    dispatch(clearTransactions());

    dispatch(clearTransaction());
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      toast.error("Please enter value");

      return;
    }

    dispatch(clearTransactions());

    dispatch(clearTransaction());

    try {
      if (searchType === "account") {
        await dispatch(getTransactionsByAccount(searchValue)).unwrap();

        toast.success("Transactions fetched");
      } else {
        await dispatch(getTransactionById(searchValue)).unwrap();

        toast.success("Transaction fetched");
      }
    } catch (error) {
      toast.error(error || "Search failed");
    }
  };

  // =========================
  // TABLE ROWS
  // =========================

  const rows = useMemo(() => {
    if (Array.isArray(transactions)) {
      return transactions.map((t) => ({
        id: t.id,

        amount: t.amount,

        transactionType: t.transactionType,

        description: t.description,

        transactionDate: t.transactionDate,

        sourceAccount: t.sourceAccount || "-",

        destinationAccount: t.destinationAccount || "-",

        status: t.status || "SUCCESS",
      }));
    }

    return [];
  }, [transactions]);

  // =========================
  // TABLE COLUMNS
  // =========================

  const columns = [
    {
      field: "id",

      headerName: "ID",

      width: 90,
    },

    {
      field: "transactionType",

      headerName: "Type",

      flex: 1,

      minWidth: 140,

      renderCell: (params) => {
        const value = params.value;

        return (
          <Chip
            label={value}
            sx={{
              fontWeight: 700,

              background:
                value === "DEPOSIT"
                  ? "rgba(34,197,94,0.15)"
                  : value === "WITHDRAWAL"
                    ? "rgba(239,68,68,0.15)"
                    : "rgba(59,130,246,0.15)",

              border: `1px solid ${
                value === "DEPOSIT"
                  ? "#22c55e"
                  : value === "WITHDRAWAL"
                    ? "#ef4444"
                    : "#3b82f6"
              }`,

              color:
                value === "DEPOSIT"
                  ? "#22c55e"
                  : value === "WITHDRAWAL"
                    ? "#ef4444"
                    : "#3b82f6",
            }}
          />
        );
      },
    },

    {
      field: "amount",

      headerName: "Amount",

      flex: 1,

      minWidth: 130,

      renderCell: (params) => (
        <Typography fontWeight={700}>
          ₹{params.value?.toLocaleString()}
        </Typography>
      ),
    },

    {
      field: "description",

      headerName: "Description",

      flex: 1.5,

      minWidth: 240,
    },

    {
      field: "sourceAccount",

      headerName: "Source",

      flex: 1,

      minWidth: 180,
    },

    {
      field: "destinationAccount",

      headerName: "Destination",

      flex: 1,

      minWidth: 180,
    },

    {
      field: "transactionDate",

      headerName: "Date",

      flex: 1.3,

      minWidth: 200,

      renderCell: (params) => (
        <Typography>{new Date(params.value).toLocaleString()}</Typography>
      ),
    },

    {
      field: "status",

      headerName: "Status",

      flex: 1,

      minWidth: 120,

      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            background: "rgba(34,197,94,0.15)",

            border: "1px solid #22c55e",

            color: "#22c55e",

            fontWeight: 700,
          }}
        />
      ),
    },
  ];

  // =========================
  // DOWNLOAD PDF
  // =========================

  const handleDownloadPDF = () => {
    if (rows.length === 0 && !transaction) {
      toast.error("No data found");

      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Shrii Bank Transaction Report", 14, 20);

    if (searchType === "id") {
      autoTable(doc, {
        startY: 30,

        head: [["Field", "Value"]],

        body: [
          ["Transaction ID", transaction.id],

          ["Amount", `₹ ${transaction.amount}`],

          ["Type", transaction.transactionType],

          ["Description", transaction.description],

          ["Status", transaction.status],

          ["Source", transaction.sourceAccount || "-"],

          ["Destination", transaction.destinationAccount || "-"],

          ["Date", new Date(transaction.transactionDate).toLocaleString()],
        ],
      });
    } else {
      autoTable(doc, {
        startY: 30,

        head: [["ID", "Type", "Amount", "Description", "Status"]],

        body: rows.map((r) => [
          r.id,

          r.transactionType,

          `₹ ${r.amount}`,

          r.description,

          r.status,
        ]),
      });
    }

    doc.save("transactions-report.pdf");

    toast.success("PDF downloaded");
  };

  return (
    <Box
      sx={{
        background: "var(--body-bg)",

        color: "var(--body-text)",

        minHeight: "100vh",
      }}
    >
      <Box mb={5}>
        <Typography
          variant="h5"
          sx={{
            color: "var(--body-text)",
            fontWeight: 900,
            mb: 1,
          }}
        >
          User Transactions
        </Typography>

        <Typography
          sx={{
            color: "var(--muted)",
            fontSize: "16px",
          }}
        >
          Review your recent banking transactions and search by account or
          transaction ID
        </Typography>
      </Box>
      {/* SEARCH */}

      <Paper
        elevation={0}
        sx={{
          p: 3,

          mb: 3,

          borderRadius: 4,

          background: "var(--surface-soft)",

          border: "1px solid var(--border)",

          boxShadow: "var(--shadow)",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <FormControl style={{ width: "600px" }}>
            <InputLabel
              sx={{
                color: "var(--muted)",
              }}
            >
              Search Type
            </InputLabel>

            <Select
              value={searchType}
              label="Search Type"
              onChange={(e) => handleFilterChange(e.target.value)}
              sx={{
                borderRadius: 3,
                color: "var(--body-text)",
                background: "var(--surface)",

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border)",
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },

                "& .MuiSvgIcon-root": {
                  color: "var(--body-text)",
                },
              }}
            >
              <MenuItem value="account">Search By Account</MenuItem>

              <MenuItem value="id">Search By Transaction ID</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label={
              searchType === "account"
                ? "Enter Account Number"
                : "Enter Transaction ID"
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "var(--body-text)",

                "&.Mui-focused": {
                  color: "var(--accent)",
                },
              },
            }}
            inputProps={{
              style: {
                color: "var(--body-text)",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,

                background: "var(--surface)",

                color: "var(--body-text)",

                "& fieldset": {
                  borderColor: "var(--border)",
                },

                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "var(--accent)",
                },
              },

              "& input::placeholder": {
                color: "var(--muted)",
                opacity: 1,
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            sx={{
              minWidth: 160,

              height: 56,

              borderRadius: 3,

              fontWeight: 700,

              background: "var(--accent)",
            }}
          >
            {loading ? <CircularProgress size={22} /> : "SEARCH"}
          </Button>

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
            sx={{
              minWidth: 220,

              height: 56,

              borderRadius: 3,

              fontWeight: 700,

              border: "1px solid var(--accent)",

              color: "var(--body-text)",
            }}
          >
            DOWNLOAD PDF
          </Button>
        </Stack>
      </Paper>

      {/* SINGLE CARD */}

      {searchType === "id" && transaction && (
        <Card
          sx={{
            mb: 3,

            borderRadius: 4,

            background: "var(--surface-soft)",

            border: "1px solid var(--border)",

            boxShadow: "var(--shadow)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight={700}
              mb={2}
              sx={{
                mt: 1,
                color: "var(--body-text)",
              }}
            >
              Transaction Details
            </Typography>

            <Divider
              sx={{
                mb: 3,

                borderColor: "var(--border)",
              }}
            />

            <Stack spacing={2}>
              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>ID:</b> {transaction.id}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>Amount:</b> ₹{transaction.amount}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>Type:</b> {transaction.transactionType}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>Description:</b> {transaction.description}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>Status:</b> {transaction.status}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>Source:</b> {transaction.sourceAccount || "-"}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>Destination:</b> {transaction.destinationAccount || "-"}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "var(--body-text)",
                }}
              >
                <b>Date:</b>{" "}
                {new Date(transaction.transactionDate).toLocaleString()}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* GRID */}

      {searchType === "account" && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,

            overflow: "hidden",

            background: "var(--surface-soft)",

            border: "1px solid var(--border)",

            boxShadow: "var(--shadow)",
          }}
        >
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={500}
            >
              <CircularProgress />
            </Box>
          ) : rows.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 25, 50]}
              disableRowSelectionOnClick
              slots={{
                toolbar: GridToolbar,
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              sx={{
                border: "none",

                color: "var(--body-text)",

                background: "transparent",

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "var(--surface)",
                  color: "var(--body-text)",
                  borderBottom: "1px solid var(--border)",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 800,
                  color: "var(--body-text)",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "var(--surface)",
                },

                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid var(--border)",

                  color: "var(--body-text)",
                },

                "& .MuiDataGrid-row:hover": {
                  background: "rgba(34,211,238,0.08)",
                },

                "& .MuiDataGrid-toolbarContainer": {
                  padding: 2,

                  borderBottom: "1px solid var(--border)",
                },

                "& .MuiButton-text": {
                  color: "var(--body-text)",
                },

                "& .MuiTablePagination-root": {
                  color: "var(--body-text)",
                },

                "& .MuiDataGrid-menuIcon": {
                  opacity: 0,
                },

                "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIcon": {
                  opacity: 1,
                },

                "& .MuiDataGrid-iconButtonContainer": {
                  visibility: "hidden",
                },

                "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-iconButtonContainer":
                  {
                    visibility: "visible",
                  },
              }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                color: "var(--muted)",
              }}
            >
              No Transactions Found
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default TransactionsTab;
