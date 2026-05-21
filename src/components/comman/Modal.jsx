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
          surface-card-strong
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
              text-[var(--body-text)]
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-[var(--muted)]
              hover:text-[var(--body-text)]
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