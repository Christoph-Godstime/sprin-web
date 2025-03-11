import React, { useState, useRef, useEffect, useContext } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GoogleApiKey } from "../../constants/theme";
import { useNavigate } from "react-router-dom";
import { DefaultAddressContext } from "../../context/DefaultAddressContext";
import { GroceryStoreCategoryContext } from "../../context/GroceryStoreCategory";
import { NearByRestaurantsContext } from "../../context/NearByRestaurants";
import { TrySomethingNewContext } from "../../context/TrySomethingNewContext";
import { FastestNearYouContext } from "../../context/FastestNearYou";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BaseUrl } from "../../constants/theme";
import axios from "axios";
import { AuthContext } from "../../App";
import { BsArrowLeft } from "react-icons/bs";
import { LoginContext } from "../../context/LoginContext";

const AddAddresses = () => {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const { refetchDefaultAddress } = useContext(DefaultAddressContext);
  const { refetchGroceryStoreCategory } = useContext(
    GroceryStoreCategoryContext
  );
  const { refetchNearByRestaurants } = useContext(NearByRestaurantsContext);
  const { refetchTrySomethingNew } = useContext(TrySomethingNewContext);
  const { login } = useContext(LoginContext);
  const { refetchFastestNearYou } = useContext(FastestNearYouContext);

  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const swiperRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState({
    lat: 5.788121544177521,
    lng: 6.108269691467286,
  });
  const [address, setAddress] = useState("Default Address");
  const [postalCode, setPostalCode] = useState("");

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GoogleApiKey,
    libraries: ["places"], // Ensure Places API is loaded
  });

  useEffect(() => {
    if (!isLoaded) return; // Ensure Google Maps API is loaded

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPin({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);
        },
        () => setAddress("Default Address")
      );
    }
  }, [isLoaded]); // Add isLoaded as a dependency

  const reverseGeocode = async (latitude, longitude) => {
    if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
      console.error("Google Maps API not loaded yet.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
          setSelectedPlace(results[0].formatted_address); // Update input field

          const postalComponent = results[0].address_components.find(
            (component) => component.types.includes("postal_code")
          );

          setPostalCode(postalComponent ? postalComponent.long_name : "");
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      }
    );
  };

  const handlePlaceSelect = async (selected) => {
    if (!selected) return;

    const placeId = selected.value.place_id;
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setAddress(results[0].formatted_address);
        setPin({ lat: location.lat(), lng: location.lng() });

        const postalComponent = results[0].address_components.find(
          (component) => component.types.includes("postal_code")
        );
        setPostalCode(postalComponent ? postalComponent.long_name : "");
      }
    });
  };

  const handleSubmit = async () => {
    if (!login) {
      toast.info("Please login to add delivery address.", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/login");
      return; // Early return to prevent further code execution
    }
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);

    // console.log("this is region: ", region);
    setLoading(true);
    const data = {
      addressLine1: address,
      postalCode: postalCode,
      deliveryInstructions: deliveryInstructions,
      default: isDefaultAddress,
      latitude: pin.lat,
      longitude: pin.lng,
    };

    try {
      const response = await axios.post(`${BaseUrl}/api/address`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 201) {
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");

        localStorage.setItem(
          "latitude",
          JSON.stringify(response.data.latitude)
        );
        localStorage.setItem(
          "longitude",
          JSON.stringify(response.data.longitude)
        );
        await refetchDefaultAddress();
        await refetchGroceryStoreCategory();
        await refetchNearByRestaurants();
        await refetchTrySomethingNew();
        await refetchFastestNearYou();
        toast.success("Address added successfully.", {
          position: "top-center",
          autoClose: 3000,
        });

        navigate(-1);
      } else if (response.status === 200) {
        toast.success(
          "Address added successfully. No default address currently set. Please choose a default address.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );

        navigate(-1);
      } else {
        toast.error("Could not locate current default address.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
    setLoading(false);
  };

  const validatePage = (pageIndex) => {
    if (pageIndex > currentPage) {
      if (pageIndex === 1) {
        if (!address || !postalCode || !pin) {
          toast.warning("Please select a delivery location");
          return false;
        }
      }
    }
    return true;
  };

  const goToNext = () => {
    const nextPage = currentPage + 1;
    if (validatePage(nextPage)) {
      setCurrentPage(nextPage);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (difference > 50) {
      goToNext();
    } else if (difference < -50) {
      goToPrevious();
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          {/* Loading Text */}
          <p className="text-gray-600 text-base font-medium">
            Loading map, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full overflow-hidden"
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      {currentPage === 0 && (
        <div className="relative flex flex-col items-center h-screen  ">
          <div className="absolute top-10 w-full  max-w-lg py-[12px] z-10 px-4">
            {isLoaded && (
              <GooglePlacesAutocomplete
                apiKey={GoogleApiKey}
                selectProps={{
                  value: selectedPlace, // Ensure input value updates dynamically
                  onChange: handlePlaceSelect,
                  onInputChange: (newValue) => setSelectedPlace(newValue), // Allow manual input
                  placeholder: address === "" ? "Search" : address,
                  styles: {
                    control: (provided, state) => ({
                      ...provided,
                      width: "auto", // Keeps it dynamic but prevents shrinking
                      minWidth: provided.width, // Retains initial width
                      maxWidth: "100%", // Ensures it doesn't exceed parent width
                      borderColor: state.isFocused ? "#f97316" : "#E5E7EB",
                      boxShadow: state.isFocused ? "0 0 0 px #f97316" : "none",
                      "&:hover": { borderColor: "#f97316" },
                    }),
                  },
                }}
              />
            )}
          </div>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={pin}
            zoom={15}
            onLoad={(map) => (mapRef.current = map)}
          >
            <Marker
              position={pin}
              draggable
              onDragEnd={(e) => reverseGeocode(e.latLng.lat(), e.latLng.lng())}
            />
          </GoogleMap>
          <div className="absolute bottom-10  max-w-lg py-[12px] bg-[#FFA50040] p-4 rounded-[30px] shadow-lg text-center mx-4">
            <p className="mb-4 text-secondary  text-[10px] md: text-[12px]">
              Hold and drag the map marker or type the address to select your
              desired location.
            </p>
            <button
              className="w-full bg-orange-500 text-white p-[10px] rounded-[30px] hover:bg-orange-600"
              onClick={goToNext}
            >
              Confirm and Submit
            </button>
          </div>
        </div>
      )}

      {currentPage === 1 && (
        <div className="flex flex-col min-h-screen bg-white items-center pb-[50px]">
          <div className="w-full max-w-2xl flex justify-start items-center h-[60px] sticky top-0  z-40 px-[12px] bg-secondary">
            <button onClick={goToPrevious} className="text-white text-xl  ">
              <BsArrowLeft />
            </button>
            <h2 className="text-white  text-[12px] md: text-[14px] font-[500] ml-[30px]">
              Add Address
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-2xl pt-[20px] px-[12px] space-y-4">
            <input
              className="w-full p-2 border-b border-gray-400 focus:outline-none  text-[10px] md: text-[12px] placeholder: text-[10px]"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
            />
            <input
              className="w-full p-2 border-b border-gray-400 focus:outline-none  text-[10px] md: text-[12px] placeholder: text-[10px]"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <input
              className="w-full p-2 border-b border-gray-400 focus:outline-none  text-[10px] md: text-[12px] placeholder: text-[10px]"
              type="text"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              placeholder="Rider Delivery Instructions"
            />
            <div className="flex items-center justify-between w-full px-2">
              <h2 className=" text-[10px] md: text-[12px]">
                Set this address as default
              </h2>
              <label className="text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDefaultAddress}
                  onChange={() => setIsDefaultAddress(!isDefaultAddress)}
                  className="sr-only"
                />
                <div
                  className={`w-[54px] h-[30px] flex items-center bg-gray-400 rounded-full p-1 transition ${
                    isDefaultAddress ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                      isDefaultAddress ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="max-w-lg w-full py-3 text-white font-bold rounded-lg flex justify-center items-center bg-primary hover:bg-orange-600"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "S U B M I T"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddresses;
