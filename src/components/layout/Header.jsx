import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";

import {
  Menu,
  X,
  LogOut,
} from "lucide-react";

import toast from "react-hot-toast";

const Header = ({ isOpen, setIsOpen }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // USER FROM SESSION STORAGE

  const user = JSON.parse(
    sessionStorage.getItem("user")
  );

  const accountNumber =
    sessionStorage.getItem(
      "accountNumber"
    );

  const handleLogout = () => {

    dispatch(logout());

    sessionStorage.clear();

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");
  };

  return (
    <header
      className="
        h-[90px]
        border-b
        border-white/10
        bg-[#091120]
        flex
        items-center
        justify-between
        px-8 lg:px-10
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-6">

        {/* TOGGLE */}

        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="
            w-12
            h-12
            rounded-xl
            bg-cyan-500
            text-black
            flex
            items-center
            justify-center
            hover:scale-105
            transition-all
          "
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        <div>

          <h2
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Welcome Back 👋
          </h2>

          <p
            className="
              text-slate-400
              text-sm
              mt-1
            "
          >
            Manage your banking activities
          </p>

        </div>
      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          items-center
          gap-6
          pr-8
        "
      >
        {/* USER INFO */}

        <div className="text-right">

          <p
            className="
              text-white
              font-semibold
              text-lg
            "
          >
            {user?.firstName || "User"}{" "}
            {user?.lastName || ""}
          </p>

          <p
            className="
              text-cyan-400
              text-sm
            "
          >
            {user?.email ||
              "No Email"}
          </p>

          <p
            className="
              text-slate-400
              text-xs
              mt-1
            "
          >
            Acc:
            {" "}
            {accountNumber ||
              "----"}
          </p>

        </div>

        {/* AVATAR */}

        <div
          className="
            w-14
            h-14
            rounded-full
            bg-gradient-to-br
            from-cyan-400
            to-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-xl
          "
        >
          {user?.firstName?.[0] ||
            "U"}
        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            mr-6
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            text-red-400
            hover:bg-red-500/20
            transition-all
          "
        >
          <LogOut size={14} />

          Logout
        </button>

      </div>
    </header>
  );
};

export default Header;