import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
import freedelivery from "../assets/freedelivery.jpg";
import Logo from "../components/Logo";

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

  const handleReferral = async () => {
    setSelectedSlide(null);
    if (!login) {
      toast.info("Please login to see your referral code.", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/login");
      return;
    }
    navigate("/referral");
  };

  const carouselData = [
    {
      id: 1,
      image: freedelivery,
      content: (
        <div className="w-full px-5 py-5">
          <h2 className="text-[15px] font-semibold mt-2">
            🎉 Free Delivery on Every 10th Order Milestone! 🚴‍♂️📦
          </h2>
          <p className="mt-5 text-[13px]">
            Enjoy exclusive free delivery when you hit milestone orders — only
            for orders of ₦5,000 and above.
          </p>
          <ul className="mt-5 space-y-2 text-[12px]">
            <li>
              🥳 <strong>1st Order</strong>: Get your first delivery completely
              free!
            </li>
            <li>
              🔁 <strong>11th, 21st, 31st orders, and so on</strong>: Enjoy free
              delivery as a loyalty reward.
            </li>
            <li>
              💰 <strong>Condition</strong>: Free delivery applies only to
              orders above ₦5,000.
            </li>
          </ul>
          <p className="mt-5 text-[13px]">
            🛒 Start ordering and hit those milestones for more free deliveries!
            🍔🍜🍕
          </p>
        </div>
      ),
    },
    {
      id: 2,
      image: refer,
      content: (
        <div className="w-full px-5 py-5">
          <h2 className="text-[15px] font-semibold mt-2">
            🎁 Share the Joy, Earn Rewards! 💸
          </h2>
          <p className="mt-5 text-[13px]">
            Invite your friends and earn rewards when they order — valid for
            first orders above ₦5,000!
          </p>
          <ul className="mt-5 space-y-2 text-[12px]">
            <li>
              💵 <strong>Earn ₦500</strong>: Get ₦500 credited to your wallet
              when a friend uses your referral code on their{" "}
              <strong>first order of ₦5,000 or more</strong>.
            </li>
            <li>
              🎉 <strong>₦500 Discount for Friends</strong>: They also get ₦500
              off their first qualifying order!
            </li>
            <li>
              🔗 <strong>Unlimited Referrals</strong>: Keep sharing and keep
              earning, no limits!
            </li>
          </ul>
          <p className="mt-5 text-[13px]">
            🌟 Spread the word, share the love, and grow your wallet! Start
            referring today! 📲
          </p>
          <button
            onClick={() => handleReferral()}
            className="w-full bg-primary text-white py-3 rounded-lg mt-5 text-[14px] hover:bg-orange-600"
          >
            REFERRAL CODE
          </button>
        </div>
      ),
    },
  ];

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
                <footer className="py-[50px] px-[3%] lg:px-[5%] bg-secondary lg:flex gap-[100px] items-center">
                  <div className="mb-[30px] lg:mb-[0px]">
                    <Logo width="w-[70px]" text=" text-[18px]" />
                    <h4 className="mt-[30px]  text-[10px] md:text-[12px] font-[300] text-gray-400 hidden lg:block whitespace-nowrap">
                      © 2025 Sprin Technologies Limited. All rights reserved
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-3  w-full">
                    <div>
                      <h4 className=" text-[16px] text-gray-400 mb-[25px]">
                        Company
                      </h4>
                      {/* <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/customers" activeStyle={{ color: "#f97316" }}>
                Customers
              </NavLink>
            </h3> */}

                      <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <NavLink
                          exact
                          to="/vendors"
                          activeStyle={{ color: "#f97316" }}
                        >
                          Vendors
                        </NavLink>
                      </h3>

                      <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <NavLink
                          exact
                          to="/riders"
                          activeStyle={{ color: "#f97316" }}
                        >
                          Riders
                        </NavLink>
                      </h3>

                      <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <NavLink
                          exact
                          to="/contact"
                          activeStyle={{ color: "#f97316" }}
                        >
                          Contact
                        </NavLink>
                      </h3>

                      {/* <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                About
              </h3> */}
                    </div>

                    <div>
                      <h4 className=" text-[16px] text-gray-400 mb-[25px]">
                        Support
                      </h4>

                      <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <NavLink
                          exact
                          to="/faqs"
                          activeStyle={{ color: "#f97316" }}
                        >
                          FAQs
                        </NavLink>
                      </h3>

                      <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <NavLink
                          exact
                          to="/terms"
                          activeStyle={{ color: "#f97316" }}
                        >
                          Terms of services
                        </NavLink>
                      </h3>

                      {/* <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                Cookies Policy
              </h3> */}

                      <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <NavLink
                          exact
                          to="/privacy"
                          activeStyle={{ color: "#f97316" }}
                        >
                          Privacy Policy
                        </NavLink>
                      </h3>
                    </div>

                    <div>
                      <h4 className=" text-[16px] text-gray-400 mb-[25px]">
                        Follow Us
                      </h4>

                      <h3 className="text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <a
                          href="https://www.instagram.com/sprin_app?igsh=dGtxaHQ2b3Nqam44"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          Instagram
                        </a>
                      </h3>

                      <h3 className="text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <a
                          href="https://x.com/Sprin_app?t=yAtn632_dh6tnBGiD-PIDQ&s=09"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          X (Twitter)
                        </a>
                      </h3>

                      <h3 className="text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <a
                          href="https://www.tiktok.com/@sprin_app?_t=ZM-8xquPKR07Us&_r=1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          TikTok
                        </a>
                      </h3>

                      <h3 className="text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                        <a
                          href="https://www.facebook.com/profile.php?id=61578005706580&mibextid=ZbWKwL"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          Facebook
                        </a>
                      </h3>
                    </div>
                  </div>
                  <h4 className="mt-[30px]  text-[10px] md:text-[12px] font-[300] text-gray-400  lg:hidden">
                    © 2025 Sprin Technologies Limited. All rights reserved
                  </h4>
                </footer>
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
