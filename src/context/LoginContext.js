import React, { createContext, useState, useEffect } from "react";

// Create the context
export const LoginContext = createContext();

// Create the provider component
export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  // Function to update both AsyncStorage and the context
  const updateLoginStatus = async (status) => {
    try {
      localStorage.setItem("login", JSON.stringify(status));
      setLogin(status);
    } catch (error) {
      console.error("Error updating login status", error);
    }
  };

  // Initialize context value from AsyncStorage
  useEffect(() => {
    const initializeLoginStatus = async () => {
      try {
        const storedLoginStatus = localStorage.getItem("login");
        if (storedLoginStatus !== null) {
          setLogin(JSON.parse(storedLoginStatus));
        }
      } catch (error) {
        console.error("Error initializing login status", error);
      }
    };
    initializeLoginStatus();
  }, []);

  return (
    <LoginContext.Provider value={{ login, updateLoginStatus }}>
      {children}
    </LoginContext.Provider>
  );
};
