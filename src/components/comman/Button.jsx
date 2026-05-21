const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        py-3
        rounded-xl
        font-semibold
        bg-[var(--accent)]
        hover:brightness-110
        transition-all
        duration-300
        text-[var(--surface)]
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;