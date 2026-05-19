import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, roles } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header
      className="
        h-[100px]
        border-b
        border-white/10
        flex
        items-center
        justify-between
        px-6 lg:px-10
        bg-[#091120]/80
        backdrop-blur-xl
        sticky
        top-0
        z-30
      "
    >

      <div className="flex-1">

        <h2
          className="
            text-2xl lg:text-3xl
            font-bold
            text-white
          "
        >
          Welcome Back 👋
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Manage your banking activities
        </p>

      </div>

      {/* USER */}

      <div
        className="
          flex
          items-center
          gap-4 lg:gap-6
        "
      >

        <div className="text-right hidden sm:block">

          <p className="text-white font-semibold text-lg">
            {user?.firstName || "User"} {user?.lastName || ""}
          </p>

          <p className="text-cyan-400 text-sm font-medium">
            {roles && roles.length > 0 ? roles[0] : "User"}
          </p>

        </div>

        <div
          className="
            w-12 h-12 lg:w-14 lg:h-14
            rounded-full
            bg-gradient-to-br
            from-cyan-400
            to-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-xl
          "
        >
          {user?.firstName?.[0] || "U"}
        </div>

        <button
          onClick={handleLogout}
          className="
            px-4 lg:px-6
            py-2 lg:py-3
            bg-red-500/10
            border
            border-red-500/20
            rounded-xl
            text-red-400
            hover:bg-red-500/20
            transition-all
            font-medium
          "
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Header;