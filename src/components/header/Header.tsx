import { useNavigate } from "react-router";
import { routes } from "../../router/const";
import { Logout } from "@mui/icons-material";
import LogOutModal from "../modal/LogOutModal";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    navigate(routes.login);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {showLogoutModal && (
        <LogOutModal
          onConfirm={logOutHandler}
          onCancel={handleCancelLogout}
        />
      )}
      
      <div className={`navbar text-white py-12 px-8 flex justify-between items-center sticky top-0 z-10 shadow-lg bg-gradient-to-r from-gray-800 via-cyan-900 to-gray-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-cyan-500 after:transition-all after:duration-1000 hover:after:w-full transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] ${showLogoutModal ? 'backdrop-blur-sm' : ''}`}>
        <div className="flex items-center gap-6 backdrop-blur-sm p-2 rounded-lg">
          <img
            onClick={() => navigate(routes.profile)}
            className="h-14 cursor-pointer transform hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] transition-all duration-300"
            src="https://www.svgrepo.com/show/408429/user-person-profile-block-account-circle.svg"
            alt="Profile"
          />
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleLogoutClick}>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">
              خروج
            </span>
            <span className="transition-all duration-500 hover:scale-110 text-indigo-400 hover:text-cyan-300">
              <Logout />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 backdrop-blur-sm p-2 rounded-lg">
          <span className="font-extrabold text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">
            پنل ادمین پالس گیم
          </span>
          <img
            className="h-16 transform hover:rotate-12 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300"
            src="https://www.svgrepo.com/show/232843/game-console-gamepad.svg"
            alt="Gamepad"
          />
        </div>
      </div>
    </>
  );
}

export default Header;