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
        sticky
        top-0
        h-screen
        bg-[var(--surface)]
        border-r
        border-[var(--border)]
        transition-all
        duration-300
        overflow-hidden

        ${isOpen ? "w-[250px]" : "w-[60px]"}
      `}
    >
      {/* LOGO */}

      <div className="py-8 px-5 border-b border-[var(--border)] mb-6">
        <div className="flex flex-col items-center mb-4">
          <img
            src={Shriilogo}
            alt="Shrii Bank"
            className="w-30 h-35 object-contain"
          />

          {isOpen && (
            <>
            
              <p className="text-[var(--muted)] text-sm mt-3" style={{marginBottom: "10px"}}>
                Modern Banking Platform
              </p>
            </>
          )}
        </div>
        
      </div>

      {/* NAV */}

      <nav className="mt-12 p-6 space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            style={{marginBottom: "10px", marginTop: "10px"}}
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
                    bg-[var(--accent)]
                    text-black
                    border-[var(--accent)]
                    font-semibold
                  `
                  : `
                    border-[var(--border)]
                    text-[var(--body-text)]
                    hover:bg-[var(--surface-soft)]
                    hover:border-[var(--border)]
                  `
              }
            `}
          >
            {item.icon}

            {isOpen && (
              <span className="text-[17px]" >
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