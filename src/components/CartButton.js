import React, { useContext, useEffect, useRef } from "react";
import { FetchCartDetailsContext } from "../context/FetchCartDetailsContext";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const navigate = useNavigate();
  const { cart, cartStatus } = useContext(FetchCartDetailsContext);

  const slideAnim = useRef(100); // Start off-screen

  useEffect(() => {
    if (cartStatus) {
      setTimeout(() => {
        slideAnim.current = 0;
      }, 500); // Smooth animation over 500ms
    }
  }, [cartStatus]);

  const calculateTotalPrice = (items) => {
    return items?.reduce((total, item) => total + item.price, 0) || 0;
  };

  if (!cartStatus) return null; // Don't render if cartStatus is false

  return (
    <div
      className={`fixed bottom-[65px] w-full max-w-2xl flex justify-center transition-transform duration-500 z-40 ${
        slideAnim.current === 0 ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={() => navigate("/grocery-checkout", { state: { data: cart } })}
        className="bg-primary px-4 py-2 rounded-full w-[90%] flex justify-center items-center"
      >
        <div className="flex items-center">
          <span className="text-white text-[14px] md:text-[16px] font-[400]">
            View cart
          </span>
          <span className="mx-2 text-white text-xl">•</span>
          <span className="text-white ext-[14px] md:text-[16px] font-[400]">
            {calculateTotalPrice(cart?.items).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </button>
    </div>
  );
};

export default CartButton;
