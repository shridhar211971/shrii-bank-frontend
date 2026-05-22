import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getTransactions } from "../../features/transaction/transactionSlice";

import { getMyAccounts } from "../../features/account/accountSlice";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import toast from "react-hot-toast";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

const Transactions = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { transactions, loading, meta } = useSelector(
    (state) => state.transaction,
  );

  // FETCH TRANSACTIONS

  useEffect(() => {
    dispatch(
      getTransactions({
        page,
        size: 10,
      }),
    )
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load transactions");
      });
  }, [dispatch, page]);

  // PAGE CHANGE

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // TYPE COLOR

  // const getTypeColor = (type) => {
  //   if (type === "DEPOSIT") {
  //     return {
  //       bg: "rgba(34,197,94,0.15)",
  //       color: "#22c55e",
  //     };
  //   }

  //   return {
  //     bg: "rgba(239,68,68,0.15)",
  //     color: "#ef4444",
  //   };
  // };

  // DOWNLOAD PDF

  const handleDownloadStatement = async () => {
    try {
      const response = await dispatch(getMyAccounts()).unwrap();

      const account = response?.data?.[0];

      if (!account) {
        toast.error("No account found");
        return;
      }

      const doc = new jsPDF();

      // =========================
      // HEADER
      // =========================

      doc.setFontSize(22);

      doc.setTextColor(33, 150, 243);

      doc.text("Bank Statement", 14, 20);

      doc.setFontSize(12);

      doc.setTextColor(0, 0, 0);

      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

      // =========================
      // CUSTOMER INFO
      // =========================

      doc.setFontSize(14);

      doc.text("Customer Details", 14, 45);

      doc.setFontSize(11);

      doc.text(
        `Name: ${account.user.firstName} ${account.user.lastName}`,
        14,
        55,
      );

      doc.text(`Email: ${account.user.email}`, 14, 63);

      doc.text(`Phone: ${account.user.phoneNumber}`, 14, 71);

      // =========================
      // ACCOUNT INFO
      // =========================

      doc.setFontSize(14);

      doc.text("Account Details", 14, 88);

      doc.setFontSize(11);

      doc.text(`Account Number: ${account.accountNumber}`, 14, 98);

      doc.text(`Account Type: ${account.accountType}`, 14, 106);

      doc.text(`Currency: ${account.currency}`, 14, 114);

      doc.text(`Balance: $${account.balance}`, 14, 122);

      doc.text(`Status: ${account.status}`, 14, 130);

      // =========================
      // TRANSACTION TABLE
      // =========================

      autoTable(doc, {
        startY: 145,

        head: [["ID", "Type", "Amount", "Description", "Date", "Status"]],

        body: account.transactions.map((tx) => [
          tx.id,
          tx.transactionType,
          `$${tx.amount}`,
          tx.description,
          new Date(tx.transactionDate).toLocaleString(),
          tx.status,
        ]),

        styles: {
          fontSize: 10,
        },

        headStyles: {
          fillColor: [33, 150, 243],
        },
      });

      // =========================
      // FOOTER
      // =========================

      const pageHeight = doc.internal.pageSize.height;

      doc.setFontSize(10);

      doc.text("Thank you for banking with us.", 14, pageHeight - 10);

      // DOWNLOAD

      doc.save(`Bank_Statement_${account.accountNumber}.pdf`);

      toast.success("Statement downloaded");
    } catch (err) {
      toast.error(err || "Failed to download statement");
    }
  };

  return (
    <DashboardLayout>
      <Box>
        {/* PAGE TITLE */}

        <Box
          mb={5}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "var(--body-text)",
                fontWeight: 900,
                mb: 1,
              }}
            >
              Transactions_History
            </Typography>

            <Typography
              sx={{
                color: "var(--muted)",
                fontSize: "16px",
                mb: 1,
              }}
            >
              Review your recent banking activities
            </Typography>
          </Box>

          {/* DOWNLOAD BUTTON */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadStatement}
              sx={{
                background: "var(--accent)",
                color: "#fff",
                borderRadius: "12px",
                mt: 4,
                px: 3,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",
                minWidth: "220px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              Download Statement
            </Button>
          </Box>
        </Box>

        {/* LOADING */}

        {loading ? (
          <Box display="flex" mt={100} mr={2}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* TABLE */}

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                background: "var(--surface-soft)",

                backdropFilter: "blur(24px)",

                border: "1px solid var(--border)",

                borderRadius: "28px",

                overflowX: "auto",
              }}
            >
              <Table>
                {/* TABLE HEAD */}

                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeadStyle}>ID</TableCell>

                    <TableCell sx={tableHeadStyle}>Type</TableCell>

                    <TableCell sx={tableHeadStyle}>Amount</TableCell>

                    <TableCell sx={tableHeadStyle}>Description</TableCell>

                    <TableCell sx={tableHeadStyle}>Date</TableCell>

                    <TableCell sx={tableHeadStyle}>Status</TableCell>
                  </TableRow>
                </TableHead>

                {/* TABLE BODY */}

                <TableBody>
                  {transactions && transactions.length > 0 ? (
                    transactions.map((item) => {
                      // const typeStyle = getTypeColor(item.transactionType);

                      return (
                        <TableRow
                          key={item.id}
                          sx={{
                            transition: "0.3s",

                            "&:hover": {
                              background: "rgba(255,255,255,0.06)",
                            },
                          }}
                        >
                          <TableCell sx={tableCellStyle}>#{item.id}</TableCell>

                          <TableCell sx={tableCellStyle}>
                            {/* <Chip
                              label={item.transactionType}
                              sx={{
                                background: typeStyle.bg,

                                color: typeStyle.color,

                                fontWeight: 700,

                                borderRadius: "10px",
                              }}
                            /> */}
                            {item.transactionType}
                          </TableCell>

                          <TableCell
                            sx={{
                              ...tableCellStyle,

                              fontWeight: 700,

                              color:
                                item.transactionType === "DEPOSIT"
                                  ? "#22c55e"
                                  : "#ef4444",
                            }}
                          >
                            ${item.amount}
                          </TableCell>

                          <TableCell sx={tableCellStyle}>
                            {item.description}
                          </TableCell>

                          <TableCell sx={tableCellStyle}>
                            {new Date(item.transactionDate).toLocaleString()}
                          </TableCell>

                          <TableCell sx={tableCellStyle}>
                            <Chip
                              label={item.status}
                              sx={{
                                background: "rgba(34,197,94,0.15)",

                                color: "#22c55e",

                                fontWeight: 700,

                                borderRadius: "10px",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="center"
                        sx={{
                          py: 8,
                          color: "#94a3b8",
                          fontSize: "18px",
                          borderBottom: "none",
                        }}
                      >
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* PAGINATION */}

            {meta?.totalPages > 1 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                  pr: 2,
                }}
              >
                <Pagination
                  count={meta.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "var(--body-text)",
                      border: "1px solid var(--border)",
                    },

                    "& .Mui-selected": {
                      background: "var(--accent) !important",

                      color: "var(--surface)",

                      fontWeight: 700,
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </DashboardLayout>
  );
};

// TABLE HEAD STYLE

const tableHeadStyle = {
  color: "var(--muted)",

  fontWeight: 700,

  fontSize: "15px",

  borderBottom: "1px solid var(--border)",
};

// TABLE CELL STYLE

const tableCellStyle = {
  color: "var(--body-text)",

  borderBottom: "1px solid var(--border)",

  fontSize: "14px",
};

export default Transactions;
