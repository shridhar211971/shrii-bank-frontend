import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AuditStatsCard from "../../../components/cards/AuditStatsCard";
import { Box, CircularProgress,Typography } from "@mui/material";

const AuditDashboardTab = ({ totals, loading }) => {
  // Chart data
  const chartData = [
    { name: "Users", value: totals.totalUsers || 0 },
    { name: "Accounts", value: totals.totalAccounts || 0 },
    { name: "Transactions", value: totals.totalTransactions || 0 },
  ];

  const COLORS = ["#22d3ee", "#06b6d4", "#0ea5e9"];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="space-y-8">
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
                  }}
                >
                  Review your recent banking activities
                </Typography>
              </Box>
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{marginBottom:"15px"}}>
        <AuditStatsCard
          title="Total Users"
          value={totals.totalUsers || 0}
          icon="👥"
          color="cyan"
        />
        <AuditStatsCard
          title="Total Accounts"
          value={totals.totalAccounts || 0}
          icon="🏦"
          color="blue"
        />
        <AuditStatsCard
          title="Total Transactions"
          value={totals.totalTransactions || 0}
          icon="💳"
          color="purple"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6" style={{marginBottom:"15px"}}>
        {/* BAR CHART */}
        <div className="surface-card rounded-[32px] p-6 border border-[var(--border)]">
          <h3 className="text-xl font-black text-[var(--body-text)] mb-4" style={{ marginLeft:"15px", marginTop:"10px"}}>
            Overview Statistics
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="value" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="surface-card rounded-[32px] p-6 border border-[var(--border)]">
          <h3 className="text-xl font-black text-[var(--body-text)] mb-4" style={{ marginLeft:"15px", marginTop:"10px"}}>
            Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* LEGEND */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {chartData.map((item, index) => (
              <div key={index} className="text-center" style={{marginBottom:"10px"}}>
                <div
                  className="w-6 h-3 rounded-full mx-auto mb-2"
                  style={{ background: COLORS[index], marginLeft: "90px" }}
                />
                <p className="text-[var(--muted)] text-sm">{item.name}</p>
                <p className="text-[var(--body-text)] font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{marginBottom:"15px"}}>
        {[
          { label: "Active Today", value: Math.floor(totals.totalUsers * 0.7) || 0 },
          { label: "Transactions Today", value: Math.floor(totals.totalTransactions * 0.5) || 0 },
          { label: "New Accounts", value: Math.floor(totals.totalAccounts * 0.1) || 0 },
          { label: "System Health", value: "98%" },
        ].map((stat, idx) => (
          <div key={idx} className="surface-card rounded-[20px] p-4 border border-[var(--border)]">
            <p className="text-[var(--muted)] text-sm mb-2"  style={{marginLeft:"15px"}}>{stat.label}</p>
            <p className="text-2xl font-black text-[var(--accent)]"  style={{marginLeft:"15px"}}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditDashboardTab;
