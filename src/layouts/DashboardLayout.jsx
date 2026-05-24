import { useState } from "react";
import { NavLink } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useAuth from "../hooks/useAuth";

const DashboardLayout = ({ children }) => {
  const { roles } = useAuth();
  const normalizedRoles = Array.isArray(roles) ? roles : roles ? [roles] : [];
  const canAccessAuditor = normalizedRoles.some(
    (role) => role === "ADMIN" || role === "AUDITOR"
  );

  const [isOpen, setIsOpen] = useState(() => {
    const stored = sessionStorage.getItem("isOpen");
    return stored !== null ? JSON.parse(stored) : false; // default closed
  });
  const [isAppView, setIsAppView] = useState(() => {
    const stored = sessionStorage.getItem("isAppView");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const toggleAppView = () => {
    setIsAppView((prev) => {
      const next = !prev;
      sessionStorage.setItem("isAppView", JSON.stringify(next));
      return next;
    });
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const next = !prev;
      sessionStorage.setItem("isOpen", JSON.stringify(next));
      return next;
    });
  };


  return (
    <div
      className={`
        ${isAppView ? "flex gap-4 h-screen overflow-hidden" : "flex flex-col min-h-screen overflow-visible"}
        bg-[var(--body-bg)]
        text-[var(--body-text)]
      `}
    >
      {isAppView && <Sidebar isOpen={isOpen} />}

      <div
        className={`
          flex-1
          flex
          flex-col
          min-w-0
          transition-all
          duration-300
          ${isAppView ? "overflow-hidden" : "overflow-visible"}
        `}
      >
         <div className="sticky top-0 z-30 bg-[var(--surface)]">

          {/* HEADER */}
          <Header
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isAppView={isAppView}
            toggleAppView={toggleAppView}
          />

          {/* NAVBAR */}
          {!isAppView && (
            <div className="border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl">
              <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-10">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 py-3">

                  {/* LOGO */}
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="text-lg sm:text-xl font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                      SHRII BANK 🏦
                    </div>
                  </div>

                  {/* NAV LINKS */}
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex min-w-max items-center justify-center gap-3 pb-2 lg:pb-0">

                      {[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Transfer", path: "/transfer" },
                        { title: "Transactions", path: "/transactions" },
                        { title: "Profile", path: "/profile" },
                        ...(canAccessAuditor
                          ? [{ title: "Auditor", path: "/auditor" }]
                          : []),
                      ].map((item) => (
                        <NavLink
                          key={item.title}
                          to={item.path}
                          className={({ isActive }) => `
                            whitespace-nowrap
                            rounded-md
                            text-xs
                            sm:text-sm
                            font-semibold
                            transition-all
                            px-3
                            py-2
                            sm:px-4
                            md:px-5
                            ${
                              isActive
                                ? "bg-[var(--accent)] text-black"
                                : "bg-[var(--surface-soft)] text-[var(--body-text)] hover:bg-[var(--surface)]"
                            }
                          `}
                          style={{marginTop:"5px",marginBottom:"5px"}}
                        >
                          {item.title}
                        </NavLink>
                      ))}

                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>

        <main
          className={`
            flex-1
            min-h-0
            py-4
            md:py-6
            lg:py-10
            overflow-auto
            ${!isAppView ? "px-[20px]" : "p-4 md:p-6 lg:p-10"}
          `}
          style={{
            WebkitOverflowScrolling: "touch",
            paddingTop: `10px`,
            paddingLeft:'40px',
            paddingRight:'40px',
          }}
        >
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;