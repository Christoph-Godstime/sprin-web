import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { CartCountContext } from "../../context/CartCountContext";
import { LoginContext } from "../../context/LoginContext";
import useFetchFoodsByRest from "../../hooks/useFetchFoodsByRestaurant";
import { BaseUrl } from "../../constants/theme";
import axios from "axios";
import { toast } from "react-toastify";
import FoodTile from "../../components/FoodTile";
import Loading from "../../components/Loading";

toast.configure();

const Delivery = () => {
  const { restaurantObj } = useContext(RestaurantContext);
  const {
    cartCount,
    setCartCount,
    refetch: fetchCart,
  } = useContext(CartCountContext);
  const { login } = useContext(LoginContext);

  const { restaurantFoodList, isLoading, error, refetch } = useFetchFoodsByRest(
    restaurantObj._id,
    restaurantObj.code
  );

  const [loadAddCart, setLoadAddCart] = useState({});

  if (isLoading) return <Loading />;

  if (restaurantFoodList && restaurantFoodList.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="font-medium text-lg">No Food Item...</p>
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
    setLoadAddCart((prevState) => ({
      ...prevState,
      [orderItem.productId]: true,
    }));
    try {
      const response = await axios.post(
        `${BaseUrl}/api/cart`,
        { orderItem },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartCount(response.data.count);
      refetch();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    } finally {
      setLoadAddCart((prevState) => ({
        ...prevState,
        [orderItem.productId]: false,
      }));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="grid grid-cols-2 gap-4">
        {restaurantFoodList.map((item) => (
          <FoodTile
            key={item._id}
            item={item}
            onPress={() => handlePress(item)}
            loadAddCart={loadAddCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Delivery;
