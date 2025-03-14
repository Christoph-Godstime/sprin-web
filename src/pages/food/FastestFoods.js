import React, { useContext } from "react";
import { FastestNearYouContext } from "../../context/FastestNearYou";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";
import { useNavigate } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import Header from "../../components/Header";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";

const FastestFoods = () => {
  const { fastestNearYou, loadFastestNearYou } = useContext(
    FastestNearYouContext
  );

  const navigate = useNavigate();

  if (loadFastestNearYou) {
    return (
      <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-gray-100 items-center pb-[50px]">
        <ScrollToTopOnMount />
        <Header text="All Fastest Foods" />
        <div className="w-full max-w-2xl pt-[20px] px-[12px]">
          <HorizontalShimmer
            width={"calc(100%)"}
            height={"100px"}
            radius={10}
            paddingTop={10}
            paddingLeft={15}
            paddingRight={15}
          />
        </div>
      </div>
    );
  }

  if (fastestNearYou && fastestNearYou.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh)] overflow-y-auto bg-white ">
        <Header text="All Fastest Foods" />
        <div className="w-full max-w-xl py-[30px] flex flex-col items-center justify-center flex-1 px-[12px]">
          <p className="text-[16px] font-[500] text-gray-700">
            No Fastest Near You In This Location...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-gray-100 items-center pb-[50px]">
      <ScrollToTopOnMount />
      <Header text="All Fastest Foods" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        {fastestNearYou.map((item) => (
          <div
            key={item._id}
            className="flex items-center p-[10px] mb-[20px] cursor-pointer bg-white relative rounded-[8px]"
            onClick={() => navigate("/food-nav", { state: { item: item } })}
          >
            <img
              src={item.imageUrl[0]}
              alt={item.title}
              className="w-32 h-20 rounded-[8px] object-cover"
            />
            <div className="flex-1 px-3 mt-7">
              <h3 className="text-[12px] font-bold line-clamp-1 w-[90%]">
                {item.title}
              </h3>
              <p className="text-[10px] text-gray-500 line-clamp-2 w-3/4">
                {item.description}
              </p>
              <p className="text-[12px] font-bold text-gray-600 absolute bottom-[10px] right-[10px]">
                {item.price.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                })}
              </p>
            </div>
            <div
              className={`absolute top-[10px] right-[10px] px-3 py-1 rounded-full flex items-center text-white  ${
                item.isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <MdAccessTime size={14} />
              <span className="ml-2 font-bold text-[10px]">
                {item.time} - {Number(item.time) + 10} mins
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastestFoods;
