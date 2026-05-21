const Loader = () => {

  return (
    <div
      className="
        flex
        items-center
        justify-center
        py-20
      "
    >

      <div
        className="
          w-14
          h-14
          border-4
          border-[var(--accent)]
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

    </div>
  );
};

export default Loader;