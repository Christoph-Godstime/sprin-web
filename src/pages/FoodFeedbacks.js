import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BaseUrl } from "../constants/theme";
import { format } from "date-fns";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { BsStars } from "react-icons/bs";

const FoodFeedbacks = () => {
  const location = useLocation();

  const { foodId } = location.state || {};

  const [feedbacks, setFeedbacks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/rating/feedbacks/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFeedbacks(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [foodId]);

  const RatingInput = ({ rating, size, maxStars, color }) => {
    return (
      <div className="flex space-x-[5px]">
        {[...Array(maxStars)].map((_, index) => (
          <FaStar
            key={index}
            size={size}
            className={index < rating ? `${color}` : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[200px]">
      {isLoading && <Loading />}
      <Header text="Food Feedbacks" />
      <div className="w-full max-w-2xl  ]">
        <div className="bg-indigo-100 flex flex-col items-center justify-center h-40 relative">
          <h2 className="text-xl font-bold mb-[20px]">
            {feedbacks?.rating?.toFixed(1)}
          </h2>
          <RatingInput
            rating={Math.floor(feedbacks?.rating)}
            size={25}
            maxStars={5}
            color="text-yellow-400"
          />
          <p className="text-[12px] md:text-[14px] font-semibold mt-2">
            ({feedbacks?.ratingCount?.toLocaleString()} reviews)
          </p>
          <div className="absolute right-0">
            <BsStars size={100} color="#ffedd5" />
          </div>
          <div className="absolute right-10 bottom-20">
            <BsStars size={30} color="#a5b4fc" />
          </div>
          <div className="absolute left-10 top-20">
            <BsStars size={50} color="#ffedd5" />
          </div>
          <div className="absolute left-16 bottom-10">
            <BsStars size={70} color="#c7d2fe" />
          </div>
        </div>
        <div className="px-[12px]">
          <h3 className="text-[14px] font-[500] mt-4">
            Review text ({feedbacks?.feedbacks?.length})
          </h3>
          <div className="mt-[8px]">
            {feedbacks?.feedbacks?.length > 0 ? (
              feedbacks.feedbacks.map((item) => (
                <div
                  key={item._id}
                  className="p-[8px] border-b border-gray-300"
                >
                  <div className="flex justify-between">
                    <p className="text-base font-medium text-[12px] md:text-[14px]">
                      {item?.userId?.firstName}
                    </p>
                    <p className="text-gray-500 text-[12px] md:text-[14px]">
                      {format(new Date(item?.createdAt), "MMMM dd, yyyy")}
                    </p>
                  </div>
                  <RatingInput
                    rating={item?.rating}
                    size={15}
                    maxStars={5}
                    color="text-yellow-400"
                  />
                  <p className="mt-2 text-gray-700 text-[12px] md:text-[14px]">
                    {item?.feedback}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-[100px]">
                No Customer Reviews Yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodFeedbacks;
