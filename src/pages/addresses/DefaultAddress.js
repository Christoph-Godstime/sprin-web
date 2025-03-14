import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constants/theme";
import { CheckUserAddressType } from "../../context/CheckUserAddressType";
import { DefaultAddressContext } from "../../context/DefaultAddressContext";
import { GroceryStoreCategoryContext } from "../../context/GroceryStoreCategory";
import { NearByRestaurantsContext } from "../../context/NearByRestaurants";
import { TrySomethingNewContext } from "../../context/TrySomethingNewContext";
import { FastestNearYouContext } from "../../context/FastestNearYou";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { CheckLoadRestaurantData } from "../../context/CheckRestaurantData";

const DefaultAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};

  const { setCheckUserAddressType } = useContext(CheckUserAddressType);
  const { setDefaultAddress } = useContext(DefaultAddressContext);
  const { setLoadRestaurantData } = useContext(CheckLoadRestaurantData);
  const { refetchGroceryStoreCategory } = useContext(
    GroceryStoreCategoryContext
  );
  const { refetchNearByRestaurants } = useContext(NearByRestaurantsContext);
  const { refetchTrySomethingNew } = useContext(TrySomethingNewContext);
  const { refetchFastestNearYou } = useContext(FastestNearYouContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    const url = `${BaseUrl}/api/address/default/${id}`;
    try {
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("latitude", response.data.latitude);
        localStorage.setItem("longitude", response.data.longitude);
        toast.success("Address set to default successfully.", {
          position: "top-center",
          autoClose: 3000,
        });

        navigate("/shipping-address", { replace: true });

        setDefaultAddress(response.data);
        refetchGroceryStoreCategory();
        refetchNearByRestaurants();
        refetchTrySomethingNew();
        refetchFastestNearYou();
        setCheckUserAddressType(true);
        await setLoadRestaurantData(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[50px]">
      <Header text="Edit Profile Details" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        <div className="w-full  p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className=" text-[12px] md:text-[14px] font-medium text-black mb-2">
            Set this address as default
          </h2>

          <p className=" text-[10px] md:text-[12px] text-gray-600 mb-4">
            {data?.addressLine1}
          </p>
          <div className="flex justify-center mt-[20px]">
            <button
              onClick={() => handleSubmit(data._id)}
              className="max-w-lg w-full py-3 text-white font-bold rounded-lg flex justify-center items-center bg-primary hover:bg-orange-600"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "D E F A U L T"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultAddress;
