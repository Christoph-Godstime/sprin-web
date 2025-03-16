import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GroceryStoreCategoryContext } from "../context/GroceryStoreCategory";
import ReusableShimmer from "./Shimmers/ReusableShimmer";
import { PlaceholderImage } from "../constants/theme";

const GroceryCategory = () => {
  const navigate = useNavigate();
  const { groceryStoreCategory, loadGroceryStoreCategory } = useContext(
    GroceryStoreCategoryContext
  );

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shuffledCategories, setShuffledCategories] = useState([]);

  const restaurantShimmer = [1, 2, 3, 4, 5, 6, 7];
  const backgroundColors = ["#E0E0E0"];

  useEffect(() => {
    if (groceryStoreCategory && groceryStoreCategory.length > 0) {
      // Shuffle categories and pick 10 random ones
      const shuffled = [...groceryStoreCategory].sort(
        () => Math.random() - 0.5
      );
      setShuffledCategories(shuffled.slice(0, 10));
    }
  }, [groceryStoreCategory]); // Runs when groceryStoreCategory updates

  const handleCategory = (categoryId) => {
    navigate("/sub-categories", { state: { categoryId } });
  };

  if (loadGroceryStoreCategory) {
    return (
      <div className="mb-2">
        <div className="flex space-x-[12px] overflow-x-auto mt-1 no-scrollbar px-[12px]">
          {restaurantShimmer.map((_, index) => (
            <div key={index}>
              <ReusableShimmer width={110} height={136} radius={10} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (groceryStoreCategory && groceryStoreCategory.length === 0) {
    return (
      <div className="flex justify-center items-center h-[140px] px-[12px]">
        <p className="text-[16px] font-[400]">No Supermarket Category...</p>
      </div>
    );
  }

  return (
    <div className="mb-2">
      <div className="flex space-x-[12px] overflow-x-auto mt-1 px-[12px] no-scrollbar">
        {shuffledCategories.map((item, index) => (
          <button
            key={item._id}
            className="flex flex-col items-center justify-center min-w-[110px] w-[110px] bg-gray-200 rounded-lg overflow-hidden p-2"
            style={{
              backgroundColor:
                backgroundColors[index % backgroundColors.length],
            }}
            onClick={() => handleCategory(item._id)}
          >
            <img
              src={isImageLoaded ? item.imageUrl : PlaceholderImage}
              alt={item.title}
              className="w-full h-20 mb-2 object-contain"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(false)}
            />
            <p className="text-[11px] leading-3 text-center text-black px-2">
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroceryCategory;
