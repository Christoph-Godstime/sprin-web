import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import GoogleApiServices from "../hooks/GoogleApiServices";
import { PlaceholderImage } from "../constants/theme";

const StoreComponent = ({ item, onPress }) => {
  const [distanceTime, setDistanceTime] = useState({});
  const [loading, setLoading] = useState(true);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formattedOrderDateTime = format(new Date(item?.openingTime), "h:mm a");

  const calculateDistanceAndTime = async () => {
    try {
      const lat = localStorage.getItem("latitude");
      const long = localStorage.getItem("longitude");

      if (lat && long && item.coords.latitude && item.coords.longitude) {
        const result = await GoogleApiServices.calculateDistanceAndTime(
          lat,
          long,
          item.coords.latitude,
          item.coords.longitude
        );
        if (result) {
          setDistanceTime(result);
        }
      }
    } catch (error) {
      console.error(
        "Error retrieving coordinates or calculating distance:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateDistanceAndTime();
  }, []);

  const durationInMinutes =
    typeof distanceTime.duration === "number"
      ? distanceTime.duration
      : parseFloat(distanceTime.duration);

  const totalMins = isNaN(durationInMinutes)
    ? ""
    : durationInMinutes * 2 + " mins";

  return (
    <div
      onClick={onPress}
      className=" bg-white p-2 rounded-[16px] cursor-pointer w-[350px] min-w-[350px] relative"
    >
      <img
        src={isImageLoaded ? item.imageUrl : PlaceholderImage}
        alt="Store"
        className={`w-full h-40 rounded-md ${
          isImageLoaded ? "object-cover" : "object-contain"
        }`}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(false)}
      />
      {item?.isActive === false && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center rounded-xl">
          <p className="text-white text-xl font-medium">Closed</p>
          <p className="text-white text-base mt-2">
            Opens at {formattedOrderDateTime}
          </p>
        </div>
      )}
      <div className="flex items-center mt-2">
        <img src={item.logoUrl} alt="Logo" className="w-12 h-12 rounded-full" />
        <div className="ml-3 flex-1">
          <p className="text-[12px] font-[500] truncate w-full">{item.title}</p>
          <div className="flex justify-between items-center mt-1">
            {item.ratingCount === 0 ? (
              <div className="flex items-baseline">
                <span className="text-primary text-lg">★</span>
                <span className="ml-1 text-black text-[12px]">5.0</span>
                <span className="ml-1 text-black text-[12px]">(0)</span>
              </div>
            ) : (
              <div className="flex items-baseline">
                <span className="text-primary text-lg">★</span>
                <span className="ml-1 text-black text-[12px]">
                  {item.rating?.toFixed(1)}
                </span>
                <span className="ml-1 text-black text-[12px]">
                  ({item.ratingCount})
                </span>
              </div>
            )}
            <span className="text-black text-[12px]">Instant Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreComponent;
