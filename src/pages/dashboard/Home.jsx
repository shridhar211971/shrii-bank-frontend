import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getMyAccounts } from "../../features/account/accountSlice";
import { getProfile } from "../../features/profile/profileSlice";

import toast from "react-hot-toast";

import {
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Activity,
  CreditCard,
} from "lucide-react";

import { Typography, Box } from "@mui/material";

import TransactionChart from "../../components/charts/TransactionChart";
import ExpenseChart from "../../components/charts/ExpenseChart";

const Home = () => {
  const dispatch = useDispatch();

  const { accounts, loading } = useSelector((state) => state.account);

  // const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getMyAccounts())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load accounts");
      });

    dispatch(getProfile());
  }, [dispatch]);

  const account = accounts?.[0];

  const transactions = account?.transactions || [];

  const totalBalance =
    accounts?.reduce((sum, acc) => sum + (acc.balance || 0), 0) || 0;

  const totalDeposit = transactions
    ?.filter((t) => t.transactionType === "DEPOSIT")
    ?.reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawal = transactions
    ?.filter((t) => t.transactionType === "WITHDRAWAL")
    ?.reduce((sum, t) => sum + t.amount, 0);

  const totalTransfer = transactions
    ?.filter((t) => t.transactionType === "TRANSFER")
    ?.reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-[var(--body-text)] text-3xl font-bold">
            Loading Dashboard...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <>
        <div className="space-y-10">
          {/* HEADER */}

          <div
            className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb
          "
            // style={{marginBottom: "10px"}}
          >
            <Box mb={5}>
              <Typography
                variant="h4"
                sx={{
                  color: "var(--body-text)",
                  fontWeight: 900,
                  mb: 1,
                }}
              >
                My Dashboard
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
          </div>

          {/* BALANCE CARD */}

          <div
            className="
            relative
            overflow-hidden
            rounded-[20px]
            p-8
            md:p-10
            margin-top: 20px
            bg-gradient-to-br
            from-cyan-500
            via-blue-600
            to-indigo-700
          "
            style={{ marginBottom: "20px" }}
          >
            <div className="absolute top-0 right-4 w-80 h-80 bg-white/10 rounded-full blur-3xl ml-4"/>

            <div className="relative z-10 "  style={{marginLeft: "10px", marginTop: "10px", marginBottom: "10px"}}>
              <p className="text-cyan-100 text-lg mb-4 ">
                Total Available Balance
              </p>

              <h1
                className="
                text-5xl
                md:text-6xl
                font-black
                text-white
              "
              >
                ₹ {totalBalance.toLocaleString()}
              </h1>

              <div
                className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-6
                mt-10
              "
              >
                <div>
                  <p className="text-cyan-100 text-sm">Account Number</p>

                  <h3 className="text-white font-bold text-xl mt-1">
                    {account?.accountNumber}
                  </h3>
                </div>

                <div>
                  <p className="text-cyan-100 text-sm">Account Type</p>

                  <h3 className="text-white font-bold text-xl mt-1">
                    {account?.accountType}
                  </h3>
                </div>

                <div>
                  <p className="text-cyan-100 text-sm">Currency</p>

                  <h3 className="text-white font-bold text-xl mt-1">
                    {account?.currency}
                  </h3>
                </div>

                <div>
                  <p className="text-cyan-100 text-sm">Status</p>

                  <h3 className="text-green-300 font-bold text-xl mt-1">
                    {account?.status}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
            style={{ marginBottom: "20px" }}
          >
            <StatsCard
              title="Total Balance"
              value={`₹ ${totalBalance.toLocaleString()}`}
              icon={<Wallet size={28} />}
              color="cyan"
              
            />

            <StatsCard
              title="Deposits"
              value={`₹ ${totalDeposit.toLocaleString()}`}
              icon={<ArrowDownCircle size={28} />}
              color="green"
            />

            <StatsCard
              title="Withdrawals"
              value={`₹ ${totalWithdrawal.toLocaleString()}`}
              icon={<ArrowUpCircle size={28} />}
              color="red"
            />

            <StatsCard
              title="Transfers"
              value={`₹ ${totalTransfer.toLocaleString()}`}
              icon={<TrendingUp size={28} />}
              color="orange"
            />
          </div>

          {/* CHARTS */}

          <div
            className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
            style={{ marginBottom: "20px" }}
          >
            <TransactionChart transactions={transactions} />

            <ExpenseChart
              depositAmount={totalDeposit}
              withdrawalAmount={totalWithdrawal}
              transferAmount={totalTransfer}
            />
          </div>

          {/* RECENT TRANSACTIONS */}

          <div
            className="
            surface-card
            rounded-[35px]
            p-6
          "
          style={{marginBottom:"20px"}}
          >
            <div
              className="flex items-center justify-between mb-8 flex-wrap gap-4"
              style={{ marginBottom: "20px", marginTop: "15px" }}
            >
              <h2
                className="text-3xl font-black text-[var(--body-text)]"
                style={{ marginLeft: "20px" }}
              >
                Recent Transactions
              </h2>

              <div
                className="
                px-4 py-2
                rounded-xl
                bg-[var(--accent)]/10
                text-[var(--accent)]
                text-sm
                font-semibold
              "
                style={{ marginRight: "20px" }}
              >
                {transactions.length} Transactions
              </div>
            </div>

            <div className="space-y-4">
              {transactions
                ?.slice()
                ?.reverse()
                ?.slice(0, 7)
                ?.map((txn) => (
                  <div
                    key={txn.id}
                    className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    p-5
                    rounded-3xl
                    bg-[var(--surface-soft)]
                    border
                    border-[var(--border)]
                    hover:bg-[var(--surface-soft)]
                    transition-all
                  "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                        w-10
                        h-10
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        ${
                          txn.transactionType === "DEPOSIT"
                            ? "bg-green-500/20"
                            : txn.transactionType === "WITHDRAWAL"
                              ? "bg-red-500/20"
                              : "bg-cyan-500/20"
                        }
                      `}
                      style={{marginLeft:"10px"}}
                      >
                        <Activity
                          className={`
                          ${
                            txn.transactionType === "DEPOSIT"
                              ? "text-green-400"
                              : txn.transactionType === "WITHDRAWAL"
                                ? "text-red-400"
                                : "text-cyan-400"
                          }
                        `}
                        />
                      </div>

                      <div>
                        <h2 className="text-[var(--body-text)] font-bold text-lg">
                          {txn.transactionType}
                        </h2>

                        <p className="text-[var(--muted)] text-sm">
                          {txn.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-left md:text-right" style={{marginRight:"30px"}}>
                      <h2
                        className={`
                        text-2xl
                        font-black
                        ${
                          txn.transactionType === "DEPOSIT"
                            ? "text-green-400"
                            : txn.transactionType === "WITHDRAWAL"
                              ? "text-red-400"
                              : "text-cyan-400"
                        }
                      `}
                      >
                        ₹ {txn.amount}
                      </h2>

                      <p className="text-[var(--muted)] text-sm">
                        {new Date(txn.transactionDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

const StatsCard = ({ title, value, icon, color }) => {
  const colors = {
    cyan: "text-cyan-400 bg-cyan-500/20",
    green: "text-green-400 bg-green-500/20",
    red: "text-red-400 bg-red-500/20",
    orange: "text-orange-400 bg-orange-500/20",
  };

  return (
    <div
      className="
        surface-card
        border
        border-[var(--border)]
        rounded-[20px]
        p-6
      "
    >
      <div className="flex items-center justify-between" style={{marginLeft: "10px", marginTop: "10px", marginRight: "10px"}}>
        <div
          className={`
            w-10
            h-10
            rounded-2xl
            flex
            items-center
            justify-center
            ${colors[color]}
          `}
        >
          {icon}
        </div>

        <CreditCard className="text-[var(--muted)]" />
      </div>

      <p className="text-[var(--muted)] text-sm mt-6" style={{marginLeft: "10px"}}>{title}</p>

      <h2 className="text-[var(--body-text)] text-3xl font-black mt-2" style={{marginLeft: "10px"}}>
        {value}
      </h2>
    </div>
  );
};

export default Home;
