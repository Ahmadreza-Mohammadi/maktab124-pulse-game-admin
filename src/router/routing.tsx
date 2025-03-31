import { Route, Routes } from "react-router";
import { routes } from "./const";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Products from "../pages/products/Products";
import Inventory from "../pages/inventory/Inventory";
import Orders from "../pages/orders/Orders";
import DeliveryLogs from "../pages/delivery-logs/DeliveryLogs";
import Layout from "../components/layout/Layout";
import Profile from "../pages/profile/Profile";

function Routing() {
  return (
    <>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={"/"} element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.products} element={<Products />} />
          <Route path={routes.inventory} element={<Inventory />} />
          <Route path={routes.orders} element={<Orders />} />
          <Route path={routes.delivery_logs} element={<DeliveryLogs />} />
          <Route path={routes.profile} element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
