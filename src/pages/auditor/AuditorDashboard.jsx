import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAuditTotals } from "../../features/auditor/auditorSlice";
import toast from "react-hot-toast";

// Tab Components
import AuditDashboardTab from "./tabs/AuditDashboardTab";
import UsersTab from "./tabs/UsersTab";
import TransactionsTab from "./tabs/TransactionsTab";
import AccountManagementTab from "./tabs/AccountManagementTab";
import { Box, Typography} from "@mui/material";

const AuditorDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");

  const { totals, loading } = useSelector((state) => state.auditor);

  useEffect(() => {
    dispatch(getAuditTotals())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load audit data");
      });
  }, [dispatch]);

  const tabs = [
    { id: "dashboard", label: "Dashboard...", icon: " 📊" },
    { id: "users", label: "Users...", icon: " 👥" },
    { id: "transactions", label: "Transactions...", icon: " 💳" },
    { id: "account-management", label: "Account Management...", icon: " ⚙️" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AuditDashboardTab totals={totals} loading={loading} />;
      case "users":
        return <UsersTab />;
      case "transactions":
        return <TransactionsTab />;
      case "account-management":
        return <AccountManagementTab />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
      
          <Box mb={5}>
        <Typography
          variant="h4"
          sx={{
            color: "var(--body-text)",
            fontWeight: 900,
            mb: 1,
          }}
        >
          Auditor Pannel
        </Typography>

        <Typography
          sx={{
            color: "var(--muted)",
            fontSize: "16px",
          }}
        >
          Monitor all banking activities and manage user accounts
        </Typography>
      </Box>
        

        {/* HORIZONTAL TAB NAVIGATION */}
        <div className="surface-card rounded-[24px] p-4 border border-[var(--border)]">
          <div className="flex gap-6 overflow-x-auto pb-2 md:pb-0" style={{marginTop:"5px", marginBottom: "5px", marginLeft: "10px"}}  >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3
                  rounded-sm
                  font-semibold
                  whitespace-nowrap
                  transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-[var(--accent)] text-[var(--surface)] shadow-lg"
                      : "bg-[var(--surface-soft)] text-[var(--body-text)] hover:bg-[var(--surface)]"
                  }
                `}
                style={{marginBottom:"5px", marginLeft:"5px", marginTop:"5px"}}
              >
                <span className="mr-2" style={{marginBottom:"5px", marginLeft:"5px", marginTop:"5px"}}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="animate-fadeIn">
          {renderTabContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditorDashboard;