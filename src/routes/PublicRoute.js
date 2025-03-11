import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ userToken, verified }) => {
  if (userToken && verified === true) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
