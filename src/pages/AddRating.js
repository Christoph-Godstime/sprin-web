import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RestaurantContext } from "../context/RestaurantContext";
import { LoginContext } from "../context/LoginContext";
import useFetchRating from "../hooks/useCheckRating";
import { BaseUrl } from "../constants/theme";
import ReusableHeader from "../components/ReusableHeader";
import Loading from "../components/Loading";

const AddRating = () => {
  const location = useLocation();

  const { restaurant } = location.state || {};

  const [rating, setRating] = useState(0);
  const [loadRating, setLoadRating] = useState(false);
  const { restaurantObj, setRestaurant } = useContext(RestaurantContext);
  const { login } = useContext(LoginContext);
  const { data, loading, error, refetch } = useFetchRating();

  useEffect(() => {
    if (restaurant) {
      setRestaurant(restaurant);
    }
  }, [restaurant]);

  useEffect(() => {
    if (data && data.rating) {
      setRating(data.rating);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  const getUserData = async () => {
    if (!login) {
      toast.error("Please login to rate the store.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!rating) {
      toast.error("Please select a rating before submitting.", {
        position: "top-center",
        autoClose: 3000,
      });
      return null;
    }

    const id = localStorage.getItem("id");
    if (id && restaurantObj) {
      return {
        userId: JSON.parse(id),
        restaurantId: restaurantObj._id,
        rating: rating,
      };
    } else {
      toast.error("User ID or restaurant information is missing.", {
        position: "top-center",
        autoClose: 3000,
      });
      return null;
    }
  };

  const postRating = async () => {
    const token = localStorage.getItem("token");
    if (!login || !token) {
      toast.error("Please login to rate the store.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setLoadRating(true);

    try {
      const ratingObject = await getUserData();
      if (!ratingObject) return;

      await axios.post(`${BaseUrl}/api/rating`, ratingObject, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      });

      setLoadRating(false);
      toast.success("Rating added successfully.", {
        position: "top-center",
        autoClose: 3000,
      });
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoadRating(false);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="relative flex flex-col h-screen overflow-y-auto items-center pb-[40px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={restaurantObj?.imageUrl}
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className=" w-full max-w-2xl pt-[20px] z-10">
        <ReusableHeader title={"Restaurant Rating"} />

        <div className="bg-[#1e1b4b80] mb-2 mx-3 flex items-center justify-between flex-col p-[20px] mt-[100px] rounded-[12px] shadow-lg">
          <img
            src={restaurantObj?.logoUrl}
            alt="Restaurant Logo"
            className="w-16 h-16 rounded-full mb-4"
          />
          <p className="text-white text-[14px] text-center">{data?.message}</p>
          {data?.status !== true ? (
            <>
              <div className="flex space-x-2 mt-2">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer text-3xl ${
                      index < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(index)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-white text-[14px] mt-2">TAP TO RATE</p>
            </>
          ) : (
            <div className="flex space-x-2 mt-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-3xl ${
                    index < data.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
          {data?.status !== true && (
            <button
              className="max-w-lg w-full py-3 text-white font-[400] rounded-lg flex justify-center items-center text-[14px] bg-primary hover:bg-orange-600 h-[50px] mx-[12px] mt-[30px]"
              onClick={postRating}
              disabled={loadRating}
            >
              {loadRating ? (
                <div className="w-[24px] h-[24px] border-[2px] border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "SUBMIT RATING"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRating;
