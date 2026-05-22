const AuditStatsCard = ({ title, value, icon, color = "cyan" }) => {
  const colorMap = {
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  return (
    <div
      className="
        surface-card
        rounded-3xl
        p-8
        border border-[var(--border)]
        hover:shadow-lg
        transition-all
        hover:border-[var(--accent)]/50
      "
    >
      <div className="flex items-start justify-between mb-4" style={{marginTop:"10px", marginLeft:"10px", marginRight:"10px"}}> 
        <p className="text-[var(--muted)] mb-0">
          {title}
        </p>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>

      <h2
        className={`
          text-4xl
          font-black
          ${colorMap[color] || "text-cyan-400"}
        `}
        style={{marginLeft:"10px", marginBottom:"10px"}}
      >
        {value}
      </h2>

    </div>
  );
};

export default AuditStatsCard;