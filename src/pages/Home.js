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
import { Dialog } from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import refer from "../assets/refer.png";
import freedelivery from "../assets/freedelivery.png";
import Footer from "../components/Footer";

const carouselData = [
  {
    id: 1,
    image: refer,
    content: (
      <div className="w-full px-5 py-5">
        <h2 className="text-xl font-semibold mt-2">
          🎉 Free Delivery on First Order and Beyond 🚴‍♂️📦
        </h2>
        <p className="mt-5">
          Get ready for amazing savings with our exclusive free delivery offers!
        </p>
        <ul className="mt-5 space-y-2">
          <li>
            🥳 <strong>First two orders</strong>: Completely free delivery as a
            welcome gift.
          </li>
          <li>
            🔁 <strong>Your 11th and 12th order</strong>: Enjoy free delivery as
            a loyalty reward.
          </li>
          <li>
            🚀 <strong>Cycle continues</strong>: Get free delivery on your 21st
            and 22nd order, 31st and 32nd order, and so on.
          </li>
        </ul>
        <p className="mt-5 text-lg">
          🛒 Start ordering now and enjoy these incredible benefits! 🍔🍜🍕
        </p>
      </div>
    ),
  },
  {
    id: 2,
    image: freedelivery,
    content: (
      <div className="w-full px-5 py-5">
        <h2 className="text-xl font-semibold mt-2">
          🎁 Share the Joy, Earn Rewards! 💸
        </h2>
        <p className="mt-5">
          Share your referral code and unlock amazing rewards for both you and
          your friends!
        </p>
        <ul className="mt-5 space-y-2">
          <li>
            💵 <strong>Earn ₦500</strong>: Get ₦500 credited to your wallet
            every time a friend uses your referral code on their{" "}
            <strong>first order</strong>.
          </li>
          <li>
            🎉 <strong>Discount for your friends</strong>: Your friend enjoys a{" "}
            <strong>₦500 discount</strong> on their first order too!
          </li>
          <li>
            🔗 <strong>Unlimited referrals</strong>: Keep sharing your code and
            keep earning!
          </li>
        </ul>
        <p className="mt-5 text-lg">
          🌟 Spread the word, share the love, and watch your wallet grow! Start
          referring today! 📲
        </p>
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-5 hover:bg-blue-600">
          REFERRAL CODE
        </button>
      </div>
    ),
  },
];

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

  const [selectedSlide, setSelectedSlide] = useState(null);
  const modalRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

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
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-gray-100 items-center relative">
      <ScrollToTopOnMount />
      <div className="flex flex-col bg-gray-100 w-full max-w-2xl ">
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
              <div className="mt-[10px]">
                <div className="overflow-hidden">
                  <Slider {...settings}>
                    {carouselData.map((item) => (
                      <div
                        key={item.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedSlide(item)}
                      >
                        <img
                          src={item.image}
                          alt="Slide"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
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

              <div className="-mb-[30px] mt-[30px] pb-[50px] bg-secondary">
                <Footer />
              </div>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={!!selectedSlide}
        onClose={() => setSelectedSlide(null)}
        initialFocus={modalRef}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full z-50">
          {selectedSlide && (
            <>
              <button
                onClick={() => setSelectedSlide(null)}
                className="absolute top-2 right-2 text-red-500"
              >
                <IoCloseOutline size={30} />
              </button>
              {selectedSlide.content}
            </>
          )}
        </div>
      </Dialog>

      <BottomNavBar />
    </div>
  );
};

export default Home;
