import { useNavigate } from "react-router";
import { routes } from "../../router/const";
import { ADMIN_NAME } from "../api/api";

function Header() {
  const navigate = useNavigate();
  const adminName = JSON.parse(ADMIN_NAME || '""');

  return (
    <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-3xl shadow-lg">
      <div className="navbar mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            onClick={() => navigate(routes.profile)}
            className="h-12 w-12 rounded-full cursor-pointer object-cover hover:ring-4 hover:ring-cyan-500/30 transition-all duration-300 ease-in-out"
            src="https://www.svgrepo.com/show/408429/user-person-profile-block-account-circle.svg"
            alt="Profile"
          />
          <p className="text-gray-200 text-lg font-medium flex gap-3">
            خوش آمدید
            <span
              className="cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              onClick={() => navigate(routes.profile)}
            >
              {adminName}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-white tracking-tight">
            پنل ادمین پالس گیم
          </span>
          <img
            className="h-10 w-10 opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-in-out"
            src="https://www.svgrepo.com/show/232843/game-console-gamepad.svg"
            alt="Gamepad"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
