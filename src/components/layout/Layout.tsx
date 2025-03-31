import { Outlet } from "react-router"
import Header from "../header/Header"
import AsideMenu from "../aside-bar/AsideMenu"

function Layout() {
  return (
    <>
    <Header />
    <AsideMenu />
    <Outlet />

    </>
  )
}

export default Layout