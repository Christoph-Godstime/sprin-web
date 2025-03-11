import React from "react";

const RegistrationTile = ({ onClick, heading, desc }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 m-3 h-[75px] flex items-center">
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="text-black font-medium text-sm ml-2">{heading}</p>
          <p className="text-gray-500 text-xs mt-1 ml-2 w-[56%] text-justify">
            {desc}
          </p>
        </div>
        <button
          className="w-[90px] h-[30px] border border-gray-400 rounded-full flex justify-center items-center text-black text-sm"
          onClick={onClick}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationTile;
