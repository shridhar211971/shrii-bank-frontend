import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

import { Menu, X, LogOut, Moon, Sun, Monitor } from "lucide-react";

import toast from "react-hot-toast";
import { useTheme } from "../../hooks/useTheme";

const Header = ({ isOpen, toggleSidebar, isAppView, toggleAppView }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mode, toggleTheme } = useTheme();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const accountNumber = sessionStorage.getItem("accountNumber");

  const handleLogout = () => {
    dispatch(logout());

    sessionStorage.clear();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <header
      className="
        border-b
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--body-text)]
        backdrop-blur-xl
        px-3
        sm:px-4
        md:px-6
        lg:px-10
        py-3
      "
      style={{marginBottam:"15px"}}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        {/* LEFT SECTION */}

        <div className="flex items-center gap-3 min-w-0">
          {isAppView && (
            <button
              onClick={toggleSidebar}
              className="
                w-10
                h-10
                rounded-xl
                bg-[var(--accent)]
                text-[var(--surface)]
                flex
                items-center
                justify-center
                shrink-0
              "
              aria-label="Toggle sidebar"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          {/* HIDE TITLE ON SMALL MOBILE */}

          <div className="hidden sm:block" style={{marginTop:"15px", marginBottom:"10px", marginLeft:"15px"}}>
            <h2
              className="
                text-lg
                md:text-2xl
                font-bold
                leading-tight
              "
            >
              Welcome ShriiBank 🏦
            </h2>

            <p
              className="
                text-xs
                md:text-sm
                text-[var(--muted)]
              "
            >
              Manage your banking activities
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}

        <div
          className="
            flex
            items-center
            gap-1
            sm:gap-2
            md:gap-4
            min-w-0
          "
        >
          {/* MONITOR BUTTON */}

          <button
            onClick={toggleAppView}
            className="
              w-9
              h-9
              md:w-10
              md:h-10
              rounded-xl
              flex
              items-center
              justify-center
              hover:bg-[var(--surface-soft)]
              transition-all
              shrink-0
            "
            aria-label="Toggle app website view"
          >
            <Monitor size={18} />
          </button>

          {/* THEME BUTTON */}

          <button
            onClick={toggleTheme}
            className="
              w-9
              h-9
              md:w-10
              md:h-10
              rounded-xl
              flex
              items-center
              justify-center
              hover:bg-[var(--surface-soft)]
              transition-all
              shrink-0
            "
            aria-label="Toggle light and dark mode"
          >
            {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* USER INFO - HIDE ON SMALL MOBILE */}

          <div
            className="
              hidden
              md:block
              text-right
              min-w-0
            "
          >
            <p
              className="
                text-sm
                font-semibold
                truncate
              "
            >
              {user?.firstName || "User"} {user?.lastName || ""}
            </p>

            <p
              className="
                text-[var(--accent)]
                text-xs
                truncate
              "
            >
              {user?.email || "No Email"}
            </p>

            <p
              className="
                text-[var(--muted)]
                text-[10px]
              "
            >
              Acc: {accountNumber || "----"}
            </p>
          </div>

          {/* AVATAR */}

          <div
            className="
              w-9
              h-9
              md:w-11
              md:h-11
              rounded-full
              bg-gradient-to-br
              from-[var(--accent)]
              to-blue-600
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-sm
              md:text-base
              shrink-0
            "
          >
            {user?.firstName?.[0] || "U"}
          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              w-9
              h-9
              md:w-10
              md:h-10
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              text-red-400
              flex
              items-center
              justify-center
              hover:bg-red-500/20
              transition-all
              shrink-0
            "
            style={{marginRight:"10px"}}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
