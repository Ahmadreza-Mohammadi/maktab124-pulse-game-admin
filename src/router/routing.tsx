import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";
import { routes } from "./const";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Products from "../pages/products/Products";
import Inventory from "../pages/inventory/Inventory";
import Orders from "../pages/sales/Sales";
import DeliveryLogs from "../pages/delivery-logs/DeliveryLogs";
import Layout from "../components/layout/Layout";
import Profile from "../pages/profile/Profile";
import { isLogin } from "../components/api/Login.api";

function Routing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      navigate(routes.home);
    } else navigate(routes.login)
  }, [isLogin]);

  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route path={"/"} element={<Layout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.products} element={<Products />} />
        <Route path={routes.inventory} element={<Inventory />} />
        <Route path={routes.sales} element={<Orders />} />
        <Route path={routes.delivery_logs} element={<DeliveryLogs />} />
        <Route path={routes.profile} element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default Routing;