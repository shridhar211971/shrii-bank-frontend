const BalanceCard = ({ balance }) => {
  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        backdrop-blur-xl
      "
    >

      <p className="text-slate-400 mb-3">
        Total Balance
      </p>

      <h2
        className="
          text-4xl
          font-black
          text-white
        "
      >
        ${balance}
      </h2>

    </div>
  );
};

export default BalanceCard;