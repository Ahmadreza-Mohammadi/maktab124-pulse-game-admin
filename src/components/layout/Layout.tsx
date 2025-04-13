import { Outlet } from "react-router";
import Header from "../header/Header";
import AsideMenu from "../aside-bar/AsideMenu";

function Layout() {
  return (
    <>
      <Header />
      <div className="flex">
        <AsideMenu />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
