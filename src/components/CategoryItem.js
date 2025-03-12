import React, { useState } from "react";
import { PlaceholderImage } from "../constants/theme";

const CategoryItem = ({ category, selected }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center justify-center p-[8px] w-[80px] min-w-[80px]  rounded-[15px] border border-transparent shadow-lg overflow-hidden
        ${category.value === selected ? "bg-orange-200" : "bg-white"}
        
      `}
    >
      <img
        src={isImageLoaded ? category.imageUrl : PlaceholderImage}
        alt={category.title}
        className={`w-full h-[55px] object-contain `}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(false)}
      />
      <p className="text-[12px] font-normal text-center leading-[14px]">
        {category.title} dsd
      </p>
    </div>
  );
};

export default CategoryItem;
