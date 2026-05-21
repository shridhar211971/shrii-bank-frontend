import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";

import {
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import toast from "react-hot-toast";

import { useTheme } from "../../hooks/useTheme";

const Header = ({ isOpen, setIsOpen }) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mode, toggleTheme } = useTheme();

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
        sticky
        top-0
        z-20
        h-[90px]
        border-b
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--body-text)]
        flex
        flex-col md:flex-row
        items-center
        justify-between
        gap-4
        px-4 md:px-6 lg:px-10
        transition-colors
        duration-300
        backdrop-blur-xl
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
            bg-[var(--accent)]
            text-[var(--surface)]
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
              text-[var(--body-text)]
            "
          >
            Welcome Back 👋
          </h2>

          <p
            className="
              text-[var(--muted)]
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
          flex-col md:flex-row
          items-center
          gap-4 md:gap-6
          pr-0 md:pr-8
        "
      >
        <button
          onClick={toggleTheme}
          className="
            w-12
            h-12
            rounded-xl
            text-[var(--body-text)]
            flex
            items-center
            justify-center
            hover:scale-105
            transition-all
          "
          aria-label="Toggle light and dark mode"
        >
          {mode === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* USER INFO */}

        <div className="text-right">

          <p
            className="
              text-[var(--body-text)]
              font-semibold
              text-lg
            "
          >
            {user?.firstName || "User"}{" "}
            {user?.lastName || ""}
          </p>

          <p
            className="
              text-[var(--accent)]
              text-sm
            "
          >
            {user?.email ||
              "No Email"}
          </p>

          <p
            className="
              text-[var(--muted)]
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
            from-[var(--accent)]
            to-blue-600
            flex
            items-center
            justify-center
            text-[var(--surface)]
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