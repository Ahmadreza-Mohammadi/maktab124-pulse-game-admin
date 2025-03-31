import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorageIcon from "@mui/icons-material/Storage";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import { routes } from "../../router/const";
import { useNavigate } from "react-router";

function AsideMenu() {
  const navigate: any = useNavigate();

  return (
    <div className="bg-gray-900 w-72 h-screen p-8 flex flex-col gap-12 items-center text-center transition-all duration-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
      <ul className="flex flex-col gap-8 w-full">
        {[
          { icon: <HomeIcon />, text: "خانه", endpoint: routes.home },
          {
            icon: <InventoryIcon />,
            text: "محصولات",
            endpoint: routes.products,
          },
          { icon: <StorageIcon />, text: "موجودی", endpoint: routes.inventory },
          { icon: <ListAltIcon />, text: "فروش", endpoint: routes.orders },
          {
            icon: <LocalShippingIcon />,
            text: "تحویل شده/نشده",
            endpoint: routes.delivery_logs,
          },
          { icon: <PersonIcon />, text: "پروفایل", endpoint: routes.profile },
        ].map((page, index) => (
          <li
            onClick={() => {
              navigate(page.endpoint);
            }}
            key={index}
            className="text-lg font-semibold text-indigo-300 flex gap-3 items-center justify-start cursor-pointer 
                      transition-all duration-300 hover:text-cyan-200 hover:bg-gray-800/70 py-4 px-6 rounded-xl
                      hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:-translate-y-1"
          >
            <span className="transition-all duration-500 hover:scale-110 text-indigo-400 hover:text-cyan-300">
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
