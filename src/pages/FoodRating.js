import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import useFetchRating from "../hooks/useCheckRating";
import { BaseUrl } from "../constants/theme";
import ReusableHeader from "../components/ReusableHeader";

const FoodRating = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { foodId, orderId, orderItemId, imageUrl } =
    location.state?.params || {};

  const { login, setLogin } = useContext(LoginContext);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loadRating, setLoadRating] = useState(false);

  const handleSubmit = async () => {
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
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setLoadRating(true);

    try {
      const response = await axios.post(
        `${BaseUrl}/api/orders/rate-food`,
        {
          foodId,
          orderId,
          orderItemId,
          rating,
          feedbackText: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });

      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-center",
        autoClose: 3000,
      });
      console.log(error.response);
    } finally {
      setLoadRating(false);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  return (
    <div className="relative flex flex-col h-[calc(100dvh)] overflow-y-auto items-center pb-[40px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className=" w-full max-w-2xl pt-[20px] z-10">
        <ReusableHeader title={"Food Rating"} />

        <div className="bg-[#1e1b4b80] mb-2 mx-3 flex items-center justify-between flex-col p-[20px] mt-[100px] rounded-[12px] shadow-lg">
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

          <div className="flex items-center border border-orange-200 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mb-[20px]  bg-gray-100 max-w-lg w-full  mt-[30px]">
            <textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full outline-none bg-gray-100 placeholder:text-[12px] text-[12px]"
            />
          </div>

          <button
            className="max-w-lg w-full py-3 text-white font-[400] rounded-lg flex justify-center items-center text-[14px] bg-primary hover:bg-orange-600 h-[50px] mx-[12px] mt-[20px]"
            onClick={handleSubmit}
            disabled={loadRating}
          >
            {loadRating ? (
              <div className="w-[24px] h-[24px] border-[2px] border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "SUBMIT RATING"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodRating;
