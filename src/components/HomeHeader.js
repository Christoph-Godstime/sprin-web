import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CartCountContext } from "../context/CartCountContext";
import { LoginContext } from "../context/LoginContext";
import { DefaultAddressContext } from "../context/DefaultAddressContext";
import logo from "../assets/homelogo.png";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";

const HomeHeader = () => {
  const { cartCount, refetch: refetchCart } = useContext(CartCountContext);
  const { login } = useContext(LoginContext);
  const { defaultAddress, addressLoading, refetchDefaultAddress } = useContext(
    DefaultAddressContext
  );

  const [time, setTime] = useState(null);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      refetchDefaultAddress();
    }
  }, [login]);

  useEffect(() => {
    setTime(getTimeOfDay());
    loginStatus();
  }, []);

  const loginStatus = async () => {
    const userToken = localStorage.getItem("token");
    setLogged(userToken !== null);
    if (userToken) refetchDefaultAddress();
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "☀️";
    if (hour < 17) return "🌤️";
    return "🌙";
  };

  useEffect(() => {
    refetchCart();
  }, []);

  return (
    <div className="flex justify-between items-center px-[12px] pt-[20px] pb-[10px] w-full max-w-2xl sticky top-0  z-40 bg-gray-100">
      <div className="flex items-center space-x-3 w-full">
        <img src={logo} alt="Logo" className="w-[45px] h-[45px]" />
        <button
          onClick={() => navigate("/add-address")}
          className="text-left w-full"
        >
          {addressLoading ? (
            <p className="text-gray-500 text-[12px]">
              Loading delivery address...
            </p>
          ) : defaultAddress ? (
            <div className="w-full">
              <p className="text-gray-500 text-[12px]">Delivering to</p>
              <div className="flex items-center mt-[2px]">
                <p className="text-[12px] font-medium truncate max-w-[70%]">
                  {defaultAddress.addressLine1}
                </p>
                <IoChevronDown className="ml-2 text-lg" />
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="text-[12px] font-medium">Set delivery address</p>
              <IoChevronDown className="ml-2 text-lg" />
            </div>
          )}
        </button>
      </div>

      <button onClick={() => navigate("/cart")} className="relative">
        <div className="p-[10px] bg-white rounded-full shadow-md">
          <AiOutlineShoppingCart className="text-2xl" />
        </div>
        {cartCount > 0 && (
          <span className="absolute -top-[5px] -right-[5px] bg-red-500 text-white text-xs font-[400] w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default HomeHeader;
