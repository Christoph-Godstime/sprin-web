import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import CategoryList from "../components/CategoryList";
import HomeHeader from "../components/HomeHeader";
import Heading from "../components/Heading";
import Divider from "../components/Divider";
import NearByRestaurants from "../components/NearByRestaurants";
import GroceryCategory from "../components/GroceryCategory";
import NewFoodList from "../components/NewFoodList";
import axios from "axios";
import HomeCategory from "../components/HomeCategory";
import { BaseUrl } from "../constants/theme";
import useFetchCategories from "../hooks/useCategoryHook";
import { CartCountContext } from "../context/CartCountContext";
import { NearByRestaurantsContext } from "../context/NearByRestaurants";
import { GroceryStoreCategoryContext } from "../context/GroceryStoreCategory";
import { TrySomethingNewContext } from "../context/TrySomethingNewContext";
import { FastestNearYouContext } from "../context/FastestNearYou";
import ReusableShimmer from "../components/Shimmers/ReusableShimmer";
import { DefaultAddressContext } from "../context/DefaultAddressContext";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import FastestNearYou from "../components/FastestNearYou";

const Home = () => {
  const navigate = useNavigate();

  const { login } = useContext(LoginContext);
  const { refetch: refetchCart } = useContext(CartCountContext);
  const { refetchDefaultAddress } = useContext(DefaultAddressContext);
  const { refetchGroceryStoreCategory } = useContext(
    GroceryStoreCategoryContext
  );
  const { refetchNearByRestaurants, loadNearByRestaurants } = useContext(
    NearByRestaurantsContext
  );
  const { refetchTrySomethingNew } = useContext(TrySomethingNewContext);
  const { refetchFastestNearYou } = useContext(FastestNearYouContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const restaurantShimmer = [1, 2, 3, 4, 5, 6, 7];

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedSlideInfo, setSelectedSlideInfo] = useState(null);
  const bottomSheetRef = React.useRef(null);

  const {
    refetch,

    isLoading: categoriesLoading,
  } = useFetchCategories();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/foods/category/${selectedCategory}`
      );

      setCategory(response.data);

      setIsLoading(false);
    } catch (error) {
      // setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, selectedSection]);

  useEffect(() => {
    refetchCart();
  }, []);

  const handleSubmit = async () => {
    // closeBottomSheet();
    if (!login) {
      toast.info("Please login to see your referral code.", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/login");
      return; // Early return to prevent further code execution
    }
    navigate("/referral");
  };

  return (
    <div className="flex flex-col h-dvh  bg-white items-center ">
      <ScrollToTopOnMount />
      <div className="flex flex-col bg-gray-100 w-full max-w-2xl pb-[100px]">
        <HomeHeader />

        <div>
          {/* {categoriesLoading ? (
            <div className="flex space-x-3 overflow-x-auto px-4 no-scrollbar py-[10px]">
              {[...Array(7)].map((_, index) => (
                <ReusableShimmer
                  key={index}
                  width={80}
                  height={80}
                  radius={16}
                />
              ))}
            </div>
          ) : ( */}
          <CategoryList
            setSelectedValue={setSelectedValue}
            setSelectedCategory={setSelectedCategory}
            setSelectedSection={setSelectedSection}
          />
          {/* )} */}

          {selectedCategory && selectedSection ? (
            <div className="pb-12">
              <Heading
                heading={`Browse ${selectedValue} Category`}
                onClick={() => {
                  navigate("/all-categories", {
                    state: { categoryId: selectedCategory },
                  });
                }}
              />
              <HomeCategory category={category} isLoading={isLoading} />
            </div>
          ) : (
            <div className="pb-12">
              <div className="mt-4">
                {/* <Carousel /> */}
                {loadNearByRestaurants && (
                  <div className="w-full">
                    <ReusableShimmer width="100%" height={200} radius={0} />
                  </div>
                )}
              </div>
              <Heading
                heading="Supermarket Categories"
                onClick={() => {
                  navigate("/supermarket");
                }}
              />
              <GroceryCategory />

              <Heading
                heading="Nearby Restaurants"
                onClick={() => {
                  navigate("/nearby-restaurants");
                }}
              />
              <NearByRestaurants />

              <Divider />

              <Heading
                heading="Try Something New 🧡"
                onClick={() => {
                  navigate("/new-foods");
                }}
              />
              <NewFoodList />

              <Divider />

              <Heading
                heading={"Fastest Near you 🚀"}
                onClick={() => {
                  navigate("/fastest");
                }}
              />
              <FastestNearYou />
            </div>
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Home;
