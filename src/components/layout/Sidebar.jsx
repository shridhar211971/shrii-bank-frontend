import {
  LayoutDashboard,
  ArrowLeftRight,
  ReceiptText,
  User,
  ShieldCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import Shriilogo from "../../assets/shriilogo.png";

const Sidebar = ({ isOpen }) => {
  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={40} />,
    },

    {
      title: "Transactions",
      path: "/transfer",
      icon: <ArrowLeftRight size={40} />,
    },

    {
      title: "Transactions History",
      path: "/transactions",
      icon: <ReceiptText size={40} />,
    },

    {
      title: "Profile",
      path: "/profile",
      icon: <User size={40} />,
    },

    {
      title: "Auditor",
      path: "/auditor",
      icon: <ShieldCheck size={40} />,
    },
  ];

  return (
    <aside
      className={`
        bg-[#071028]
        border-r
        border-white/10
        min-h-screen
        transition-all
        duration-300
        overflow-hidden

        ${isOpen ? "w-[250px]" : "w-[55px]"}
      `}
    >
      {/* LOGO */}

      <div className="py-8 px-5 border-b border-white/10 mb-4">
        <div className="flex flex-col items-center mb-4">
          <img
            src={Shriilogo}
            alt="Shrii Bank"
            className="w-20 h-20 object-contain"
          />

          {isOpen && (
            <>
              <p className="text-cyan-400 text-4xl font-black mt-5">
                SHRII BANK
              </p>

              <p className="text-slate-400 text-sm mt-3">
                Modern Banking Platform
              </p>
            </>
          )}
        </div>
        
      </div>

      {/* NAV */}

      <nav className="mt-12 p-4 space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) => `
              flex
              items-center
              gap-4
              px-4
              py-4
              rounded-2xl
              border
              transition-all
              duration-300

              ${
                isActive
                  ? `
                    bg-cyan-500
                    text-black
                    border-cyan-400
                    font-semibold
                  `
                  : `
                    border-white/10
                    text-slate-300
                    hover:bg-white/5
                    hover:border-cyan-400/40
                  `
              }
            `}
          >
            {item.icon}

            {isOpen && (
              <span className="text-[17px]">
                {item.title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;