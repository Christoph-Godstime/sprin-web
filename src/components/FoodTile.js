import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { PlaceholderImage } from "../constants/theme";

const FoodTile = ({ item, onPress, showDetails, loadAddCart }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div className="bg-orange-100 rounded-[12px] p-3 relative w-full">
      <button onClick={showDetails} className="relative w-full">
        <img
          src={isImageLoaded ? item.imageUrl[0] : PlaceholderImage}
          alt={item.title}
          className={`w-full h-24  rounded-lg ${
            isImageLoaded ? "object-cover" : "object-contain"
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}
        />
        {item?.isAvailable === false && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
            <span className="text-white text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </button>
      <div className="mt-[2px]">
        <p className="text-[13px] font-medium px-1">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(item.price)}
        </p>
        <p className="text-[12px] text-gray-600 px-1 line-clamp-1">
          {item.title}
        </p>
      </div>{" "}
      <div className="absolute right-[8px] bottom-[55px] w-[35px] h-[35px] rounded-full bg-orange-100 flex justify-center items-center">
        {loadAddCart?.[item._id] ? (
          <div className="w-[20px] h-[20px] border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <button onClick={onPress} className="  text-primary">
            <AiFillPlusCircle size={26} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodTile;
