import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { CartCountContext } from "../../context/CartCountContext";
import { LoginContext } from "../../context/LoginContext";
import { TrySomethingNewContext } from "../../context/TrySomethingNewContext";
import { BaseUrl } from "../../constants/theme";
import axios from "axios";
import { toast } from "react-toastify";
import FoodTile from "../../components/FoodTile";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const navigate = useNavigate();

  const { restaurantObj } = useContext(RestaurantContext);
  const {
    cartCount,
    setCartCount,
    refetch: fetchCart,
  } = useContext(CartCountContext);
  const { login } = useContext(LoginContext);

  const { trySomethingNew, loadTrySomethingNew, refetchTrySomethingNew } =
    useContext(TrySomethingNewContext);

  const [loadAddCart, setLoadAddCart] = useState({});

  if (loadTrySomethingNew) return <Loading />;

  if (trySomethingNew && trySomethingNew.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="font-medium text-[14px] text-gray-500">
          No New Food Items In This Location...
        </p>
      </div>
    );
  }

  const handlePress = async (item) => {
    if (!login) {
      toast.info("Please login to add items to your cart.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      const orderItem = {
        productId: item._id,
        quantity: 1,
        additives: [],
        instructions: "",
        price: item.price,
        title: item.title,
        imageUrl: item.imageUrl[0],
        time: item.time,
        storeId: item.restaurant,
        storeType: "Restaurant",
        itemType: "Food",
      };
      await addToCart(orderItem);
    }
  };

  const addToCart = async (orderItem) => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setLoadAddCart((prevState) => ({
      ...(prevState || {}),
      [orderItem.productId]: true,
    }));
    try {
      const response = await axios.post(
        `${BaseUrl}/api/cart`,
        { orderItem },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setCartCount(response.data.count);

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error.response.data);
      toast.error("Failed to add item to cart.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoadAddCart((prevState) => ({
        ...prevState,
        [orderItem.productId]: false,
      }));
    }
  };

  return (
    <div className="bg-white pb-[100px]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[10px] gap-y-[15px]">
        {trySomethingNew.map((item) => (
          <FoodTile
            key={item._id}
            item={item}
            onPress={() => handlePress(item)}
            showDetails={() => navigate("/food-nav", { state: { item: item } })}
            loadAddCart={loadAddCart || {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
