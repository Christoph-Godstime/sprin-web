import React, { useState } from "react";
import { BsGeoAlt, BsTrash } from "react-icons/bs";

const AddressTile = ({ onClick, item, onDelete }) => {
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const handleSwitchToggle = () => {
    setIsDefaultAddress(!isDefaultAddress);
  };

  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-300">
        <div className="flex items-start w-4/5 ">
          <div className="w-fit">
            <BsGeoAlt className="text-primary mt-1 text-[20px]" />
          </div>
          <div className="ml-3">
            <p
              className={`text-[12px] md:text-[14px] ${
                item.default ? "text-primary" : "text-gray-700"
              }`}
            >
              {item.addressLine1}
            </p>
            <p
              className={`text-[12px] md:text-[14px] ${
                item.default ? "text-primary" : "text-gray-700"
              }`}
            >
              {item.postalCode}
            </p>
          </div>
        </div>
        <button
          className="bg-red-100 w-10 h-10 flex justify-center items-center rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <BsTrash className="text-red-500 text-base" />
        </button>
      </div>
    </div>
  );
};

export default AddressTile;
