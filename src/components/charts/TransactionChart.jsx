import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const TransactionChart = ({ transactions }) => {
  const data = transactions?.map((txn, index) => ({
    name: index + 1,
    amount: txn.amount,
  }));

  return (
    <div className="surface-card rounded-[32px] p-6 mb-6">
      <div className="mb-6" style={{marginLeft: "10px", marginTop: "10px"}}>
        <h2 className="text-2xl font-black text-[var(--body-text)]">
          Transaction Analytics
        </h2>

        <p className="text-[var(--muted)] mt-1">
          Financial activity overview
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis dataKey="name" stroke="#94a3b8" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#06b6d4"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;