import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorageIcon from "@mui/icons-material/Storage";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";

function AsideMenu() {
  return (
    <div className="bg-gray-900 p-10 w-66 h-screen flex flex-col gap-16 items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-gray-800/50">
      {/* aside header with hover animation */}
      <div className="flex items-center gap-4 group">
        <span className="font-bold text-2xl text-white transition-all duration-300 group-hover:text-indigo-400">
          پالس گیم
        </span>
        <img
          src="https://www.svgrepo.com/show/232843/game-console-gamepad.svg"
          alt="puls game"
          className="h-16 transition-all duration-500 group-hover:rotate-12"
        />
      </div>

      {/* aside menu links with hover animations */}
      <ul className="flex flex-col gap-6 w-full">
        {[
          { icon: <HomeIcon />, text: "خانه" },
          { icon: <InventoryIcon />, text: "محصولات" },
          { icon: <StorageIcon />, text: "موجودی" },
          { icon: <ListAltIcon />, text: "فروش" },
          { icon: <LocalShippingIcon />, text: "تحویل شده/نشده" },
          { icon: <PersonIcon />, text: "پروفایل" },
        ].map((item, index) => (
          <li
            key={index}
            className="text-xl font-bold text-gray-300 flex gap-2 items-center justify-center cursor-pointer 
                      transition-all duration-300 hover:text-white hover:bg-gray-800/50 py-3 px-4 rounded-lg
                      hover:translate-x-2 hover:shadow-md hover:shadow-indigo-500/20"
          >
            <span className="transition-all duration-500 hover:scale-125">
              {item.icon}
            </span>
            <span className="transition-all duration-300">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AsideMenu;
