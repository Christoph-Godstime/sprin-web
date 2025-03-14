import { useEffect, useState } from "react";
import useFetchCategories from "../../hooks/useCategoryHook";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { useNavigate } from "react-router-dom";

const backgroundColors = [
  "#F5A599",
  "#FFF792",
  "#DAFFAA",
  "#B9FFEF",
  "#D3F4FA",
  "#C3DBF9",
  "#FCCC4A",
  "#E2C4FB",
  "#FDD3E1",
  "#EBD3BB",
  "#EDEFF1",
];

const MoreFoods = ({ navigation }) => {
  const navigate = useNavigate();

  const {
    categories,
    allCategories,
    isLoadingAll,
    allCategoriesError,
    refetch,
  } = useFetchCategories();

  const handleSelectCategory = (item) => {
    navigate("/all-categories", { state: { categoryId: item._id } });
  };

  if (isLoadingAll) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center pb-[50px]">
        <Header text="Explore Food Categries" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white items-center pb-[50px]">
      <ScrollToTopOnMount />
      <Header text="Explore Food Categries" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {allCategories.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col items-center p-4 rounded-lg cursor-pointer"
              style={{
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
              }}
              onClick={() => handleSelectCategory(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-20 mb-2 object-contain"
              />
              <p className="text-[11px] text-gray-600 text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreFoods;
