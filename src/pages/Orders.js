import React, { useEffect, useCallback } from "react";
import BottomNavBar from "../components/BottomNavBar";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import OrderTile from "../components/OrderTile";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const Orders = () => {
  const navigate = useNavigate();
  const { orderDetails, loadingOrder, error, refetch } = useOrder();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center pb-[100px] ">
      <ScrollToTopOnMount />
      <div className="w-full max-w-2xl flex justify-start items-center h-[60px] sticky top-0  z-40 px-[12px] bg-white shadow-lg">
        <h2 className="text-black  text-[12px] md:text-[14px] font-[500]">
          Orders
        </h2>
      </div>
      <div className="w-full max-w-2xl px-[12px]">
        {loadingOrder ? (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            {!orderDetails || Object.keys(orderDetails).length === 0 ? (
              <div className="fixed inset-0 flex flex-col items-center justify-center">
                <p className=" text-[12px] md:text-[14px] font-[400]">
                  No Past or Ongoing Order
                </p>
                <button
                  onClick={() => navigate("/home")}
                  className="mt-6 bg-primary text-white  text-[12px] md:text-[14px] font-[500] py-3 px-6 rounded-lg"
                >
                  Make your first order
                </button>
              </div>
            ) : (
              <div className="space-y-4 pb-12">
                {orderDetails.map((item) => (
                  <OrderTile
                    key={item._id}
                    item={item}
                    onClick={() =>
                      navigate("/order-details", {
                        state: {
                          coordinates: item.storeId.location.coordinates,
                          storeId: item.storeId,
                          orderItems: item.orderItems,
                          data: item,
                          storeType: item.storeType,
                        },
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Orders;
