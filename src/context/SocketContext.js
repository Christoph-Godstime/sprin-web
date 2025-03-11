import { useContext, createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { BaseUrl } from "../constants/theme";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const details = localStorage.getItem("user");
      if (details) {
        setUserDetails(JSON.parse(details));
      }
    };

    const fetchToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(JSON.parse(storedToken));
      }
    };

    fetchToken();

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (token && userDetails) {
      const socket = io(`${BaseUrl}`, {
        query: {
          userId: userDetails._id,
        },
      });

      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [token, userDetails]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
