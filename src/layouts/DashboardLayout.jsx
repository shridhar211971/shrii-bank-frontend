import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const DashboardLayout = ({ children }) => {

  return (
    <div
      className="
        flex
        min-h-screen
        bg-[#020817]
      "
    >

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="p-10">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;