import { useNavigate } from "react-router";
import { routes } from "../../router/const";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="navbar text-white py-12 px-8 flex justify-between items-center sticky top-0 z-10 shadow-lg bg-gradient-to-r from-gray-800 via-cyan-900 to-gray-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-cyan-500 after:transition-all after:duration-1000 hover:after:w-full transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]">
      <div className="flex items-center gap-6 backdrop-blur-sm p-2 rounded-lg">
        <img
          onClick={() => navigate(routes.profile)}
          className="h-14 cursor-pointer transform hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] transition-all duration-300"
          src="https://www.svgrepo.com/show/408429/user-person-profile-block-account-circle.svg"
          alt="Profile"
        />
        <img
          className="h-12 cursor-pointer transform hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] transition-all duration-300"
          src="https://www.svgrepo.com/show/212422/pencil-edit.svg"
          alt="Edit"
        />
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
  );
}

export default Header;
