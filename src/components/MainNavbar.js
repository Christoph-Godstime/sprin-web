import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/orders">Orders</Link>
    </nav>
  );
};

export default MainNavbar;
