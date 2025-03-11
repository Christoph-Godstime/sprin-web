import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Counter from "../../components/Counter";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";
import { CartCountContext } from "../../context/CartCountContext";
import useFetchAddresses from "../../hooks/useFetchAddresses";
import useFetchDefaultAddress from "../../hooks/useFetchDefaultAdress";
import { BaseUrl, PlaceholderImage } from "../../constants/theme";
import { toast } from "react-toastify";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { FaShare } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import html2canvas from "html2canvas";

const Grocery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { grocery } = location.state || {};

  const { cartCount, refetch, setCartCount, isCartLoading } =
    useContext(CartCountContext);

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [random, setRandom] = useState([]);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [errorRandom, setErrorRandom] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [count, setCount] = useState(1);

  const { login, setLogin } = useContext(LoginContext);

  const pageRef = useRef(null);

  const {
    defaultAddress,
    isAddressLoading,
    refetch: fetchDeliveryAddress,
  } = useFetchDefaultAddress();

  const { refetch: addressRefetch } = useFetchAddresses();

  const handleAddressAdded = (newAddress) => {
    addressRefetch();
  };

  const orderItem = {
    productId: grocery._id,
    quantity: count,
    price: grocery.price * count,
    title: `${grocery.title} ${grocery?.quantity}`,
    imageUrl: grocery.imageUrl[0],
    storeId: grocery.groceryStore,
    storeType: "GroceryStore",
    itemType: "Grocery",
  };

  const handlePress = async (item) => {
    if (!login) {
      navigate("/login");
      toast.info("Please login to add items to your cart.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      const orderItem = {
        productId: grocery._id,
        quantity: count,
        price: grocery.price * count,
        title: `${grocery.title} ${grocery?.quantity}`,
        imageUrl: grocery.imageUrl[0],
        storeId: grocery.groceryStore,
        storeType: "GroceryStore",
        itemType: "Grocery",
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
          state: { onAddressAdded: handleAddressAdded },
        });
        toast.info("Please add a default delivery address.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        navigate("/order-page", {
          state: {
            orderItem: [orderItem],
            totalPrice: grocery.price * count,
            storeId: grocery.groceryStore,
            pack: 1,
            coords: {
              latitude: grocery.location.coordinates[1],
              longitude: grocery.location.coordinates[0],
            },
            storeType: "GroceryStore",
            fromCart: false,
          },
        });
      }
    }
  };

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

      toast.success(
        `${count} ${grocery.title} ${grocery?.quantity} added to cart successfully`,
        {
          position: "top-right",
          autoClose: 3000,
          onClose: () => navigate(-1),
        }
      );
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 3000,
      });
      console.log("this is error: ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomGrocery = async () => {
    setLoadingRandom(true);
    setErrorRandom(null);

    try {
      const response = await axios.get(
        `${BaseUrl}/api/grocery/random/${grocery.category}/${grocery._id}`
      );
      setRandom(response?.data?.groceries);
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 3000,
      });

      setErrorRandom("Error getting random grocery");
    } finally {
      setLoadingRandom(false);
    }
  };

  useEffect(() => {
    fetchRandomGrocery();
    fetchDeliveryAddress();
  }, [grocery]);

  const total = (grocery.price + totalPrice) * count;

  const handleGrocery = (item) => {
    navigate("/grocery-item", { state: { grocery: item } });
  };

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
      className="flex flex-col min-h-screen bg-white items-center pb-[100px] pt-[400px]"
    >
      <ScrollToTopOnMount />

      <div className="w-full max-w-2xl pt-[20px]">
        <div className=" flex flex-col">
          {/* Header Section */}
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[400px] z-40">
            <img
              src={grocery.imageUrl[0]}
              alt="Grocery"
              className="object-cover rounded-b-[15px] w-full h-full"
            />
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
          </div>

          {/* Grocery Details */}
          <div className=" flex flex-col space-y-4">
            <div className="flex justify-between items-start px-[12px]">
              <h1 className=" text-[20px] font-medium w-4/5 pr-[20px]">
                {grocery.title} {grocery?.quantity || ""}
              </h1>
              <span className="text-lg font-medium text-primary">
                {grocery?.price?.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col items-center py-4 px-[12px] h-[100px] justify-center">
              {loading ? (
                <FiLoader className="animate-spin text-primary text-2xl" />
              ) : (
                <>
                  <span className="text-lg font-medium mb-2">Quantity</span>
                  <Counter count={count} setCount={setCount} />
                </>
              )}
            </div>

            {/* Others Also Bought */}
            {!loadingRandom && (
              <div className="mt-6">
                <h2 className="text-lg font-bold mb-3 px-[12px]">
                  Others also bought
                </h2>
                <div className="flex space-x-4 overflow-x-auto no-scrollbar px-[12px]">
                  {random.map((item, index) => (
                    <div
                      className="mx-[5px]  rounded-lg h-[180px] flex flex-col items-center relative"
                      onClick={() => handleGrocery(item)}
                    >
                      <div className="w-full h-[120px] flex justify-center items-center">
                        <img
                          src={
                            isImageLoaded ? item.imageUrl[0] : PlaceholderImage
                          }
                          alt={item.title}
                          className="w-4/5 h-4/5 object-contain"
                          onLoad={() => setIsImageLoaded(true)}
                          onError={() => setIsImageLoaded(false)}
                        />
                      </div>
                      <div className="flex flex-col items-start text-black">
                        <p
                          className={`text-sm font-light text-left w-[150px] line-clamp-2 overflow-hidden`}
                        >
                          {item.title} {item?.quantity || ""}
                        </p>
                        <p className="text-[13px] font-medium">
                          {item.price?.toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Buttons */}
          <div className="fixed bottom-4 w-full flex justify-center  max-w-2xl ">
            <div className="bg-orange-100 p-[8px] rounded-full w-11/12 flex justify-between space-x-[10px]">
              <button
                onClick={() => handlePress(grocery)}
                className="bg-primary text-orange-100 px-[8px] py-[10px] rounded-l-full w-1/2 text-center text-sm font-medium"
              >
                Add {count} to cart for{" "}
                {total.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                })}
              </button>
              <button
                onClick={orderNow}
                className="bg-primary text-orange-100 px-[8px] py-[10px] rounded-r-full w-1/2 text-center text-sm font-medium"
              >
                Order {count} now for{" "}
                {total.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grocery;
