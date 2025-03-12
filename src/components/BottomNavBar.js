import { useLocation, useNavigate } from "react-router-dom";
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsSearch,
  BsClipboardCheck,
  BsClipboardCheckFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";
import { IoStorefrontSharp, IoStorefrontOutline } from "react-icons/io5";

const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 bg-primary w-full max-w-2xl grid grid-cols-5 place-items-center pt-[6px] pb-[4px] rounded-t-[20px] shadow-md shadow-gray-400 z-40">
      <NavItem
        iconOutline={<BsHouseDoor />}
        iconFilled={<BsHouseDoorFill />}
        label="Home"
        route="/"
        location={location}
        navigate={navigate}
      />
      <NavItem
        iconOutline={<IoStorefrontOutline />}
        iconFilled={<IoStorefrontSharp />}
        label="Supermarket"
        route="/supermarket"
        location={location}
        navigate={navigate}
      />
      <NavItem
        iconOutline={<BsSearch />}
        iconFilled={<BsSearch />}
        label="Search"
        route="/search"
        location={location}
        navigate={navigate}
      />
      <NavItem
        iconOutline={<BsClipboardCheck />}
        iconFilled={<BsClipboardCheckFill />}
        label="Orders"
        route="/orders"
        location={location}
        navigate={navigate}
      />
      <NavItem
        iconOutline={<BsPerson />}
        iconFilled={<BsPersonFill />}
        label="Profile"
        route="/profile"
        location={location}
        navigate={navigate}
      />
    </div>
  );
};

const NavItem = ({
  iconOutline,
  iconFilled,
  label,
  route,
  location,
  navigate,
}) => {
  const isActive = location.pathname === route;

  return (
    <div>
      <button
        className={`flex flex-col items-center cursor-pointer transition-colors ${
          isActive ? "text-secondary" : "text-white hover:text-orange-200"
        }`}
        onClick={() => navigate(route)}
      >
        <div className="text-xl">{isActive ? iconFilled : iconOutline}</div>
        <div className=" text-[10px] mt-[5px]">{label}</div>
      </button>
    </div>
  );
};

export default BottomNavBar;
