const BalanceCard = ({ balance }) => {
  return (
    <div
      className="
        surface-card
        rounded-3xl
        p-8
      "
    >

      <p className="text-[var(--muted)] mb-3">
        Total Balance
      </p>

      <h2
        className="
          text-4xl
          font-black
          text-[var(--body-text)]
        "
      >
        ₹{balance}
      </h2>

    </div>
  );
};

export default BalanceCard;