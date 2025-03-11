import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

export const NearByRestaurantsContext = createContext();

export const NearByRestaurantsProvider = ({ children }) => {
  const [nearByRestaurants, setNearByRestaurants] = useState(null);
  const [loadNearByRestaurants, setLoadNearByRestaurants] = useState(true);
  const [restaurantError, setRestaurantError] = useState(null);
  const [coords, setCoords] = useState([6.108269691467286, 5.788121544177521]);

  const fetchNearByRestaurants = async () => {
    setLoadNearByRestaurants(true);

    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    try {
      let response;
      if (lat === null && lng === null) {
        response = await axios.get(
          `${BaseUrl}/api/restaurant/nearby?lat=${coords[1]}&lng=${coords[0]}`
        );
        console.log("absent from nearbyrestaurants");
      } else {
        response = await axios.get(
          `${BaseUrl}/api/restaurant/nearby?lat=${lat}&lng=${lng}`
        );
        console.log("present from nearbyrestaurants");
      }

      setNearByRestaurants(response.data);

      //   console.log(response.data);
      setLoadNearByRestaurants(false);
    } catch (error) {
      setRestaurantError(error);
    } finally {
      setLoadNearByRestaurants(false);
    }
  };

  useEffect(() => {
    fetchNearByRestaurants();
  }, []);

  const refetchNearByRestaurants = () => {
    setLoadNearByRestaurants(true);
    fetchNearByRestaurants();
  };

  return (
    <NearByRestaurantsContext.Provider
      value={{
        nearByRestaurants,
        loadNearByRestaurants,
        restaurantError,
        refetchNearByRestaurants,
      }}
    >
      {children}
    </NearByRestaurantsContext.Provider>
  );
};
