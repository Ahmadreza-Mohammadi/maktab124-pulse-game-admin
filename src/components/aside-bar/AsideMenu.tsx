import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorageIcon from "@mui/icons-material/Storage";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";

function AsideMenu() {
  return (
    <div className="bg-gray-700 p-10 w-66 h-screen flex flex-col gap-16 items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-gray-800/50">
      <ul className="flex flex-col gap-6 w-full">
        {[
          { icon: <HomeIcon />, text: "خانه" },
          { icon: <InventoryIcon />, text: "محصولات" },
          { icon: <StorageIcon />, text: "موجودی" },
          { icon: <ListAltIcon />, text: "فروش" },
          { icon: <LocalShippingIcon />, text: "تحویل شده/نشده" },
          { icon: <PersonIcon />, text: "پروفایل" },
        ].map((page, index) => (
          <li
            key={index}
            className="text-xl font-bold text-[#267cdf] flex gap-2 items-center justify-center cursor-pointer 
                      transition-all duration-300 hover:text-white hover:bg-gray-800/50 py-3 px-4 rounded-lg
                      hover:translate-x-2 hover:shadow-md hover:shadow-indigo-500/20"
          >
            <span className="transition-all duration-500 hover:scale-125">
              {page.icon}
            </span>
            <span className="transition-all duration-300">{page.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AsideMenu;
