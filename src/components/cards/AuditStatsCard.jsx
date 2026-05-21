const AuditStatsCard = ({ title, value }) => {

  return (
    <div
      className="
        surface-card
        rounded-3xl
        p-8
      "
    >

      <p className="text-[var(--muted)] mb-4">
        {title}
      </p>

      <h2
        className="
          text-4xl
          font-black
          text-cyan-400
        "
      >
        {value}
      </h2>

    </div>
  );
};

export default AuditStatsCard;