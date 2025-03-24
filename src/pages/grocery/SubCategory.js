import React, { useState, useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import axios from "axios";
import { BaseUrl } from "../../constants/theme";
import GroceryTile from "../../components/GroceryTile";
import { LoginContext } from "../../context/LoginContext";
import { FetchCartDetailsContext } from "../../context/FetchCartDetailsContext";
import CartButton from "../../components/CartButton";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const SubCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = location.state || {};

  const { refetchCartDetails } = useContext(FetchCartDetailsContext);

  const { login, setLogin } = useContext(LoginContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${BaseUrl}/api/grocery/subcategories-groceries/${categoryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error: ", error?.response?.data?.message);
        toast.info(error?.response?.data?.message, {
          position: "top-center",
          autoClose: 3000,
        });

        navigate(-1);
        setError("Error fetching subcategories");
      } finally {
        setLoading(false);
      }
    };
    fetchSubCategories();
  }, [categoryId, navigate]);

  useEffect(() => {
    if (login) {
      refetchCartDetails();
    }
  }, [login, refetchCartDetails]);

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[200px]">
        <Header text="Grocery Items" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[200px]">
      <ScrollToTopOnMount />
      <Header text="Grocery Items" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        {" "}
        {data.map((item) => {
          const availableGroceries = item.groceries.filter(
            (grocery) => grocery.isAvailable
          );
          return (
            <div key={item.subCategory._id} className="mb-[40px]">
              <h2 className=" text-[16px] font-bold mb-4">
                {item.subCategory.title}
              </h2>
              {availableGroceries.length > 0 ? (
                <div className="grid grid-cols-3 gap-[4px] place-items-center">
                  {availableGroceries.map((grocery, index) => (
                    <GroceryTile
                      key={grocery._id}
                      item={grocery}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500  text-[12px]">No items available</p>
              )}
            </div>
          );
        })}
      </div>
      <CartButton />
    </div>
  );
};

export default SubCategory;
