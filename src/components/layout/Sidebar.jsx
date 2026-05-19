import {
  LayoutDashboard,
  ArrowLeftRight,
  ReceiptText,
  User,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      title: "Transfer",
      path: "/transfer",
      icon: <ArrowLeftRight size={20} />,
    },

    {
      title: "Transactions",
      path: "/transactions",
      icon: <ReceiptText size={20} />,
    },

    {
      title: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },

    {
      title: "Auditor",
      path: "/auditor",
      icon: <ShieldCheck size={20} />,
    },
  ];

  return (
    <aside
      className="
        w-[280px]
        min-h-screen
        bg-[#071028]
        border-r
        border-white/10
        flex
        flex-col
        justify-between
        px-6
        py-8
      "
    >

      <div>

        {/* LOGO */}

        <div className="mb-14">

          <h1
            className="
              text-3xl
              font-black
              text-cyan-400
            "
          >
            SHRII BANK
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Modern Banking Platform
          </p>

        </div>

        {/* NAVIGATION */}

        <nav className="space-y-4">

          {navItems.map((item) => (

            <NavLink
              key={item.title}
              to={item.path}

              className={({ isActive }) => `
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-slate-300 hover:bg-white/5"
                }
              `}
            >

              {item.icon}

              <span>{item.title}</span>

            </NavLink>

          ))}

        </nav>

      </div>

      {/* LOGOUT */}

      <button
        className="
          flex
          items-center
          justify-center
          gap-3
          bg-red-500/10
          border
          border-red-500/20
          py-4
          rounded-2xl
          text-red-400
          hover:bg-red-500/20
          transition-all
        "
      >

        <LogOut size={18} />

        Logout

      </button>

    </aside>
  );
};

export default Sidebar;