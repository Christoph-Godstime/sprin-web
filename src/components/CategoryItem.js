import React, { useState } from "react";
import { PlaceholderImage } from "../constants/theme";

const CategoryItem = ({ category, selected }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center justify-center p-2 w-[90px] h-[90px] rounded-[15px] border border-transparent
        ${category.value === selected ? "bg-orange-200" : "bg-transparent"}
        shadow-sm
      `}
    >
      <img
        src={isImageLoaded ? category.imageUrl : PlaceholderImage}
        alt={category.title}
        className={`w-[55px] h-[55px] object-contain `}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(false)}
      />
      <p className="text-[12px] font-normal text-center">{category.title}</p>
    </div>
  );
};

export default CategoryItem;
