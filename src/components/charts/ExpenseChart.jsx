import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ExpenseChart = ({
  depositAmount,
  withdrawalAmount,
  transferAmount,
}) => {
  const data = [
    {
      name: "Deposits",
      value: depositAmount,
      color: "#22c55e",
    },
    {
      name: "Withdrawals",
      value: withdrawalAmount,
      color: "#ef4444",
    },
    {
      name: "Transfers",
      value: transferAmount,
      color: "#06b6d4",
    },
  ];

  return (
    <div className="surface-card rounded-[32px] p-6 mb-6">
      <div className="mb-6" style={{marginLeft: "10px", marginTop: "10px"}}>
        <h2 className="text-2xl font-black text-[var(--body-text)]">
          Expense Overview
        </h2>

        <p className="text-[var(--muted)] mt-1">
          Transaction distribution
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={120}
            dataKey="value"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6" style={{marginBottom: "10px"}}>
        {data.map((item, index) => (
          <div
            key={index}
            className="
              text-center
              bg-white/[0.03]
              rounded-2xl
              p-4
            "
          >
            <div
              className="w-6 h-3 rounded-full "
              style={{
                background: item.color,
                marginLeft: "80px",
              }}
            />

            <p className="text-[var(--muted)] text-sm">
              {item.name}
            </p>

            <h3 className="text-[var(--body-text)] font-bold mt-1">
              ₹ {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;