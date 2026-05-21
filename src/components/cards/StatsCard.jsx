const StatsCard = ({
  title,
  value,
  subtitle,
}) => {

  return (
    <div
      className="
        surface-card
        rounded-3xl
        p-8
        hover:border-[var(--accent)]/40
        transition-all
      " 
    >

      <p className="text-[var(--muted)] mb-4">
        {title}
      </p>

      <h2
        className="
          text-5xl
          font-black
          text-[var(--body-text)]
          mb-3
        "
      >
        {value}
      </h2>

      <p className="text-cyan-300">
        {subtitle}
      </p>

    </div>
  );
};

export default StatsCard;