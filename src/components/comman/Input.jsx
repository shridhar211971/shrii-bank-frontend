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

      <label className="text-sm font-medium text-slate-300">
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
          bg-white/5
          border
          border-white/10
          outline-none
          text-white
          placeholder:text-slate-500
          focus:border-cyan-400
          focus:bg-white/10
          transition-all
        "
      />

    </div>
  );
};

export default Input;