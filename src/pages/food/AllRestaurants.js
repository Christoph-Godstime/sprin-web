import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";
import { RestaurantContext } from "../../context/RestaurantContext";
import { NearByRestaurantsContext } from "../../context/NearByRestaurants";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import Header from "../../components/Header";

const AllRestaurants = () => {
  const navigate = useNavigate();
  const { setRestaurant } = useContext(RestaurantContext);
  const { nearByRestaurants, loadNearByRestaurants } = useContext(
    NearByRestaurantsContext
  );

  if (loadNearByRestaurants) {
    return (
      <div className="flex flex-col h-dvh bg-gray-100 items-center pb-[50px]">
        <ScrollToTopOnMount />
        <Header text="All Restaurants" />
        <div className="w-full max-w-2xl pt-[20px] px-[12px]">
          <HorizontalShimmer
            width={"calc(100%)"}
            height={"122px"}
            radius={10}
            paddingTop={10}
            paddingLeft={15}
            paddingRight={15}
          />
        </div>
      </div>
    );
  }

  if (!nearByRestaurants || nearByRestaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh bg-white ">
        <Header text="All Restaurants" />
        <div className="w-full max-w-xl py-[30px] flex flex-col items-center justify-center flex-1 px-[12px]">
          <p className="text-[16px] font-[500] text-gray-700">
            No Restaurant In This Location...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh bg-gray-100 items-center pb-[50px]">
      <ScrollToTopOnMount />
      <Header text="All Restaurants" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        {nearByRestaurants.map((item) => (
          <div
            key={item._id}
            className="flex items-center bg-white rounded-lg p-[12px] mb-4 cursor-pointer shadow-md relative"
            onClick={() => {
              navigate("/restaurant", { state: { item: item } });
              setRestaurant(item);
            }}
          >
            <img
              src={item.logoUrl}
              alt={item.title}
              className="w-[90px] h-[90px] rounded-full object-cover"
            />
            <div className="flex flex-col ml-4 flex-1">
              <h3 className="text-[12px] font-bold">{item.title}</h3>
              <p className="text-[10px] text-gray-500 w-4/5 line-clamp-2">
                {item.coords.address}
              </p>
              <span className="text-sm font-bold text-gray-600 absolute right-6 top-2">
                {item.time}
              </span>
            </div>
            <div
              className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-white font-bold text-[10px] ${
                item.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {item.isActive ? "OPEN" : "CLOSED"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
