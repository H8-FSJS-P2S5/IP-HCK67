import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
