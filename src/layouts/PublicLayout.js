import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default PublicLayout;
