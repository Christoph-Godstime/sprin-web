import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseUrl, PlaceholderImage } from "../../constants/theme";
import Counter from "../../components/Counter";
import axios from "axios";
import { CartCountContext } from "../../context/CartCountContext";
import { RestaurantContext } from "../../context/RestaurantContext";
import { LoginContext } from "../../context/LoginContext";
import useFetchDefaultAddress from "../../hooks/useFetchDefaultAdress";
import useFetchAddresses from "../../hooks/useFetchAddresses";
import { toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";
import { FaShare } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import html2canvas from "html2canvas";

const FoodPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, refetch, setCartCount, isCartLoading } =
    useContext(CartCountContext);
  const { item } = location.state || {};

  const pageRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [addittives, setAddittives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { restaurantObj, setRestaurant } = useContext(RestaurantContext);

  const [count, setCount] = useState(1);
  const [data, setData] = useState(false);
  const [preference, setPreference] = useState("");

  const { login, setLogin } = useContext(LoginContext);

  const {
    defaultAddress,
    isAddressLoading,
    refetch: fetchDeliveryAddress,
  } = useFetchDefaultAddress();

  const { refetch: addressRefetch } = useFetchAddresses();

  const handleAddressAdded = (newAddress) => {
    addressRefetch();
  };

  const id = item.restaurant;

  const orderItem = {
    productId: item._id,
    quantity: count,
    additives: addittives,
    instructions: preference,
    price: (item.price + totalPrice) * count,
    title: item.title,
    imageUrl: item.imageUrl[0],
    time: item.time,
    storeId: id,
    description: item.description,
    storeType: "Restaurant",
    itemType: "Food",
  };

  const handleAdditive = (newAdditive) => {
    setAddittives((prevAddittives) => {
      const exists = prevAddittives.some(
        (additive) => additive.id === newAdditive.id
      );

      if (exists) {
        // Remove the additive from the list
        return prevAddittives.filter(
          (additive) => additive.id !== newAdditive.id
        );
      } else {
        // Add the additive to the list
        return [...prevAddittives, newAdditive];
      }
    });
  };

  const handlePress = async (item) => {
    if (!login) {
      //   navigate("/login");
      toast.info("Please login to add items to your cart.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      const orderItem = {
        productId: item._id,
        quantity: count,
        additives: addittives,
        instructions: preference,
        price: (item.price + totalPrice) * count,
        title: item.title,
        imageUrl: item.imageUrl[0],
        time: item.time,
        storeId: id,
        storeType: "Restaurant",
        itemType: "Food",
      };

      await addToCart(orderItem);
    }
  };

  const orderNow = async () => {
    if (!login) {
      navigate("/login");
      toast.info("Please login to proceed to checkout.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      await fetchDeliveryAddress();

      if (!isAddressLoading && defaultAddress === null) {
        navigate("/add-address", {
          onAddressAdded: handleAddressAdded,
        });
        toast.info("Please add a default delivery address.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        navigate("/order-page", {
          orderItem: [orderItem],
          totalPrice: (item.price + totalPrice) * count,
          storeId: id,
          pack: 1,
          coords: restaurantObj.coords,
          storeType: "Restaurant",
          fromCart: false,
        });
      }
    }
  };

  // console.log("orderItem from food page: ", orderItem);

  const addToCart = async (orderItem) => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/api/cart`,
        { orderItem },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCartCount(response.data.count);
      refetch();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
      console.log("this is error: ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = addittives.reduce((sum, additive) => {
        return sum + parseFloat(additive.price);
      }, 0);

      setTotalPrice(total);
      fetchData();
    };

    calculateTotalPrice();
  }, [addittives]);
  const handleNavigation = () => {
    if (data === true) {
      navigate("/restaurant", { state: { restaurantObj: restaurantObj } });
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/restaurant/byId/${id}`);
      if (response.status === 200) {
        setData(true);
        setRestaurant(response.data);
      }
    } catch (error) {
      console.log("api error", error);
    }
  };

  const total = (item.price + totalPrice) * count;

  const additivesPrice = Number(item.price);
  const formattedPrice = additivesPrice.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

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

  return (
    <div
      ref={pageRef}
      className="flex flex-col min-h-screen bg-white items-center pb-[150px] pt-[250px]"
    >
      <ScrollToTopOnMount />

      <div className="w-full max-w-2xl ">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[250px] bg-white rounded-b-[15px] z-40">
            <img
              src={item.imageUrl[0]}
              alt={item.title}
              className="object-cover rounded-b-[15px] w-full h-full"
            />
            {item?.isAvailable === false && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-b-lg">
                <p className="text-white text-xl">Out of stock</p>
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

            <button
              className="absolute z-40 bottom-3 left-[12px] border border-primary rounded-[15px] py-[10px] px-[10px] bg-[#1e1b4b80] flex items-center"
              onClick={() =>
                navigate("/food-feedbacks", {
                  state: { foodId: item._id },
                })
              }
            >
              <span className="text-[12px] text-primary">
                {item?.rating?.toFixed(1)} ({item?.ratingCount})
              </span>
              <span className="text-white ml-4 text-[12px]">See Ratings</span>
            </button>

            {/* Open Store Button */}
            <button
              className="absolute z-40 bottom-3 right-[12px] border border-primary rounded-[15px] py-[10px] px-[10px] bg-[#1e1b4b80] flex justify-center items-center"
              onClick={handleNavigation}
            >
              <span className="text-white text-[12px]">Open the Store</span>
            </button>
          </div>

          <div className=" flex flex-col space-y-[20px] px-[12px] pt-[10px]">
            <div>
              <div className="flex justify-between">
                <h2 className="text-[16px] font-medium w-3/5">{item.title}</h2>
                <span className="text-[12px] text-primary">
                  {total.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
              <p className="text-gray-600 text-[12px] mt-[10px]">
                {item.description}
              </p>
            </div>
            <div className="flex space-x-2 mt-2 overflow-x-auto no-scrollbar">
              {item.foodTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-white px-2 py-[2px] rounded-[10px] text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {item.additives.length > 0 && (
              <div>
                <h3 className="font-medium text-[12px] md:text-[14px]">
                  Additives and Toppings
                </h3>

                <div className="space-y-[12px] mt-[10px]">
                  {item.additives.map((additive) => (
                    <div
                      key={additive.title}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-[15px]">
                        <input
                          type="checkbox"
                          checked={addittives.some((a) => a.id === additive.id)}
                          onChange={() => handleAdditive(additive)}
                          className="w-[15px] h-[15px] accent-primary border border-primary"
                        />
                        <h4 className="text-gray-600 text-[12px]">
                          {additive.title}
                        </h4>
                      </div>
                      <span className="text-gray-600 text-[12px]">
                        +{" "}
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(additive.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className=" font-medium text-[12px] md:text-[14px]">
              Special Instructions
            </h3>
            <div className="flex items-center border border-orange-200 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mb-[20px]  bg-gray-100">
              <textarea
                placeholder="Leave a message for the restaurant"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full outline-none  bg-gray-100 placeholder:text-[12px] text-[12px]  "
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <h3 className="font-medium text-[12px] md:text-[14px]">
                Quantity
              </h3>
              <Counter count={count} setCount={setCount} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-[12px] fixed bottom-[40px] flex justify-center z-40">
        <div className="mt-auto p-[8px] bg-orange-100 shadow-lg flex justify-between items-center w-full max-w-lg rounded-full">
          <button
            onClick={() => handlePress(item)}
            className="bg-primary text-white  rounded-full h-[40px] w-[40px] flex justify-center items-center"
          >
            {loading ? (
              <div className="w-[20px] h-[20px] border-[2px] border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiPlusCircle className="text-[24px]" />
            )}
          </button>
          <button
            onClick={orderNow}
            className="bg-primary text-white px-6 h-[40px] w-[60%] rounded-full  mx-2 text-[12px]"
          >
            Order Now
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-primary text-white rounded-full h-[40px] w-[40px] flex justify-center items-center"
          >
            {isCartLoading ? (
              <div className="w-[20px] h-[20px] border-[2px] border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
