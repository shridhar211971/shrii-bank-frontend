const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col gap-3">
      
      <label className="text-sm font-medium text-[var(--body-text)]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="
          w-full
          px-5
          py-4
          rounded-2xl
          bg-[var(--surface-soft)]
          border
          border-[var(--border)]
          outline-none
          text-[var(--body-text)]
          placeholder:text-[var(--muted)]
          focus:border-[var(--accent)]
          transition-all
        "
      />

    </div>
  );
};

export default Input;