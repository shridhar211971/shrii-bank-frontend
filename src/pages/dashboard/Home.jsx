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

import TransactionChart from "../../components/charts/TransactionChart";
import ExpenseChart from "../../components/charts/ExpenseChart";

const Home = () => {
  const dispatch = useDispatch();

  const { accounts, loading } = useSelector((state) => state.account);

  const { profile } = useSelector((state) => state.profile);

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
          <h1 className="text-white text-3xl font-bold">
            Loading Dashboard...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
        >
          <div className="flex items-center gap-5">
            <img
              src={`http://localhost:8080/${profile?.profilePictureUrl}`}
              alt="profile"
              className="
                w-20
                h-20
                rounded-3xl
                object-cover
                border-4
                border-cyan-500/40
              "
            />

            <div>
              <h1
                className="
                  text-4xl
                  lg:text-5xl
                  font-black
                  text-white
                "
              >
                Welcome Back 👋
              </h1>

              <p className="text-slate-400 text-lg mt-2">
                {profile?.firstName} {profile?.lastName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              className="
                px-6 py-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                text-white
                font-semibold
                hover:scale-105
                transition-all
              "
            >
              Quick Transfer
            </button>

            <button
              className="
                px-6 py-3
                rounded-2xl
                bg-white/5
                border
                border-white/10
                text-white
                font-semibold
                hover:bg-white/10
                transition-all
              "
            >
              View Reports
            </button>
          </div>
        </div>

        {/* BALANCE CARD */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[35px]
            p-8
            md:p-10
            bg-gradient-to-br
            from-cyan-500
            via-blue-600
            to-indigo-700
          "
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="text-cyan-100 text-lg mb-4">
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
            gap-6
          "
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
            bg-white/5
            border
            border-white/10
            rounded-[35px]
            p-6
            backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white">
              Recent Transactions
            </h2>

            <div
              className="
                px-4 py-2
                rounded-xl
                bg-cyan-500/10
                text-cyan-400
                text-sm
                font-semibold
              "
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
                    bg-white/[0.03]
                    border
                    border-white/5
                    hover:bg-white/[0.06]
                    transition-all
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-14
                        h-14
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
                      <h2 className="text-white font-bold text-lg">
                        {txn.transactionType}
                      </h2>

                      <p className="text-slate-400 text-sm">
                        {txn.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
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

                    <p className="text-slate-500 text-sm">
                      {new Date(txn.transactionDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
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
        bg-white/5
        border
        border-white/10
        rounded-[30px]
        p-6
        backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between">
        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            ${colors[color]}
          `}
        >
          {icon}
        </div>

        <CreditCard className="text-slate-600" />
      </div>

      <p className="text-slate-400 text-sm mt-6">{title}</p>

      <h2 className="text-white text-3xl font-black mt-2">{value}</h2>
    </div>
  );
};

export default Home;
