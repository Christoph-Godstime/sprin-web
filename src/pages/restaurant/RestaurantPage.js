import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RestComponent from "../../components/RestComponent";
import GoogleApiServices from "../../hooks/GoogleApiServices";
import { RestaurantContext } from "../../context/RestaurantContext";
import { LoginContext } from "../../context/LoginContext";
import { format } from "date-fns";
import { FiPlusCircle } from "react-icons/fi";
import { FaShare } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

const RestaurantPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageRef = useRef(null);

  const { restaurant } = location.state || {};

  const [distanceTime, setDistanceTime] = useState({});
  const [apiCaller, setApiCaller] = useState(false);
  const [loading, setLoading] = useState(true);
  const { login, setLogin } = useContext(LoginContext);

  const [tokenVal, setTokenVal] = useState(null);

  const { restaurantObj, setRestaurant } = useContext(RestaurantContext);

  const formattedOrderDateTime = format(
    new Date(restaurant?.openingTime),
    "h:mm a"
  );

  const roundUpToNearestTen = (value) => {
    return Math.ceil(value / 10) * 10;
  };

  // Ensure finalPrice is never below 500
  const originalDeliveryFee = Math.max(distanceTime.finalPrice || 0, 500);

  // Calculate discounted fee (85% of originalDeliveryFee)
  const discountDeliveryFee = roundUpToNearestTen(originalDeliveryFee * 0.85);

  const getUserdata = async () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      console.log("You must login ");
      setTokenVal(null);
      return;
    } else {
      setTokenVal(token);
    }
  };

  useEffect(() => {
    calculateDistanceAndTime();
    getUserdata();
    setRestaurant(restaurant);
  }, [apiCaller]);

  const calculateDistanceAndTime = async () => {
    try {
      const lat = localStorage.getItem("latitude");
      const long = localStorage.getItem("longitude");

      if (
        lat &&
        long &&
        restaurant?.coords?.latitude &&
        restaurant?.coords?.longitude
      ) {
        const result = await GoogleApiServices.calculateDistanceAndTime(
          lat,
          long,
          restaurant.coords.latitude,
          restaurant.coords.longitude
        );

        if (result) {
          setDistanceTime(result);
          setApiCaller(true);
        }
      }
    } catch (error) {
      console.error(
        "Error retrieving coordinates or calculating distance:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const extractNumbers = (inputStr) => {
    if (typeof inputStr !== "string") {
      return [];
    }
    const matched = inputStr.match(/\d+/g);
    return matched ? matched.map((num) => parseInt(num, 10)) : [];
  };

  const duration = distanceTime.duration;

  // Convert duration to a number if it's a string or other type
  const durationInMinutes =
    typeof duration === "number" ? duration : parseFloat(duration);

  // Multiply the duration by 3 and add "mins" text
  const totalMins = isNaN(durationInMinutes)
    ? ""
    : durationInMinutes * 2 + " mins";

  const handleShare = async () => {
    try {
      const canvas = await html2canvas(pageRef.current, { useCORS: true });
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "order-details.png", {
          type: "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Order Details",
            text: "Check out this order!",
          });
        } else {
          toast.info("Sharing is not supported on this device.", {
            position: "top-center",
          });
        }
      }, "image/png");
    } catch (error) {
      console.error("Error sharing the page:", error);
      toast.error("Failed to share the page.", {
        position: "top-center",
      });
    }
  };

  const Rate = ({ rating, size, maxStars, setRating, color, editable }) => {
    const handleRatingChange = (newRating) => {
      if (editable && setRating) {
        setRating(newRating);
      }
    };

    return (
      <div className="flex">
        {[...Array(maxStars)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleRatingChange(index + 1)}
            disabled={!editable}
            className={`text-${size} ${index < rating ? color : "text-white"}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={pageRef}
      className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center "
    >
      <ScrollToTopOnMount />

      <div className="w-full max-w-2xl relative">
        <div className="sticky top-0 w-full max-w-2xl h-[380px] bg-white rounded-b-[15px] z-40">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.title}
            className="object-cover rounded-b-[15px] w-full h-[250px]"
          />
          {restaurant?.isActive === false && (
            <div className="absolute inset-0 bg-black bg-opacity-60 items-center justify-center rounded-b-[15px] h-[250px] flex flex-col">
              <p className="text-[25px] font-[400] text-white">CLOSED</p>
              <p className="text-[18px] text-white font-[300] mt-2">
                Opens at {formattedOrderDateTime}
              </p>
            </div>
          )}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-[12px] p-2 bg-black bg-opacity-50 rounded-full text-white"
          >
            <BsArrowLeft size={18} />
          </button>
          <button
            onClick={handleShare}
            className="absolute top-4 right-[12px] p-2 bg-black bg-opacity-50 rounded-full text-white"
          >
            <FaShare size={18} />
          </button>

          <div className="w-[100%] h-[50px] absolute z-40 top-[200px] rounded-[18px] bg-[#1e1b4b80] flex items-center justify-between px-[12px]">
            <Rate
              rating={restaurant.rating}
              size="lg"
              maxStars={5}
              color="text-primary"
              editable={false}
            />

            <button
              className=" border border-primary rounded-[15px] py-[10px] px-[10px]  flex justify-center items-center"
              onClick={() => {
                if (login == false || !login) {
                  navigate("/login");
                } else {
                  navigate("/rating-page");
                }
              }}
            >
              <span className="text-white text-[12px]">Rate this store</span>
            </button>
          </div>
          <div className="px-4 py-4">
            <h2 className="text-[14px] font-semibold mb-2">
              {restaurant?.title}
            </h2>
            <div>
              <div className="flex justify-between   items-center">
                <span className="text-gray-600 text-[12px]">Distance</span>
                <span className="text-black text-[13px]">
                  {distanceTime.distance}
                </span>
              </div>
              <div className="flex justify-between   items-center mt-[5px]">
                <span className="text-gray-600 text-[12px]">Delivery Fee</span>
                <div className="flex items-center">
                  <span className="text-[13px] text-primary font-medium mr-2">
                    {discountDeliveryFee?.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                  <span className="text-[13px] text-gray-400 line-through">
                    {originalDeliveryFee?.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex justify-between   items-center mt-[5px]">
                <span className="text-gray-600 text-[12px]">Delivery Time</span>
                <span className="text-black text-[13px]">{totalMins}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <RestComponent />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
