import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

const useFetchCategories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allCategories, setAllCategories] = useState(null);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [allCategoriesError, setAllCategoriesError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BaseUrl}/api/category/random`);
      // console.log("checkin random response: ", response.data);
      setCategories(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    setIsLoadingAll(true);
    setAllCategoriesError(null);

    try {
      const response = await axios.get(`${BaseUrl}/api/category`);
      setAllCategories(response.data);
    } catch (error) {
      setAllCategoriesError(error);
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
