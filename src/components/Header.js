import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Header = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-2xl flex justify-start items-center h-[60px] sticky top-0  z-40 px-[12px] bg-secondary">
      <button onClick={() => navigate(-1)} className="text-white text-xl  ">
        <BsArrowLeft />
      </button>
      <h2 className="text-white  text-[12px] md: text-[14px] font-[500] ml-[30px]">
        {text}
      </h2>
    </div>
  );
};

export default Header;
