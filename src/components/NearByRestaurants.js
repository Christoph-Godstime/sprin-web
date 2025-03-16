import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StoreComponent from "./StoreComponent";
import { NearByRestaurantsContext } from "../context/NearByRestaurants";
import ReusableShimmer from "./Shimmers/ReusableShimmer";
import { RestaurantContext } from "../context/RestaurantContext";

const NearByRestaurants = () => {
  const navigate = useNavigate();

  const {
    nearByRestaurants,
    loadNearByRestaurants,
    restaurantError,
    refetchNearByRestaurants,
  } = useContext(NearByRestaurantsContext);
  const { restaurantObj, setRestaurant } = useContext(RestaurantContext);
  const restaurantShimmer = [1, 2, 3, 4];

  if (loadNearByRestaurants) {
    return (
      <div className=" mb-[12px]">
        <div className="flex space-x-[12px] overflow-x-auto mt-1 no-scrollbar px-[12px]">
          {restaurantShimmer.map((item) => (
            <div key={item} className="">
              <ReusableShimmer width={350} height={224} radius={16} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (nearByRestaurants && nearByRestaurants.length === 0) {
    return (
      <div className="flex justify-center items-center h-[234px] px-[12px]">
        <p className="text-[16px] font-[400]">
          No Restaurant In This Location...
        </p>
      </div>
    );
  }

  return (
    <div className="mb-2">
      <div className="flex space-x-[12px] overflow-x-auto mt-1 px-[12px] no-scrollbar">
        {nearByRestaurants?.slice(0, 20).map((item) => (
          <StoreComponent
            key={item.id}
            item={item}
            onPress={() => {
              navigate("/restaurant", { state: { restaurant: item } });
              setRestaurant(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NearByRestaurants;
