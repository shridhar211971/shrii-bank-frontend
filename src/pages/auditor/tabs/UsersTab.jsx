// UsersTab.jsx

import { useEffect, useMemo, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";

import {
  clearAccount,
  clearUser,
  findAccountByNumber,
  findUserByEmail,
  getAllUsers,
} from "../../../features/auditor/auditorSlice";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BASE_URL = "http://localhost:8080/";

const UsersTab = () => {
  const dispatch = useDispatch();

  const { users, user, account, loading } = useSelector(
    (state) => state.auditor,
  );

  const [searchType, setSearchType] = useState("email");

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // =========================
  // CLEAR CARDS WHEN FILTER CHANGES
  // =========================

  const handleFilterChange = (value) => {
    setSearchType(value);

    setSearchValue("");

    dispatch(clearUser());

    dispatch(clearAccount());
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    if (!searchValue) return;

    dispatch(clearUser());

    dispatch(clearAccount());

    if (searchType === "email") {
      dispatch(findUserByEmail(searchValue));
    } else {
      dispatch(findAccountByNumber(searchValue));
    }
  };

  // =========================
  // TABLE ROWS
  // =========================

  const rows = useMemo(() => {
    return users.map((u) => ({
      id: u.id,

      profilePictureUrl: u.profilePictureUrl,

      fullName: `${u.firstName} ${u.lastName}`,

      email: u.email,

      phoneNumber: u.phoneNumber,

      role: u.roles?.map((r) => r.name).join(", ") || "N/A",

      active: u.active,
    }));
  }, [users]);

  // =========================
  // TABLE COLUMNS
  // =========================

  const columns = [
    {
      field: "profilePictureUrl",

      headerName: "Photo",

      width: 100,

      sortable: false,

      renderCell: (params) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      py: 1.5, // top & bottom margin
    }}
  >
    <Avatar
      src={params.value ? `${BASE_URL}${params.value}` : ""}
      sx={{
        width: 50,
        height: 50,
        border: "2px solid var(--accent)",
      }}
    />
  </Box>
),
    },

    {
      field: "fullName",

      headerName: "Full Name",

      flex: 1.2,

      minWidth: 180,
    },

    {
      field: "email",

      headerName: "Email",

      flex: 1.5,

      minWidth: 240,
    },

    {
      field: "phoneNumber",

      headerName: "Phone",

      flex: 1,

      minWidth: 160,
    },

    {
      field: "role",

      headerName: "Role",

      flex: 1,

      minWidth: 140,

      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            background: "rgba(34,211,238,0.12)",

            border: "1px solid var(--accent)",

            color: "var(--body-text)",

            fontWeight: 700,
          }}
        />
      ),
    },

    {
      field: "active",

      headerName: "Status",

      flex: 1,

      minWidth: 130,

      renderCell: (params) => (
        <Chip
          label={params.value ? "ACTIVE" : "INACTIVE"}
          sx={{
            background: params.value
              ? "rgba(34,197,94,0.15)"
              : "rgba(239,68,68,0.15)",

            border: `1px solid ${params.value ? "#22c55e" : "#ef4444"}`,

            color: params.value ? "#22c55e" : "#ef4444",

            fontWeight: 700,
          }}
        />
      ),
    },
  ];

  // =========================
  // DOWNLOAD EXCEL
  // =========================

  const downloadUsers = () => {
    const exportData = rows.map((r) => ({
      ID: r.id,

      Name: r.fullName,

      Email: r.email,

      Phone: r.phoneNumber,

      Role: r.role,

      Status: r.active ? "ACTIVE" : "INACTIVE",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, "bank-users.xlsx");
  };

  // =========================
  // ACCOUNT USER
  // =========================

  const accountUser = account?.user;

  return (
    <Box>
      <Box mb={5}>
        <Typography
          variant="h5"
          sx={{
            color: "var(--body-text)",
            fontWeight: 900,
            mb: 1,
          }}
        >
          Auditor DashBoard
        </Typography>

        <Typography
          sx={{
            color: "var(--muted)",
            fontSize: "16px",
            mb:1,
          }}
        >
          Review your recent banking activities
        </Typography>
      </Box>
      {/* SEARCH SECTION */}

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
              <MenuItem value="email">Search By Email</MenuItem>

              <MenuItem value="account">Search By Account Number</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label={
              searchType === "email" ? "Enter Email" : "Enter Account Number"
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "var(--muted)",

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
            sx={{
              height: 56,

              minWidth: 170,

              borderRadius: 3,

              fontWeight: 700,

              background: "var(--accent)",

              color: "#fff",
            }}
          >
            SEARCH
          </Button>

          <Button
            variant="outlined"
            onClick={downloadUsers}
            sx={{
              height: 56,

              minWidth: 220,

              borderRadius: 3,

              fontWeight: 700,

              border: "1px solid var(--accent)",

              color: "var(--body-text)",
            }}
          >
            DOWNLOAD USERS
          </Button>
        </Stack>
      </Paper>

      {/* USER CARD */}

      {user && (
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
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  src={
                    user.profilePictureUrl
                      ? `${BASE_URL}${user.profilePictureUrl}`
                      : ""
                  }
                  sx={{
                    width: 110,
                    height: 110,

                    border: "3px solid var(--accent)",
                  }}
                />
              </Grid>

              <Grid item xs>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    mt: 1,
                    color: "var(--body-text)",
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,

                    color: "var(--muted)",
                  }}
                >
                  {user.email}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,

                    color: "var(--muted)",
                  }}
                >
                  {user.phoneNumber}
                </Typography>

                <Chip
                  label={user.roles?.[0]?.name}
                  sx={{
                    mt: 2,

                    background: "rgba(34,211,238,0.12)",

                    border: "1px solid var(--accent)",

                    color: "var(--body-text)",

                    fontWeight: 700,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ACCOUNT CARD */}

      {account && (
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
            <Grid container spacing={4}>
              {/* USER INFO */}

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    src={
                      accountUser?.profilePictureUrl
                        ? `${BASE_URL}${accountUser.profilePictureUrl}`
                        : ""
                    }
                    sx={{
                      width: 110,
                      height: 110,

                      border: "3px solid var(--accent)",
                    }}
                  />

                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{
                        mt: 1,
                        color: "var(--body-text)",
                      }}
                    >
                      {accountUser?.firstName} {accountUser?.lastName}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        color: "var(--body-text)",
                      }}
                    >
                      {accountUser?.email}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        color: "var(--body-text)",
                      }}
                    >
                      {accountUser?.phoneNumber}
                    </Typography>

                    <Chip
                      label={accountUser?.roles?.[0]?.name}
                      sx={{
                        mt: 2,

                        background: "rgba(34,211,238,0.12)",

                        border: "1px solid var(--accent)",

                        color: "var(--body-text)",

                        fontWeight: 700,
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>

              {/* ACCOUNT INFO */}

              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  mb={2}
                  sx={{
                    mt: 1,
                    color: "var(--body-text)",
                  }}
                >
                  Account Details
                </Typography>

                <Divider
                  sx={{
                    mb: 2,

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
                    <b>Account No:</b> {account.accountNumber}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "var(--body-text)",
                    }}
                  >
                    <b>Balance:</b> ₹{account.balance}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "var(--body-text)",
                    }}
                  >
                    <b>Type:</b> {account.accountType}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "var(--body-text)",
                    }}
                  >
                    <b>Status:</b> {account.status}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "var(--body-text)",
                    }}
                  >
                    <b>Currency:</b> {account.currency}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* DATA GRID */}

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
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
             rowHeight={60}
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
              mb: 2,
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

                color: "var(--body-text)",
              },

              "& .MuiButton-text": {
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

              "& .MuiTablePagination-root": {
                color: "var(--body-text)",
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default UsersTab;
