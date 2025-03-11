import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

export const DefaultAddressContext = createContext();

export const DefaultAddressProvider = ({ children }) => {
  const [defaultAddress, setDefaultAddress] = useState(null); // Initialize as null
  const [addressLoading, setAddressLoading] = useState(true); // Initialize as true
  const [addressError, setAddressError] = useState(null);

  const fetchDefaultAddress = async () => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    console.log("started from defaultaddresscontext");
    try {
      const response = await axios.get(`${BaseUrl}/api/address/default`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200 && response.data !== null) {
        setDefaultAddress(response.data);
        console.log("completed from defaultaddresscontext");
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");

        localStorage.setItem(
          "latitude",
          JSON.stringify(response.data.latitude)
        );
        localStorage.setItem(
          "longitude",
          JSON.stringify(response.data.longitude)
        );
      }
    } catch (error) {
      setAddressError(error);
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultAddress();
  }, []);

  const refetchDefaultAddress = () => {
    setAddressLoading(true);
    fetchDefaultAddress();
  };

  return (
    <DefaultAddressContext.Provider
      value={{
        defaultAddress,
        addressLoading,
        addressError,
        refetchDefaultAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </DefaultAddressContext.Provider>
  );
};
