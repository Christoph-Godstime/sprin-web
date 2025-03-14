import React, { useContext, useEffect, useState, useCallback } from "react";
import { CartCountContext } from "../context/CartCountContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseUrl, PlaceholderImage } from "../constants/theme";
import { FaStar, FaTrash } from "react-icons/fa";
import Loading from "../components/Loading";
import Header from "../components/Header";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const Cart = () => {
  const navigate = useNavigate();

  const { isCartLoading, cartList, refetch } = useContext(CartCountContext);

  const [loadClearCart, setLoadClearCart] = useState(false);
  const [loadDelete, setLoadDelete] = useState({});

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const itemTotal = item.price;
      return total + itemTotal;
    }, 0);
  };

  const deleteCartItem = async (id, storeType) => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);

    const itemType = storeType === "GroceryStore" ? "Grocery" : "Food";

    setLoadDelete((prevState) => ({ ...prevState, [id]: true }));
    try {
      const response = await axios.delete(
        `${BaseUrl}/api/cart/delete/${id}/${itemType}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await refetch();

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
      console.log("error: ", error.response.data);
    } finally {
      setLoadDelete((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setLoadClearCart(true);
    try {
      const response = await axios.delete(`${BaseUrl}/api/cart/clear`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLoadClearCart(false);

      await refetch();

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoadClearCart(false);
    }
  };

  const RatingInput = ({ rating, size, maxStars, color }) => {
    return (
      <div className="flex space-x-[5px]">
        {[...Array(maxStars)].map((_, index) => (
          <FaStar
            key={index}
            size={size}
            className={index < rating ? `${color}` : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  if (isCartLoading || loadClearCart) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 items-center pb-[50px]">
        <ScrollToTopOnMount />
        <Header text="Cart" />
        <Loading />
      </div>
    );
  }

  if (cartList && cartList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
        <Header text="Cart" />
        <div className="w-full max-w-xl py-[30px] flex flex-col items-center justify-center flex-1 px-[12px]">
          <p className="text-[16px] font-[500] text-gray-700">
            No Item In Cart...
          </p>
          <button
            className="h-12 w-full mt-[30px] mx-auto bg-primary text-white rounded-xl flex justify-center items-center text-[12px] max-w-lg"
            onClick={() => navigate("/")}
          >
            Add items to cart
          </button>
        </div>
      </div>
    );
  }

  const renderCartItem = (item) => (
    <div
      key={item.storeId._id}
      className="border-2 border-gray-300  mt-5 rounded-xl bg-white p-[10px] relative"
    >
      <div className="bg-gray-100 rounded-xl flex items-center relative">
        <button
          onClick={() => deleteCartItem(item.storeId._id, item.storeType)}
          className="absolute right-2 bottom-2 rounded-md"
        >
          {loadDelete[item.storeId._id] ? (
            <div className="w-[20px] h-[20px] border-[2px] border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaTrash className="text-red-500" size={16} />
          )}
        </button>

        <img
          src={isImageLoaded ? item.storeId.logoUrl : PlaceholderImage}
          alt="store logo"
          className={`w-24 h-24 rounded-lg ${
            isImageLoaded ? "object-cover" : "object-contain"
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}
        />

        <div className="ml-4 flex flex-col justify-between">
          <h2 className="font-medium text-[14px] line-clamp-1">
            {item.storeId.title}
          </h2>
          {item.storeType === "Restaurant" && (
            <p className="text-[12px] text-gray-500 line-clamp-1">
              {item.storeId.address}
            </p>
          )}
          {item.storeType === "Restaurant" && (
            <div className="flex items-center mt-1">
              <RatingInput
                rating={item?.storeId.rating}
                size={12}
                maxStars={5}
                color="text-yellow-400"
              />
              <span className="ml-2 text-gray-500 text-[12px]">
                {item.storeId.ratingCount}{" "}
                {item.storeId.ratingCount > 1 ? "Reviews" : "Review"}
              </span>
            </div>
          )}

          <div className="flex items-center">
            <span className=" text-[12px]">
              {item.items.length} {item.items.length > 1 ? "Items" : "Item"}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary mx-3"></div>
            <span className="text-[12px]">
              {calculateTotalPrice(item.items).toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </div>

      <button
        className="h-12 w-full mt-[15px] mx-auto bg-primary text-white rounded-xl flex justify-center items-center text-[12px] max-w-lg"
        onClick={() => {
          const checkoutScreen =
            item.storeType === "GroceryStore"
              ? "/grocery-checkout"
              : "/checkout";
          navigate(checkoutScreen, { state: { data: item } });
        }}
      >
        Checkout
      </button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center pb-[150px] relative">
      <ScrollToTopOnMount />
      <Header text="Cart" />
      <div className="w-full max-w-2xl pt-[10px] px-[12px]">
        <div>{cartList.map(renderCartItem)}</div>
      </div>
      <div className="w-full px-[12px] fixed bottom-[40px] right-[12px] flex justify-center z-40">
        <div className="w-full max-w-2xl flex justify-end">
          <button
            onClick={clearCart}
            className=" py-[10px] px-[18px] rounded-[20px] text-white text-[12px] font-bold flex justify-center items-center bg-primary hover:bg-orange-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
