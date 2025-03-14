import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseUrl, PlaceholderImage } from "../constants/theme";
import axios from "axios";
import { CartCountContext } from "../context/CartCountContext";
import { RestaurantContext } from "../context/RestaurantContext";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import Header from "../components/Header";
import { PiStarFourFill } from "react-icons/pi";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  console.log("data: ", data);

  const [cartData, setCartData] = useState(data);

  const [loadDeleteItem, setLoadDeleteItem] = useState({});

  const { setRestaurant } = useContext(RestaurantContext);

  const { refetch } = useContext(CartCountContext);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const accessToken = JSON.parse(token);
      try {
        const response = await axios.get(
          `${BaseUrl}/api/cart/${data.storeId._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCartData(response.data.cart);
      } catch (error) {
        if (error?.response?.status === 404) {
          navigate("/");
        }
      }
    };

    fetchData();
  }, [data.storeId._id]);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const itemTotal = item.price;
      return total + itemTotal;
    }, 0);
  };

  const deleteCartItem = async (storeId, itemId) => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setLoadDeleteItem((prevState) => ({
      ...(prevState || {}), // Ensure prevState is always an object
      [itemId]: true,
    }));
    try {
      const response = await axios.delete(
        `${BaseUrl}/api/cart/${storeId}/${itemId}/Food`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      await setCartData(response.data.cart);

      toast.success(response.data.message || "Item removed successfully", {
        onClose: () => {
          if (
            response.data.cart.items &&
            response.data.cart.items.length === 0
          ) {
            navigate(-1); // Equivalent to navigation.goBack()
          }
        },
      });

      refetch(); // Refresh cart items
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
    } finally {
      setLoadDeleteItem((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    }
  };

  const transformDataForPayment = (data) => {
    return data.items.map((item) => ({
      additives: item.additives,
      description: item.title,
      productId: item.productId._id, // Assuming foodId is an object with _id
      imageUrl: item.imageUrl,
      instructions: item.instructions,
      price: item.price,
      quantity: item.quantity,
      storeId: data.storeId._id, // Restaurant ID
      time: item.time,
      title: item.title,
      storeType: "Restaurant",
      itemType: "Food",
    }));
  };

  const handleMakePayment = () => {
    const transformedData = transformDataForPayment(cartData);
    navigate("/payment", {
      state: {
        params: {
          orderItem: transformedData,
          totalPrice: calculateTotalPrice(cartData?.items),
          storeId: data?.storeId?._id,
          pack: data?.items?.length,
          coords: {
            latitude: data?.storeId?.location?.coordinates[1],
            longitude: data?.storeId?.location?.coordinates[0],
          },
          storeType: "Restaurant",
          fromCart: true,
        },
      },
    });
  };

  const handlePress = (url) => {
    window.open(url, "_blank");

    if (!url) {
      console.error("Failed to open URL");
      toast.error("Error: Failed to open the link.");
    }
  };

  return (
    <div className="flex flex-col h-dvh bg-gray-100 items-center pb-[180px] relative ">
      <ScrollToTopOnMount />
      <Header text="Checkout" />
      <div className="w-full max-w-2xl pt-[105px]">
        <div className="fixed top-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-[105px] z-40">
          <h2 className="bg-gray-200 px-[12px] py-3 text-[16px] font-medium">
            Cart Details
          </h2>

          <div className="flex items-center px-[12px] py-[10px] bg-gray-100">
            <img
              src={cartData.storeId.logoUrl}
              alt="Store Logo"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h3 className="text-[14px] font-semibold">
                {cartData.storeId.title}
              </h3>
              <div className="flex items-center text-gray-600 text-[12px] mt-[2px]">
                <span>
                  {cartData.items.length}{" "}
                  {cartData.items.length > 1 ? "Items" : "Item"}
                </span>
                <span className="mx-2 text-primary">•</span>
                <span>
                  {calculateTotalPrice(cartData.items).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {cartData.items.map((item, index) => (
          <div
            key={item._id}
            className="bg-white shadow px-[12px] py-[10px] mb-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[14px] font-medium">Pack {index + 1}</h4>
              {loadDeleteItem[item._id] ? (
                <div className="w-[30px] h-[30px] flex justify-center items-center">
                  <div className="w-[20px] h-[20px] border-[2px] border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <button
                  className="w-[30px] h-[30px] flex items-center justify-center bg-red-100 rounded-full"
                  onClick={() => deleteCartItem(cartData.storeId._id, item._id)}
                >
                  <FaTrash className="text-red-500 text-[14px]" />
                </button>
              )}
            </div>

            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-start">
                  <PiStarFourFill className="text-primary text-sm mt-[4px]" />
                  <div className="ml-2">
                    <p className="text-[13px] font-[400] text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-gray-600 mt-1">
                      {item.price.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-gray-700 mt-2">
                  Quantity: {item.quantity}
                </p>
              </div>
              <img
                src={item.imageUrl}
                alt="Product"
                className="w-20 h-20 object-cover rounded"
              />
            </div>

            {item.additives.length > 0 && (
              <div className="bg-gray-100 p-3 rounded mt-3">
                <h5 className="text-[12px] font-semibold">Your Selections</h5>
                <div className="mt-2 ">
                  {item.additives.map((additive) => (
                    <div
                      key={additive.id}
                      className="flex justify-between text-[12px] text-gray-700 space-y-[3px]"
                    >
                      <span>{additive.title}</span>
                      <span>
                        {Number(additive.price).toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.instructions && (
              <div className="bg-gray-100 p-3 rounded mt-3">
                <h5 className="text-[12px] font-semibold mb-1">Instructions</h5>
                <p className="text-[12px] text-gray-700">{item.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full px-[12px] fixed bottom-[20px]  flex justify-center z-40">
        <div className="w-full max-w-2xl">
          <button
            onClick={() => {
              navigate(`/restaurant/${cartData.storeId}`);
              setRestaurant(cartData.storeId);
            }}
            className="px-[10px] py-[6px] bg-primary1 rounded-full flex items-center justify-center w-40 bg-orange-100"
          >
            <i className="text-primary text-lg">+</i>
            <span className="text-[12px] text-primary font-medium ml-2">
              Add Another Pack
            </span>
          </button>

          <div className="mx-3 mt-2 flex justify-center text-[12px]">
            <span>By proceeding, you agree to our </span>
            <button
              onClick={() => handlePress("https://www.sprinapp.com/terms")}
              className="text-primary font-medium mx-1"
            >
              Terms of Use
            </button>
            <span> and </span>
            <button
              onClick={() => handlePress("https://www.sprinapp.com/privacy")}
              className="text-primary font-medium mx-1"
            >
              Privacy Policy
            </button>
          </div>

          <button
            onClick={handleMakePayment}
            className="h-12 max-w-md w-full  mx-auto my-5 px-5 bg-primary flex items-center justify-between rounded-lg text-white font-medium text-[12px]"
          >
            <span>Make Payment</span>
            <span>
              {calculateTotalPrice(cartData.items).toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0,
              })}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
