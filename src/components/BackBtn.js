import React from "react";
import { IoChevronBackCircle } from "react-icons/io5";

const BackBtn = ({ onPress, top }) => {
  return (
    <button
      onClick={onPress}
      className={` z-50 flex items-center ${top ? `top-${top}` : "top-0"}`}
    >
      <IoChevronBackCircle size={30} className="text-primary" />
    </button>
  );
};

export default BackBtn;
