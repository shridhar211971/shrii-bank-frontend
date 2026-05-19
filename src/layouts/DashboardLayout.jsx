import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const DashboardLayout = ({ children }) => {

  return (
    <div
      className="
        flex
        min-h-screen
        bg-gradient-to-br
        from-[#020817]
        via-[#0a1525]
        to-[#020817]
      "
    >

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        <Header />

        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;