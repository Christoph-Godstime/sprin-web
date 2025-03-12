import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FoodComponent from "./FoodComponent";
import ReusableShimmer from "./Shimmers/ReusableShimmer";
import { TrySomethingNewContext } from "../context/TrySomethingNewContext";

const NewFoodList = () => {
  const navigate = useNavigate();
  const restaurantShimmer = [1, 2, 3, 4];

  const { trySomethingNew, loadTrySomethingNew } = useContext(
    TrySomethingNewContext
  );

  if (loadTrySomethingNew) {
    return (
      <div className=" mb-[12px]">
        <div className="flex space-x-[12px] overflow-x-auto mt-1 no-scrollbar px-[12px]">
          {restaurantShimmer.map((item) => (
            <div key={item} className="">
              <ReusableShimmer width={320} height={224} radius={16} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (trySomethingNew && trySomethingNew.length === 0) {
    return (
      <div className="flex justify-center items-center h-[234px] px-[12px]">
        <p className="text-[16px] font-[400]">
          No New Food Items In This Location...
        </p>
      </div>
    );
  }

  return (
    <div className="mb-2">
      <div className="flex space-x-[12px] overflow-x-auto mt-1 px-[12px] no-scrollbar">
        {trySomethingNew?.slice(0, 20).map((item) => (
          <FoodComponent
            key={item._id}
            item={item}
            onPress={() => navigate("/food-nav", { state: item })}
          />
        ))}
      </div>
    </div>
  );
};

export default NewFoodList;
