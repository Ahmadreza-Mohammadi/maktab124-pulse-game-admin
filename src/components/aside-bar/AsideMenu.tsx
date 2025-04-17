import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorageIcon from "@mui/icons-material/Storage";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { routes } from "../../router/const";
import { useNavigate } from "react-router";
import LogOutModal from "../modal/LogOutModal";

function AsideMenu() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate(routes.login);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <aside className="fixed top-0 right-0 w-64 h-screen bg-gray-900/95 backdrop-blur-md shadow-lg z-20 overflow-y-auto">
      {showLogoutModal && (
        <LogOutModal onConfirm={logOutHandler} onCancel={handleCancelLogout} />
      )}
      <div className="flex flex-col gap-6 p-6 pt-20">
        <ul className="flex flex-col gap-2">
          {[
            { icon: <HomeIcon />, text: "خانه", endpoint: routes.home },
            { icon: <InventoryIcon />, text: "محصولات", endpoint: routes.products },
            { icon: <StorageIcon />, text: "موجودی", endpoint: routes.inventory },
            { icon: <ListAltIcon />, text: "فروش", endpoint: routes.sales },
            {
              icon: <LocalShippingIcon />,
              text: "تحویل شده/نشده",
              endpoint: routes.delivery_logs,
            },
            { icon: <PersonIcon />, text: "پروفایل", endpoint: routes.profile },
          ].map((page, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveIndex(index);
                navigate(page.endpoint);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                text-gray-200 text-base font-medium
                transition-all duration-200 ease-in-out
                hover:bg-gray-800 hover:text-cyan-400 hover:shadow-sm
                ${
                  activeIndex === index
                    ? "bg-gray-800 text-cyan-400 shadow-sm"
                    : ""
                }`}
            >
              <span
                className={`transition-all duration-200 ${
                  activeIndex === index ? "text-cyan-400" : "text-gray-400"
                }`}
              >
                {page.icon}
              </span>
              <span>{page.text}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white text-base font-medium
            hover:bg-red-600 transition-all duration-200 ease-in-out"
        >
          <LogoutIcon />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );
}

export default AsideMenu;