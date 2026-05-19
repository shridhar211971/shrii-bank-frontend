import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
// import StatsCard from "../../components/cards/StatsCard";
import { getMyAccounts } from "../../features/account/accountThunk";
import toast from "react-hot-toast";
import { Wallet, TrendingUp, CreditCard, Activity } from "lucide-react";

const Home = () => {

  const dispatch = useDispatch();

  const { accounts, loading } = useSelector(
    (state) => state.account
  );

  useEffect(() => {
    dispatch(getMyAccounts())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load accounts");
      });
  }, [dispatch]);

  const totalBalance = accounts?.reduce((sum, acc) => sum + (acc.balance || 0), 0) || 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8 lg:space-y-12 w-full">

        {/* TOP SECTION */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1
              className="
                text-4xl lg:text-5xl
                font-black
                text-white
                mb-3
              "
            >
              Banking Dashboard
            </h1>

            <p className="text-slate-400 text-lg">
              Track all your financial activities
            </p>

          </div>

          <div className="flex gap-4">

            <button
              className="
                px-6 py-3
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                text-white
                font-semibold
                rounded-xl
                hover:opacity-90
                transition-all
              "
            >
              Quick Transfer
            </button>

            <button
              className="
                px-6 py-3
                bg-white/5
                border
                border-white/10
                text-white
                font-semibold
                rounded-xl
                hover:bg-white/10
                transition-all
              "
            >
              View All
            </button>

          </div>

        </div>

        {/* STATS CARDS */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          <div
            className="
              bg-gradient-to-br
              from-cyan-500/20
              to-blue-600/20
              border
              border-cyan-500/30
              rounded-2xl
              p-6
              backdrop-blur-sm
            "
          >

            <div className="flex items-center justify-between mb-4">

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-cyan-500/20
                  flex
                  items-center
                  justify-center
                "
              >

                <Wallet className="text-cyan-400" size={24} />

              </div>

              <span className="text-green-400 text-sm font-medium">+2.5%</span>

            </div>

            <p className="text-slate-400 text-sm mb-2">Total Balance</p>

            <p className="text-3xl font-bold text-white">
              ${totalBalance.toLocaleString()}
            </p>

            <p className="text-slate-500 text-xs mt-2">Available balance</p>

          </div>

          <div
            className="
              bg-gradient-to-br
              from-purple-500/20
              to-pink-600/20
              border
              border-purple-500/30
              rounded-2xl
              p-6
              backdrop-blur-sm
            "
          >

            <div className="flex items-center justify-between mb-4">

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-purple-500/20
                  flex
                  items-center
                  justify-center
                "
              >

                <CreditCard className="text-purple-400" size={24} />

              </div>

              <span className="text-green-400 text-sm font-medium">+1.2%</span>

            </div>

            <p className="text-slate-400 text-sm mb-2">Accounts</p>

            <p className="text-3xl font-bold text-white">
              {accounts?.length || 0}
            </p>

            <p className="text-slate-500 text-xs mt-2">Active accounts</p>

          </div>

          <div
            className="
              bg-gradient-to-br
              from-green-500/20
              to-emerald-600/20
              border
              border-green-500/30
              rounded-2xl
              p-6
              backdrop-blur-sm
            "
          >

            <div className="flex items-center justify-between mb-4">

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-green-500/20
                  flex
                  items-center
                  justify-center
                "
              >

                <Activity className="text-green-400" size={24} />

              </div>

              <span className="text-green-400 text-sm font-medium">+5.8%</span>

            </div>

            <p className="text-slate-400 text-sm mb-2">Transactions</p>

            <p className="text-3xl font-bold text-white">
              0
            </p>

            <p className="text-slate-500 text-xs mt-2">Recent activity</p>

          </div>

          <div
            className="
              bg-gradient-to-br
              from-orange-500/20
              to-red-600/20
              border
              border-orange-500/30
              rounded-2xl
              p-6
              backdrop-blur-sm
            "
          >

            <div className="flex items-center justify-between mb-4">

              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-orange-500/20
                  flex
                  items-center
                  justify-center
                "
              >

                <TrendingUp className="text-orange-400" size={24} />

              </div>

              <span className="text-green-400 text-sm font-medium">+3.2%</span>

            </div>

            <p className="text-slate-400 text-sm mb-2">Status</p>

            <p className="text-3xl font-bold text-white">
              Active
            </p>

            <p className="text-slate-500 text-xs mt-2">Account status</p>

          </div>

        </div>

        {/* RECENT ACTIVITY SECTION */}

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-6 lg:p-8
          "
        >

          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h2>

          <div className="text-center py-12">

            <p className="text-slate-400">No recent activity</p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Home;