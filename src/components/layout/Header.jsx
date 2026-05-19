const Header = () => {

  return (
    <header
      className="
        h-[90px]
        border-b
        border-white/10
        flex
        items-center
        justify-between
        px-10
        bg-[#091120]
      "
    >

      <div>

        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          Welcome Back 👋
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Manage your banking activities
        </p>

      </div>

      {/* USER */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div className="text-right">

          <p className="text-white font-semibold">
            Shridhar
          </p>

          <p className="text-slate-400 text-sm">
            Premium User
          </p>

        </div>

        <div
          className="
            w-14
            h-14
            rounded-full
            bg-cyan-500
          "
        />

      </div>

    </header>
  );
};

export default Header;