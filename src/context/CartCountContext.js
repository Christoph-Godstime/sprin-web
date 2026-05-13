import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

export const CartCountContext = createContext();

const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const CartCountProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [isCartLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartData = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setCartList([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const cartResponse = await axios.get(`${BaseUrl}/api/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // const reversedData = cartResponse.data.cart.reverse();
      setCartList(cartResponse.data.cart);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCartCount = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setCartCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const countResponse = await axios.get(`${BaseUrl}/api/cart/count`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCartCount(countResponse.data.cartCount);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
    fetchCartCount();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchCartData();
    fetchCartCount();
  };

  return (
    <CartCountContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartList,
        isCartLoading,
        error,
        refetch,
      }}
    >
      {children}
    </CartCountContext.Provider>
  );
};
