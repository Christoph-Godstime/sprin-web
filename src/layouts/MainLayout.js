import { Outlet } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

const MainLayout = () => {
  return (
    <>
      <MainNavbar />
      <Outlet /> {/* Renders the page content */}
    </>
  );
};

export default MainLayout;
