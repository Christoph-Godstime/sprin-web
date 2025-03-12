import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";

const Rate = ({
  rating,
  size,
  maxStars,
  setRating,
  bordered,
  color,
  editable,
}) => {
  const handleRatingChange = (newRating) => {
    if (editable && setRating) {
      setRating(newRating);
    }
  };

  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleRatingChange(index + 1)}
          disabled={!editable}
          className={`text-${index < rating ? color : "gray-400"} text-${size}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const CategoryFoodComp = ({ item, onClick }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-3 rounded-lg w-full max-w-2xl mb-5 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={item.imageUrl[0]}
        alt={item.title}
        className="w-full h-40 rounded-md object-cover"
      />

      <div className="flex justify-between w-full mt-2">
        <p className="text-base font-semibold truncate w-1/2">{item.title}</p>
        <p className="text-base font-semibold truncate w-1/2 text-right">
          {item.restaurantName}
        </p>
      </div>

      <div className="flex justify-between w-full items-center mt-1">
        <div className="flex items-center">
          <FaClock size={14} className="text-black" />
          <p className="text-sm text-gray-500 ml-2">
            {item.time} - {Number(item.time) + 10} mins
          </p>
        </div>
        <p className="text-sm text-primary font-semibold text-right">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(item.price)}
        </p>
      </div>

      <div className="flex justify-between w-full items-center mt-1">
        <div className="flex items-baseline">
          <span className="text-lg text-primary">★</span>
          <p className="ml-2 text-sm font-medium text-black">
            {item.ratingCount === 0 ? "5.0" : item.rating?.toFixed(1)}
          </p>
          <p className="ml-2 text-sm font-medium text-black">
            ({item.ratingCount})
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryFoodComp;
