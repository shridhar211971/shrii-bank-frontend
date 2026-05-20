import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getTransactions } from "../../features/transaction/transactionSlice";

import {
  Box,
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

import toast from "react-hot-toast";

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

  const getTypeColor = (type) => {
    if (type === "DEPOSIT") {
      return {
        bg: "rgba(34,197,94,0.15)",
        color: "#22c55e",
      };
    }

    return {
      bg: "rgba(239,68,68,0.15)",
      color: "#ef4444",
    };
  };

  return (
    <DashboardLayout>
      <Box>
        {/* PAGE TITLE */}

        <Box mb={5}>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 900,
              mb: 1,
            }}
          >
            Transactions History
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "16px",
              mb: 1,
            }}
          >
            Review your recent banking activities
          </Typography>
        </Box>

        {/* LOADING */}

        {loading ? (
          <Box display="flex" justifyContent="center" mt={10} mr={2}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* TABLE */}

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                background: "rgba(255,255,255,0.04)",

                backdropFilter: "blur(24px)",

                border: "1px solid rgba(255,255,255,0.08)",

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
                      const typeStyle = getTypeColor(item.transactionType);

                      return (
                        <TableRow
                          key={item.id}
                          sx={{
                            transition: "0.3s",

                            "&:hover": {
                              background: "rgba(255,255,255,0.03)",
                            },
                          }}
                        >
                          {/* ID */}

                          <TableCell sx={tableCellStyle}>#{item.id}</TableCell>

                          {/* TYPE */}

                          <TableCell sx={tableCellStyle}>
                            <Chip
                              label={item.transactionType}
                              sx={{
                                background: typeStyle.bg,

                                color: typeStyle.color,

                                fontWeight: 700,

                                borderRadius: "10px",
                              }}
                            />
                          </TableCell>

                          {/* AMOUNT */}

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

                          {/* DESCRIPTION */}

                          <TableCell sx={tableCellStyle}>
                            {item.description}
                          </TableCell>

                          {/* DATE */}

                          <TableCell sx={tableCellStyle}>
                            {new Date(item.transactionDate).toLocaleString()}
                          </TableCell>

                          {/* STATUS */}

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
               <Box sx={{  width: "100%",  display: "flex",  justifyContent: "flex-end",  mt: 2, pr: 2, }}>
                <Pagination
                  count={meta.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {  color: "#fff", border: "1px solid rgba(255,255,255,0.1)", },
                    "& .Mui-selected": {  background: "#06b6d4 !important",  color: "#000",
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
  color: "#94a3b8",

  fontWeight: 700,

  fontSize: "15px",

  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

// TABLE CELL STYLE

const tableCellStyle = {
  color: "#fff",

  borderBottom: "1px solid rgba(255,255,255,0.05)",

  fontSize: "14px",
};

export default Transactions;
