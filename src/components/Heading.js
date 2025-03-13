import React from "react";
import { Ionicons } from "react-icons/io5";

const Heading = ({ heading, onClick }) => {
  return (
    <div className="flex flex-row justify-between items-center mt-4 mb-2 px-[12px] ">
      <h2 className="text-[16px] font-[500]">{heading}</h2>
      <button
        className="bg-orange-100 text-primary px-[8px] py-[6px] rounded-[8px] text-[12px] font-[600]"
        onClick={onClick}
      >
        See all
      </button>
    </div>
  );
};

export default Heading;
