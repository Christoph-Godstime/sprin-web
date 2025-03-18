import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { PlaceholderImage } from "../constants/theme";

const FoodComponent = ({ item, onPress }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div
      className="bg-white p-2 rounded-2xl cursor-pointer w-[85%] min-w-[85%] sm:w-[340px] sm:min-w-[340px]"
      onClick={onPress}
    >
      <img
        src={isImageLoaded ? item.imageUrl[0] : PlaceholderImage}
        alt={item.title}
        className={`w-full h-32 object-cover rounded-lg ${
          isImageLoaded ? "object-cover" : "object-contain"
        }`}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(false)}
      />

      <div className="flex justify-between mt-2 space-x-[20px]">
        <p className="text-[11px] font-[400] truncate w-1/2">{item.title}</p>
        <p className="text-[11px] font-[400] truncate w-1/2 text-right">
          {item.restaurantName}
        </p>
      </div>

      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center">
          <FaClock className="text-black text-xs" />
          <p className="text-[11px] text-gray-600 ml-1">
            {item.time} - {Number(item.time) + 10} mins
          </p>
        </div>
        <p className="text-[12px] font-[500] text-primary">
          {item.price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          })}
        </p>
      </div>

      <div className="flex justify-between items-center">
        {item.ratingCount === 0 ? (
          <div className="flex items-baseline">
            <span className="text-primary text-lg">★</span>
            <span className="ml-1 text-black text-[12px]">5.0</span>
            <span className="ml-1 text-black text-[12px]">(0)</span>
          </div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-lg text-primary">★</span>
            <p className="ml-1 text-black text-[12px]">
              {item.rating?.toFixed(1)}
            </p>
            <p className="ml-1 text-black text-[12px]">({item.ratingCount})</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodComponent;
