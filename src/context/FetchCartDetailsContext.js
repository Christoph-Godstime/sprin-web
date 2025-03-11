import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

export const FetchCartDetailsContext = createContext();

export const FetchCartDetailsProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [cartStatus, setCartStatus] = useState(false);
  const [loadCartDetails, setLoadCartDetails] = useState(false);

  const fetchCartDetails = async () => {
    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);

    setLoadCartDetails(true);

    try {
      const response = await axios.get(
        `${BaseUrl}/api/cart/nearest-grocery-cart?lat=${lat}&lng=${lng}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCart(response.data);
      setCartStatus(response.data.status);
    } catch (error) {
      console.log("Error: ", error?.response?.data?.message);

      setCartStatus(error?.response?.data?.status);
    } finally {
      setLoadCartDetails(false);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const refetchCartDetails = () => {
    setLoadCartDetails(true);
    fetchCartDetails();
  };

  return (
    <FetchCartDetailsContext.Provider
      value={{
        cart,
        cartStatus,
        loadCartDetails,
        refetchCartDetails,
      }}
    >
      {children}
    </FetchCartDetailsContext.Provider>
  );
};
