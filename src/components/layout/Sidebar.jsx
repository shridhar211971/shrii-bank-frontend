import {
  LayoutDashboard,
  ArrowLeftRight,
  ReceiptText,
  User,
  ShieldCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Shriilogo from "../../assets/shriilogo.png";

const Sidebar = ({ isOpen }) => {
  const { roles } = useAuth();

  const normalizedRoles = Array.isArray(roles) ? roles : roles ? [roles] : [];
  const canAccessAuditor = normalizedRoles.some(
    (role) => role === "ADMIN" || role === "AUDITOR"
  );

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={24} />,
    },

    {
      title: "Transactions",
      path: "/transfer",
      icon: <ArrowLeftRight size={24} />,
    },

    {
      title: "Transactions History",
      path: "/transactions",
      icon: <ReceiptText size={24} />,
    },

    {
      title: "Profile",
      path: "/profile",
      icon: <User size={24} />,
    },

    ...(canAccessAuditor
      ? [
          {
            title: "Auditor",
            path: "/auditor",
            icon: <ShieldCheck size={24} />,
          },
        ]
      : []),
  ];

  return (
    <aside
      className={`
        sticky
        top-0
        h-screen
        bg-[var(--surface)]
        border-r
        border-[var(--border)]
        transition-all
        duration-300
        overflow-hidden
        flex
        flex-col
        backdrop-blur-xl

        ${isOpen ? "w-[280px]" : "w-[85px]"}
      `}
      style={{
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      }}
    >
      {/* LOGO SECTION */}

      <div
        className="
          relative
          px-5
          py-8
          border-b
          border-[var(--border)]
        "
      >
        <div
          className="
            absolute
            top-[-100px]
            right-[-80px]
            w-[220px]
            h-[220px]
            rounded-full
            blur-3xl
            opacity-20
          "
          style={{
            background: "var(--accent)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div
            className="
              w-[90px]
              h-[90px]
              rounded-3xl
              flex
              items-center
              justify-center
              bg-[var(--surface-soft)]
              border
              border-[var(--border)]
              shadow-lg
            "
          >
            <img
              src={Shriilogo}
              alt="Shrii Bank"
              className="w-20 h-20 object-contain"
            />
          </div>

          {isOpen && (
            <>
              <h1
                className="
                  mt-5
                  text-2xl
                  font-black
                  tracking-wide
                  text-[var(--body-text)]
                "
              >
                SHRII BANK
              </h1>

              <p
                className="
                  text-[var(--muted)]
                  text-sm
                  mt-2
                  text-center
                "
              >
                Modern Banking Platform
              </p>
            </>
          )}
        </div>
      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) => `
              group
              relative
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              transition-all
              duration-300
              overflow-hidden

              ${
                isActive
                  ? `
                    bg-[var(--accent)]
                    text-black
                    shadow-xl
                    scale-[1.02]
                  `
                  : `
                    text-[var(--body-text)]
                    hover:bg-[var(--surface-soft)]
                    hover:translate-x-1
                    border
                    border-transparent
                    hover:border-[var(--border)]
                  `
              }
            `}
          >
            {/* ACTIVE GLOW */}

            <div
              className={`
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300

                ${
                  item.path === window.location.pathname
                    ? "opacity-100"
                    : ""
                }
              `}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
              }}
            />

            {/* ICON */}

            <div
              className={`
                relative
                z-10
                flex
                items-center
                justify-center
                min-w-[45px]
                h-[45px]
                rounded-xl
                transition-all
                duration-300

                ${
                  window.location.pathname === item.path
                    ? "bg-white/20"
                    : "bg-[var(--surface-soft)]"
                }
              `}
            >
              {item.icon}
            </div>

            {/* TITLE */}

            {isOpen && (
              <span
                className="
                  relative
                  z-10
                  text-[16px]
                  font-semibold
                  whitespace-nowrap
                "
              >
                {item.title}
              </span>
            )}

            {/* ACTIVE INDICATOR */}

            {window.location.pathname === item.path && (
              <div
                className="
                  absolute
                  right-3
                  w-2
                  h-2
                  rounded-full
                  bg-white
                "
              />
            )}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}

      {isOpen && (
        <div
          className="
            p-5
            border-t
            border-[var(--border)]
          "
        >
          <div
            className="
              rounded-2xl
              p-4
              bg-[var(--surface-soft)]
              border
              border-[var(--border)]
            "
          >
            {/* <p className="text-[var(--muted)] text-xs mb-1">
              Banking System
            </p> */}

            <h3 className="text-[var(--body-text)] font-bold" style={{marginLeft:"10px"}}>
              🏦Thank you 💰...
            </h3>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;