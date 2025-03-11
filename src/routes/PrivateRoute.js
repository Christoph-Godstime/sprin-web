import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ userToken, verified }) => {
  if (!userToken || verified === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
