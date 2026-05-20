import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const DashboardLayout = ({ children }) => {

  // SIDEBAR STATE
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="
        flex
        gap-4
        min-h-screen
        bg-gradient-to-br
        from-[#020817]
        via-[#0a1525]
        to-[#020817]
      "
    >
      {/* SIDEBAR */}

      <Sidebar
        isOpen={isOpen}
      />

      {/* MAIN CONTENT */}

      <div
        className="
          flex-1
          flex
          flex-col
          min-w-0
          transition-all
          duration-300
      
        "
      >
        {/* HEADER */}

        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* PAGE CONTENT */}

        <main
          className="
            flex-1
            p-6
            lg:p-10
            overflow-auto
          "
        >
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;