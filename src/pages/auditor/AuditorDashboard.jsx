import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import AuditStatsCard from "../../components/cards/AuditStatsCard";

import {
  getAuditTotals,
} from "../../features/auditor/auditorSlice";
import toast from "react-hot-toast";

const AuditorDashboard = () => {

  const dispatch = useDispatch();

  const { totals } = useSelector(
    (state) => state.auditor
  );

  useEffect(() => {
    dispatch(getAuditTotals())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load audit data");
      });
  }, [dispatch]);

  return (
    <DashboardLayout>

      <div className="space-y-10">

        <div>

          <h1
            className="
              text-5xl
              font-black
              text-[var(--body-text)]
              mb-3
            "
          >
            Auditor Dashboard
          </h1>

          <p className="text-[var(--muted)]">
            Monitor all banking activities
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-8
          "
        >

          <AuditStatsCard
            title="Total Users"
            value={totals.totalUsers || 0}
          />

          <AuditStatsCard
            title="Total Accounts"
            value={totals.totalAccounts || 0}
          />

          <AuditStatsCard
            title="Transactions"
            value={totals.totalTransactions || 0}
          />

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AuditorDashboard;