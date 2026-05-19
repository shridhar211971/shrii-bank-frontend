import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import TransactionCard from "../../components/cards/TransactionCard";
import { getTransactions } from "../../features/transaction/transactionThunk";
import toast from "react-hot-toast";

const Transactions = () => {

  const dispatch = useDispatch();

  const { transactions, loading} = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(getTransactions())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load transactions");
      });
  }, [dispatch]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white">Loading transactions...</div>
      </DashboardLayout>
    );
  }

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

          {transactions && transactions.length > 0 ? (
            transactions.map((item, index) => (

              <TransactionCard
                key={index}
                type={item.type}
                amount={item.amount}
                date={item.date}
                status={item.status}
              />

            ))
          ) : (
            <div className="text-slate-400">No transactions found</div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Transactions;