import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

export const FastestNearYouContext = createContext();

export const FastestNearYouProvider = ({ children }) => {
  const [fastestNearYou, setFastestNearYou] = useState(null);
  const [loadFastestNearYou, setLoadFastestNearYou] = useState(true);
  const [fastestNearYouError, setFastestNearYouError] = useState(null);
  const [coords, setCoords] = useState([6.108269691467286, 5.788121544177521]);

  const fetchFastestNearYou = async () => {
    setLoadFastestNearYou(true);

    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    try {
      let response;
      if (lat === null && lng === null) {
        response = await axios.get(
          `${BaseUrl}/api/foods/fastest-food?lat=${coords[1]}&lng=${coords[0]}`
        );
      } else {
        response = await axios.get(
          `${BaseUrl}/api/foods/fastest-food?lat=${lat}&lng=${lng}`
        );
      }

      setFastestNearYou(response.data);

      //   console.log(response.data);
      setLoadFastestNearYou(false);
    } catch (error) {
      setFastestNearYouError(error);
    } finally {
      setLoadFastestNearYou(false);
    }
  };

  useEffect(() => {
    fetchFastestNearYou();
  }, []);

  const refetchFastestNearYou = () => {
    setLoadFastestNearYou(true);
    fetchFastestNearYou();
  };

  return (
    <FastestNearYouContext.Provider
      value={{
        fastestNearYou,
        loadFastestNearYou,
        fastestNearYouError,
        refetchFastestNearYou,
      }}
    >
      {children}
    </FastestNearYouContext.Provider>
  );
};
