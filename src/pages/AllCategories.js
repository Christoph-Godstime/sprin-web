import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryFoodComp from "../components/CategoryFoodComp";
import axios from "axios";
import { BaseUrl } from "../constants/theme";
import Loading from "../components/Loading";
import Header from "../components/Header";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const AllCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = location.state || {};
  const [food, setFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/foods/category/${categoryId}`
      );
      setFood(response.data);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [categoryId]);

  const renderCategoryFoodComp = (item) => (
    <CategoryFoodComp
      item={item}
      onClick={() => navigate("/food-nav", { state: { data: item } })}
    />
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[50px]">
        <Header text="Food Items" />
        <Loading />
      </div>
    );
  }

  if (food.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh)] overflow-y-auto bg-white ">
        <Header text="Food Items" />
        <div className="w-full max-w-xl py-[30px] flex flex-col items-center justify-center flex-1 px-[12px]">
          <p className="text-[16px] font-[500] text-gray-700">
            No Item In This Category...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-gray-100 items-center pb-[50px]">
      <ScrollToTopOnMount />
      <Header text="Food Items" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[15px] gap-y-[20px]">
          {food.map((item) => (
            <div key={item._id}>{renderCategoryFoodComp(item)}</div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default AllCategories;
