import React, { useState, useContext } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import useFetchDefaultAddress from "../hooks/useFetchDefaultAdress";
import { toast } from "react-toastify";
import useFetchAddresses from "../hooks/useFetchAddresses";

const OrderTile = ({ onClick, item }) => {
  const navigate = useNavigate();

  const { login, setLogin } = useContext(LoginContext);

  const {
    defaultAddress,
    isAddressLoading,
    refetch: fetchDeliveryAddress,
  } = useFetchDefaultAddress();

  const { refetch: addressRefetch } = useFetchAddresses();

  const handleAddressAdded = (newAddress) => {
    addressRefetch();
  };

  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const formattedOrderDateTime = format(
    new Date(item.updatedAt),
    "MMMM dd, yyyy h:mm a"
  );

  const reOrder = async () => {
    if (!login) {
      navigate("/login");
      toast.info("Please login to proceed to payment.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      await fetchDeliveryAddress();

      if (!isAddressLoading && defaultAddress === null) {
        navigate("/add-address", {
          onAddressAdded: handleAddressAdded,
        });
        toast.info("Please add a default delivery address.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        navigate("/payment", {
          state: {
            params: {
              orderItem: item.orderItems,
              totalPrice: item.orderTotal,
              storeId: item.storeId?._id,
              pack: item.orderItems.length,
              coords: item.storeId?.coords,
              storeType: item.storeType,
              fromCart: false,
            },
          },
        });
      }
    }
  };

  return (
    <div>
      {item.paymentStatus === "Completed" && (
        <div className="border border-gray-200 bg-white w-full max-w-2xl mt-5 rounded-xl p-4">
          <div className="flex items-center space-x-4 ">
            <img
              src={item.storeId?.logoUrl}
              alt="Store Logo"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className=" text-[12px] md:text-[14px] font-semibold text-black">
                {item.storeId?.title}
              </h2>
              <div className="flex items-center space-x-3 text-gray-500  text-[10px] md:text-[12px]">
                <span>
                  {item.orderItems.length} Item
                  {item.orderItems.length > 1 && "s"}
                </span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                <span>
                  {item.orderTotal.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex space-x-2  text-[10px] md:text-[12px] mt-1">
                <span
                  className={
                    item.orderStatus === "Cancelled"
                      ? "text-red-500"
                      : item.orderStatus === "Delivered"
                      ? "text-green-500"
                      : "text-gray-500"
                  }
                >
                  {item.orderStatus}:
                </span>
                <span>{formattedOrderDateTime}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4  text-[12px] md:text-[14px] ">
            <button
              onClick={onClick}
              className="w-1/2 border border-gray-300 bg-white text-black py-2 rounded-md mr-2"
            >
              View Details
            </button>
            <button
              onClick={reOrder}
              className="w-1/2 bg-primary text-white py-2 rounded-md ml-2"
            >
              Reorder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTile;
