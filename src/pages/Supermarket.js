import React, { useContext, useState, useCallback, useEffect } from "react";
import BottomNavBar from "../components/BottomNavBar";
import { useNavigate } from "react-router-dom";
import { GroceryStoreCategoryContext } from "../context/GroceryStoreCategory";
import { format } from "date-fns";
import ReusableShimmer from "../components/Shimmers/ReusableShimmer";
import GroceryTile from "../components/GroceryTile";
import { LoginContext } from "../context/LoginContext";
import { FetchCartDetailsContext } from "../context/FetchCartDetailsContext";
import CartButton from "../components/CartButton";
import axios from "axios";
import { BaseUrl, PlaceholderImage } from "../constants/theme";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

const Supermarket = () => {
  const navigate = useNavigate();
  const { refetchCartDetails } = useContext(FetchCartDetailsContext);
  const { groceryStoreCategory } = useContext(GroceryStoreCategoryContext);

  const { login, setLogin } = useContext(LoginContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [coords, setCoords] = useState([6.108269691467286, 5.788121544177521]);

  const formattedOrderDateTime = data?.storeDetails?.openingTime
    ? format(new Date(data.storeDetails.openingTime), "h:mm a")
    : "...";

  const backgroundColors = ["#E0E0E0"];

  const fetchCategoriesWithGroceries = async () => {
    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    try {
      let response;
      if (lat === null && lng === null) {
        response = await axios.get(
          `${BaseUrl}/api/grocery-category/all-categories-with-groceries?lat=${coords[1]}&lng=${coords[0]}`
        );
      } else {
        response = await axios.get(
          `${BaseUrl}/api/grocery-category/all-categories-with-groceries?lat=${lat}&lng=${lng}`
        );
      }
      setData(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 3000,
      });
      console.log("Error: ", error?.response?.data?.message);

      if (error.response?.status === 404) {
        setError("No Sprin supermarket in your area");
      } else {
        setError("Error fetching subcategories");
      }
      setError("Error fetching subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data) {
      setLoading(true);
      fetchCategoriesWithGroceries();
    }
  }, [data]);

  useEffect(() => {
    if (login) {
      refetchCartDetails();
    }
  }, [login]);

  const handleCategory = (item) => {
    navigate("/sub-categories", { state: { categoryId: item } });
  };

  const handleSearch = () => {
    navigate("/search-grocery", {
      state: { storeId: data?.storeDetails?._id },
    });
  };

  const renderItem = (item, index) => (
    <div
      key={item._id}
      className={`p-2 rounded-lg flex flex-col items-center cursor-pointer bg-${
        index % 2 === 0 ? "gray-200" : "gray-200"
      }`}
      onClick={() => handleCategory(item._id)}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-24 h-24 object-contain"
      />
      <p className="text-center mt-2  text-[10px] leading-4">{item.title}</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white items-center pb-[150px] relative">
      <ScrollToTopOnMount />
      <div className="w-full max-w-2xl relative">
        {data?.storeDetails?.isActive === false && (
          <div className=" bg-black bg-opacity-50 fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[260px] z-40 rounded-b-[15px] flex justify-center items-center">
            <div className="flex flex-col items-center">
              <p className="text-white  text-[22px] font-[500]">Closed</p>
              <p className="text-white  text-[16px] font-[400] mt-[10px]">
                Opens at {formattedOrderDateTime}
              </p>
            </div>
          </div>
        )}
        {/* Background Image */}
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[320px] z-0">
          <img
            src={data?.storeDetails?.imageUrl || PlaceholderImage}
            alt="Store"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Fixed Button - Highest Z-Index */}
        <div className="fixed top-[30px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[50px] z-50">
          <button
            onClick={() => navigate(-1)}
            className=" ml-[12px] p-2 rounded-full bg-[#1e1b4b80]"
          >
            <BsArrowLeft size={20} className="text-white" />
          </button>
        </div>

        <div className="fixed top-[125px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[50px] z-50">
          <div
            className="p-1 border border-gray-300 rounded-[15px] shadow-lg w-fit ml-[12px]"
            style={{
              boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            <img
              src={data?.storeDetails?.logoUrl}
              alt="Store Logo"
              className="w-[60px] h-[60px] rounded-[15px] object-cover"
            />
          </div>
        </div>

        <CartButton />

        {/* Content Wrapper with z-30 to stay above the image */}
        <div className="relative z-30 bg-white mt-[160px] rounded-tr-[50px]">
          <div className="pt-[50px] px-4 w-full">
            <h1 className=" text-[22px] font-[700]">SPRIN Market</h1>
            {data?.storeDetails?.isAvailable === false &&
              data?.storeDetails?.isActive === true && (
                <div className="bg-gray-300 p-2 rounded-md text-center mt-4">
                  Delivery temporarily unavailable
                </div>
              )}
            <button
              className="bg-gray-300 mt-[24px] flex items-center justify-center w-full py-2 rounded-full"
              onClick={handleSearch}
            >
              <BsSearch size={16} className="text-[#808080]" />
              <span className="ml-[16px] text-[#36454F]  text-[12px]">
                What can we get you?
              </span>
            </button>
            <h2 className=" text-[16px] font-[600] mt-6">Shop by category</h2>
            <div className="grid grid-cols-3 gap-x-[16px] mt-4 gap-y-[25px]">
              {loading ? (
                <ReusableShimmer count={6} />
              ) : (
                groceryStoreCategory
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map(renderItem)
              )}
            </div>
          </div>
          <div className="mt-[60px] w-full">
            {data?.data
              ?.filter((category) => category.groceries.length > 0)
              .map((category) => (
                <div key={category._id} className="mb-6">
                  <div className="flex justify-between items-center px-[12px]">
                    <h3 className=" text-[16px] font-bold">{category.title}</h3>
                    <button
                      onClick={() => handleCategory(category._id)}
                      className="p-[5px] rounded-full bg-[#1e1b4b80]"
                    >
                      <BsArrowRight size={18} className="text-white" />
                    </button>
                  </div>

                  {/* Flex container for horizontal scroll + "See all" button */}
                  <div className="flex overflow-x-auto mt-4 no-scrollbar pl-[12px] items-center">
                    {category.groceries.length > 0 ? (
                      <>
                        {category.groceries.slice(0, 10).map((item, index) => (
                          <GroceryTile
                            key={item._id}
                            item={item}
                            index={index}
                            width="w-[150px]"
                          />
                        ))}

                        {/* "See all" button at the end */}
                        {category.groceries.length >= 10 && (
                          <button
                            onClick={() => handleCategory(category._id)}
                            className="ml-4 text-primary font-semibold whitespace-nowrap"
                          >
                            See all
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500 pr-[12px]">
                        No groceries available
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Supermarket;
