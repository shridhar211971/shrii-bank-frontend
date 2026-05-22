import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const DashboardLayout = ({ children }) => {

  // SIDEBAR STATE
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="
        flex
        gap-4
        h-screen
        overflow-hidden
        bg-[var(--body-bg)]
        text-[var(--body-text)]
      " 
      style={{marginRight: "10px", marginLeft: "1px"}}
    >
      {/* SIDEBAR */}

      <Sidebar isOpen={isOpen} />

      {/* MAIN CONTENT */}

      <div
        className="
          flex-1
          flex
          flex-col
          min-w-0
          transition-all
          duration-300
          overflow-hidden
        "
      >
        {/* HEADER */}

        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* PAGE CONTENT */}

        <main
          className="
            flex-1
            min-h-0
            p-4
            md:p-6
            lg:p-10
            pt-[100px]
            overflow-auto
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div>{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;