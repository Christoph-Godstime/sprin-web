import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

const UserProfileContext = createContext();

const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

const UserProfileProvider = ({ children }) => {
  const [profileDetails, setProfileDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const accessToken = getAccessToken();
    setIsLoading(true);

    if (!accessToken) {
      setProfileDetails({});
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BaseUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfileDetails(response.data);
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  const updateProfileDetails = (updatedProfileDetails) => {
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedProfileDetails,
    }));
  };

  return (
    <UserProfileContext.Provider
      value={{
        profileDetails,
        isLoading,
        error,
        refetch,
        updateProfileDetails,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
