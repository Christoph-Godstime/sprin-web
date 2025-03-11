import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

const useFetchAddresses = () => {
  const [addresses, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setIsLoading(true);

    try {
      const response = await axios.get(`${BaseUrl}/api/address/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const reversedData = response.data.reverse();
      setAddress(reversedData);
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

  return { addresses, isLoading, error, refetch };
};

export default useFetchAddresses;
