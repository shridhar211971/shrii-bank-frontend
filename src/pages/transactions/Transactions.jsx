import DashboardLayout from "../../layouts/DashboardLayout";

import TransactionCard from "../../components/cards/TransactionCard";

const Transactions = () => {

  const transactions = [
    {
      type: "Transfer",
      amount: 1200,
      date: "18 May 2026",
      status: "Completed",
    },

    {
      type: "Deposit",
      amount: 800,
      date: "17 May 2026",
      status: "Success",
    },

    {
      type: "Withdrawal",
      amount: 400,
      date: "16 May 2026",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout>

      <div className="space-y-10">

        <div>

          <h1
            className="
              text-5xl
              font-black
              text-white
              mb-3
            "
          >
            Transactions
          </h1>

          <p className="text-slate-400">
            Review your recent activities
          </p>

        </div>

        <div className="space-y-6">

          {transactions.map((item, index) => (

            <TransactionCard
              key={index}
              type={item.type}
              amount={item.amount}
              date={item.date}
              status={item.status}
            />

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Transactions;