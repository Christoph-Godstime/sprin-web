import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";

const useFetchProfile = () => {
  const [user, setProfile] = useState(null);
  const [isProfileLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const accessToken = JSON.parse(token);

      // Fetch user profile
      const userInfo = localStorage.getItem("user");
      setProfile(JSON.parse(userInfo));
    } catch (err) {
      setError(err);
    } finally {
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

  return { user, isProfileLoading, error, refetch };
};

export default useFetchProfile;
