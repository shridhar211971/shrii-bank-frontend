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
      
      <label className="text-sm font-medium text-white">
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
          bg-transparent
          border
          border-white
          outline-none
          text-white
          placeholder:text-white
          focus:border-white
          transition-all
        "
      />

    </div>
  );
};

export default Input;