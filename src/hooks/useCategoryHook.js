import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

const useFetchCategories = () => {
  // Use empty arrays by default so consumers can safely `.map()` even if a request fails.
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allCategories, setAllCategories] = useState([]);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [allCategoriesError, setAllCategoriesError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BaseUrl}/api/category/random`);
      // console.log("checkin random response: ", response.data);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError(error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    setIsLoadingAll(true);
    setAllCategoriesError(null);

    try {
      const response = await axios.get(`${BaseUrl}/api/category`);
      setAllCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setAllCategoriesError(error);
      setAllCategories([]);
    } finally {
      setIsLoadingAll(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAllCategories();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    setIsLoadingAll(true);
    await Promise.all([fetchData(), fetchAllCategories()]);
  };

  return {
    categories,
    isLoading,
    error,
    refetch,
    allCategories,
    isLoadingAll,
    allCategoriesError,
  };
};

export default useFetchCategories;
