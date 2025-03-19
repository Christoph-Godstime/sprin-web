import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";
import { RestaurantContext } from "../context/RestaurantContext";

const useFetchRating = () => {
  const [data, setData] = useState({});

  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const { restaurantObj, setRestaurant } = useContext(RestaurantContext);

  const fetchData = async () => {
    if (!restaurantObj || !restaurantObj._id) return;

    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BaseUrl}/api/rating?restaurantId=${restaurantObj._id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      // console.log("rating data ",response.data);
      setData(response.data);

      setLoader(false);
    } catch (error) {
      setError(error);
      console.log("rating error ", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (restaurantObj?._id) {
      fetchData();
    }
  }, [restaurantObj]);

  const refetch = () => {
    setLoader(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetchRating;
