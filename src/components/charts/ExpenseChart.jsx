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
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-[32px]
        p-6
      "
    >
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white">
          Expense Overview
        </h2>

        <p className="text-slate-400 mt-1">
          Transaction distribution
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
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

      <div className="grid grid-cols-3 gap-4 mt-6">
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
              className="w-3 h-3 rounded-full mx-auto mb-2"
              style={{
                background: item.color,
              }}
            />

            <p className="text-slate-400 text-sm">
              {item.name}
            </p>

            <h3 className="text-white font-bold mt-1">
              ₹ {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;