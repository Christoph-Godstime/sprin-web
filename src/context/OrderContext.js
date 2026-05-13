import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BaseUrl } from "../constants/theme";
import { SocketContext } from "./SocketContext";

const OrderContext = createContext();

const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const OrderProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [error, setError] = useState(null);

  // UseEffect to listen for order status updates from the socket
  useEffect(() => {
    if (!socket) return;

    const handleNewStatus = (newStatus) => {
      newStatus.shouldShake = true;
      setOrderDetails((prevStatus) => {
        const updatedStatus = prevStatus.filter(
          (order) => order._id !== newStatus._id
        );
        return [newStatus, ...updatedStatus];
      });
    };

    socket.on("newStatus", handleNewStatus);

    return () => socket.off("newStatus", handleNewStatus);
  }, [socket]);

  const fetchData = async () => {
    const accessToken = getAccessToken();
    setLoadingOrder(true);
    setOrderDetails([]);

    if (!accessToken) {
      setLoadingOrder(false);
      return;
    }

    try {
      const response = await axios.get(`${BaseUrl}/api/orders/userOrders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const reversedData = response.data.data.reverse();
      setOrderDetails(reversedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoadingOrder(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoadingOrder(true);
    fetchData();
  };

  return (
    <OrderContext.Provider
      value={{
        orderDetails,
        loadingOrder,
        error,
        refetch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
