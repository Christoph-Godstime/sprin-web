import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryFoodComp from "./CategoryFoodComp";
import ReusableShimmer from "./Shimmers/ReusableShimmer";

const HomeCategory = ({ category, isLoading }) => {
  const navigate = useNavigate();

  const renderCategoryFoodComp = (item) => (
    <CategoryFoodComp
      item={item}
      onClick={() => navigate("/food-nav", { state: item })}
    />
  );

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-around px-4 pt-2">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="mb-3">
            <ReusableShimmer
              width={"calc(100% - 30px)"}
              height={"15vh"}
              radius={10}
            />
          </div>
        ))}
      </div>
    );
  }

  if (category && category.length === 0) {
    return (
      <div className="flex justify-center items-center h-1/2">
        <p className="text-lg font-medium">No Item In This Category...</p>
      </div>
    );
  }

  return (
    <div className="ml-3 mb-2">
      <div className="mt-2 space-y-4">
        {category.map((item) => (
          <div key={item._id}>{renderCategoryFoodComp(item)}</div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
