import React, { useContext, useState } from "react";
import { CartCountContext } from "../context/CartCountContext";
import { LoginContext } from "../context/LoginContext";
import { FetchCartDetailsContext } from "../context/FetchCartDetailsContext";
import axios from "axios";
import { BaseUrl, PlaceholderImage } from "../constants/theme";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GroceryTile = ({ item, index, width }) => {
  const navigate = useNavigate();
  const { cart, refetchCartDetails } = useContext(FetchCartDetailsContext);
  const { cartCount, setCartCount } = useContext(CartCountContext);
  const { login } = useContext(LoginContext);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (!login) {
      toast.info("Please login to add items to your cart.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      const orderItem = {
        productId: item._id,
        quantity: 1,
        price: item.price,
        title: `${item.title} ${item?.quantity}`,
        imageUrl: item.imageUrl[0],
        storeId: item.groceryStore,
        storeType: "GroceryStore",
        itemType: "Grocery",
      };

      await addToCart(orderItem);
    }
  };

  const addToCart = async (orderItem) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const accessToken = JSON.parse(token);
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
      refetchCartDetails();
      toast.success(
        `1 ${item.title} ${item?.quantity} added to cart successfully`,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrocery = (item) => {
    navigate("/grocery-item", { state: { grocery: item } });
  };

  return (
    <div className="mx-[5px]  rounded-lg h-[180px] flex flex-col items-center relative cursor-pointer">
      <div
        onClick={() => handleGrocery(item)}
        className="w-full h-[120px] flex justify-center items-center"
      >
        <img
          src={isImageLoaded ? item.imageUrl[0] : PlaceholderImage}
          alt={item.title}
          className="w-4/5 h-4/5 object-contain"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}
        />
      </div>
      <div
        onClick={() => handleGrocery(item)}
        className="flex flex-col items-start text-black"
      >
        <p
          className={`text-[12px] font-light text-left ${width} line-clamp-2 overflow-hidden`}
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
      <div className="absolute right-[5px] bottom-[60px] w-[35px] h-[35px] rounded-full bg-orange-100 flex justify-center items-center">
        {loading ? (
          <div className="w-[20px] h-[20px] border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <button className="  text-primary" onClick={handlePress}>
            <AiFillPlusCircle size={26} />
          </button>
        )}
      </div>
    </div>
  );
};

export default GroceryTile;
