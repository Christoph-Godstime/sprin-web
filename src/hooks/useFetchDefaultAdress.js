import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

const useFetchDefaultAddress = () => {
  const [defaultAddress, setAddress] = useState(null);
  const [isAddressLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setIsLoading(true);

    try {
      const response = await axios.get(`${BaseUrl}/api/address/default`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setAddress(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { defaultAddress, isAddressLoading, error, refetch };
};

export default useFetchDefaultAddress;
