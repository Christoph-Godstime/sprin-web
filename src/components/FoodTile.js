import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const FoodTile = ({ item, onPress, showDetails, loadAddCart }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 mb-4 mr-3 relative w-[calc(50%-20px)]">
      <button onClick={showDetails} className="relative w-full">
        <img
          src={item.imageUrl[0]}
          alt={item.title}
          className="w-full h-24 object-cover rounded-lg"
        />
        {item?.isAvailable === false && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
            <span className="text-white text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </button>

      <div className="mt-2">
        <p className="text-sm font-medium px-1">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(item.price)}
        </p>
        <p className="text-xs text-gray-600 px-1 truncate w-[calc(50%-10px)]">
          {item.title}
        </p>
      </div>

      {loadAddCart?.[item._id] ? (
        <div className="absolute bottom-9 right-3 bg-gray-100 p-1 rounded-full">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent animate-spin rounded-full"></div>
        </div>
      ) : (
        <button
          onClick={onPress}
          className="absolute bottom-9 right-3 bg-gray-100 p-1 rounded-full"
        >
          <AiOutlinePlusCircle className="text-primary text-xl" />
        </button>
      )}
    </div>
  );
};

export default FoodTile;
