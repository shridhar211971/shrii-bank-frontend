import formatCurrency from "../../utils/formatCurrency";

const TransactionCard = ({
  type,
  amount,
  date,
  status,
}) => {

  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
        backdrop-blur-xl
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-4
        "
      >

        <h3
          className="
            text-xl
            font-bold
            text-white
          "
        >
          {type}
        </h3>

        <span
          className="
            text-cyan-400
            font-bold
          "
        >
          {formatCurrency(amount)}
        </span>

      </div>

      <div
        className="
          flex
          justify-between
          text-slate-400
          text-sm
        "
      >

        <p>{date}</p>

        <p>{status}</p>

      </div>

    </div>
  );
};

export default TransactionCard;