import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
import { AiOutlineRight } from "react-icons/ai";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, defaultAddress, orderItem } =
    location.state?.params || {};

  const total = Number(totalPrice).toFixed(2);
  const formattedTotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(total);

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-gray-100 items-center justify-center">
      <div className="w-full max-w-2xl py-[20px] px-[12px]">
        <div className="flex justify-between items-center bg-gray-100 text-[14px]">
          <div></div>
          <button
            className="text-primary font-bold text-lg"
            onClick={() => navigate("/")}
          >
            Done
          </button>
        </div>

        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex justify-center items-center">
            <IoCheckmarkCircle className="text-primary" size={40} />
          </div>
          <p className="text-gray-500 text-[18px] mt-2">Successful</p>
          <p className="text-black text-[18px] font-medium mt-1">
            {formattedTotal}
          </p>

          <p className="text-primary text-[14px] mt-3">Delivery Address</p>
          <p className="text-gray-500 text-[12px] line-clamp-2 mb-2">
            {defaultAddress?.addressLine1}
          </p>

          <button
            className="flex items-center justify-between mt-5 w-full max-w-lg bg-white px-4 py-4 rounded-lg shadow-sm"
            onClick={() => navigate("/orders")}
          >
            <span className="text-primary text-[14px] ml-2">
              Go to Order Page
            </span>
            <AiOutlineRight className="text-primary" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
