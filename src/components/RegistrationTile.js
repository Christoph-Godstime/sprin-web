import React from "react";

const RegistrationTile = ({ onClick, heading, desc }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 m-3 h-[75px] flex items-center">
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="text-black font-medium text-[12px] ml-2">{heading}</p>
          <p className="text-gray-500 text-xs mt-1 ml-2 w-[70%] text-justify">
            {desc}
          </p>
        </div>
        <div className="w-[30%] flex justify-end">
          <button
            className="w-[90px] h-[30px] border border-gray-400 rounded-full flex justify-center items-center text-black text-[12px] "
            onClick={onClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTile;
