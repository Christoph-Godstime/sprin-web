import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

export const TrySomethingNewContext = createContext();

export const TrySomethingNewProvider = ({ children }) => {
  const [trySomethingNew, setTrySomethingNew] = useState(null);
  const [loadTrySomethingNew, setLoadTrySomethingNew] = useState(true);
  const [trySomethingNewError, setTrySomethingNewError] = useState(null);
  const [coords, setCoords] = useState([6.108269691467286, 5.788121544177521]);

  const fetchTrySomethingNew = async () => {
    setLoadTrySomethingNew(true);

    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    try {
      let response;
      if (lat === null && lng === null) {
        response = await axios.get(
          `${BaseUrl}/api/foods/nearby?lat=${coords[1]}&lng=${coords[0]}`
        );
      } else {
        response = await axios.get(
          `${BaseUrl}/api/foods/nearby?lat=${lat}&lng=${lng}`
        );
      }

      setTrySomethingNew(response.data);

      //   console.log(response.data);
      setLoadTrySomethingNew(false);
    } catch (error) {
      setTrySomethingNewError(error);
    } finally {
      setLoadTrySomethingNew(false);
    }
  };

  useEffect(() => {
    fetchTrySomethingNew();
  }, []);

  const refetchTrySomethingNew = () => {
    setLoadTrySomethingNew(true);
    fetchTrySomethingNew();
  };

  return (
    <TrySomethingNewContext.Provider
      value={{
        trySomethingNew,
        loadTrySomethingNew,
        trySomethingNewError,
        refetchTrySomethingNew,
      }}
    >
      {children}
    </TrySomethingNewContext.Provider>
  );
};
