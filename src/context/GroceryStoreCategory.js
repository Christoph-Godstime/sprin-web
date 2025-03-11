import { createContext, useState, useEffect, Children } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

export const GroceryStoreCategoryContext = createContext();

export const GroceryStoreCategoryProvider = ({ children }) => {
  const [groceryStoreCategory, setGroceryStoreCategory] = useState(null);
  const [loadGroceryStoreCategory, setLoadGroceryStoreCategory] =
    useState(true);
  const [groceryStoreCategoryError, setGroceryStoreCategoryError] =
    useState(null);

  const fetchGroceryStoreCategory = async () => {
    setLoadGroceryStoreCategory(true);

    try {
      const response = await axios.get(
        `${BaseUrl}/api/grocery-category/get-store-categories`
      );

      setGroceryStoreCategory(response.data || []);
      setGroceryStoreCategoryError(null); // Clear any previous errors
    } catch (error) {
      console.log("error: ", error.response.data);
      setGroceryStoreCategoryError("Error fetching grocery categories");
    } finally {
      setLoadGroceryStoreCategory(false);
    }
  };

  useEffect(() => {
    fetchGroceryStoreCategory();
  }, []);

  const refetchGroceryStoreCategory = () => {
    setLoadGroceryStoreCategory(true);
    fetchGroceryStoreCategory();
  };

  return (
    <GroceryStoreCategoryContext.Provider
      value={{
        groceryStoreCategory,
        loadGroceryStoreCategory,
        groceryStoreCategoryError,
        refetchGroceryStoreCategory,
      }}
    >
      {children}
    </GroceryStoreCategoryContext.Provider>
  );
};
