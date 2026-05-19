const AuditStatsCard = ({ title, value }) => {

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

      <p className="text-slate-400 mb-4">
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