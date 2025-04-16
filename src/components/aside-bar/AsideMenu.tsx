import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorageIcon from "@mui/icons-material/Storage";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import { routes } from "../../router/const";
import { useNavigate } from "react-router";
import { Logout } from "@mui/icons-material";
import LogOutModal from "../modal/LogOutModal";

function AsideMenu() {
  const navigate: any = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // State to track active button
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
        <LogOutModal onConfirm={logOutHandler} onCancel={handleCancelLogout} />
      )}
      <div className="bg-gray-900 w-80 h-screen fixed top-44 right-0 p-12 flex flex-col gap-14 items-center text-center transition-all duration-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] z-20 overflow-y-auto">
        <ul className="flex flex-col gap-4 w-full">
          {[
            { icon: <HomeIcon />, text: "خانه", endpoint: routes.home },
            {
              icon: <InventoryIcon />,
              text: "محصولات",
              endpoint: routes.products,
            },
            {
              icon: <StorageIcon />,
              text: "موجودی",
              endpoint: routes.inventory,
            },
            { icon: <ListAltIcon />, text: "فروش", endpoint: routes.sales },
            {
              icon: <LocalShippingIcon />,
              text: "تحویل شده/نشده",
              endpoint: routes.delivery_logs,
            },
            { icon: <PersonIcon />, text: "پروفایل", endpoint: routes.profile },
          ].map((page, index) => (
            <li
              onClick={() => {
                setActiveIndex(index); // Update active index
                navigate(page.endpoint);
              }}
              key={index}
              className={`text-lg font-semibold flex gap-3 items-center justify-start cursor-pointer 
                        transition-all duration-300 py-4 px-6 rounded-xl
                        hover:text-cyan-200 hover:bg-gray-800/70 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:-translate-y-1
                        ${
                          activeIndex === index
                            ? "text-cyan-300 bg-gray-800 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                            : "text-indigo-300"
                        }`}
            >
              <span
                className={`transition-all duration-500 ${
                  activeIndex === index
                    ? "scale-110 text-cyan-300"
                    : "text-indigo-400"
                }`}
              >
                {page.icon}
              </span>
              <span className="transition-all duration-300">{page.text}</span>
            </li>
          ))}
        </ul>
        <div onClick={handleLogoutClick} className=" bg-red-400 text-white flex justify-center gap-1 items-center">
          <button className=" font-bold text-2xl">خروج</button>
          <Logout />
        </div>
      </div>
    </>
  );
}

export default AsideMenu;
