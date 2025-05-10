import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GradientButton } from "../library/Button";

export default function MasterLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-gray-950/90 text-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <Link
                className="cursor-pointer text-2xl font-semibold hover:text-sky-400 transition-all duration-300 after:w-0 hover:after:w-full after:h-0.5 after:bg-sky-400 after:block after:transition-all after:duration-300"
                to='/'
              >
                Elysia Email Agent
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <GradientButton onClick={() => navigate("/")}>
                Dashboard
              </GradientButton>
              <GradientButton onClick={() => navigate("/settings")}>
                Settings
              </GradientButton>
            </div>
          </div>
        </div>
      </header>
      <div className="flex grow">
        <ToastContainer newestOnTop limit={3} />
        <div className="container flex flex-col mx-auto overflow-y-auto relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
