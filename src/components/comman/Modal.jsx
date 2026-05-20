const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}) => {

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-[#091120]
          border
          border-white/10
          rounded-3xl
          p-8
          w-full
          max-w-lg
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-6
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-slate-400
              hover:text-white
            "
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>
  );
};

export default Modal;