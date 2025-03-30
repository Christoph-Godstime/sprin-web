import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { RestaurantContext } from "../../context/RestaurantContext";
import { GoogleApiKey } from "../../constants/theme";
import { DirectionsService } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 540px)",
};

const Pickup = () => {
  const { restaurantObj } = useContext(RestaurantContext);
  const [coordinates, setCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 5.788121544177521,
    lng: 6.108269691467286,
  });
  const [loading, setLoading] = useState(true);
  const coords = restaurantObj?.coords;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GoogleApiKey,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLat = localStorage.getItem("latitude");
        const userLng = localStorage.getItem("longitude");
        if (userLat && userLng && coords) {
          const startLat = parseFloat(userLat);
          const startLng = parseFloat(userLng);
          const destinationLat = coords.latitude;
          const destinationLng = coords.longitude;

          await fetchDirections(
            startLat,
            startLng,
            destinationLat,
            destinationLng
          );
          setMapCenter({ lat: coords.latitude, lng: coords.longitude });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [coords]);

  const fetchDirections = async (
    startLat,
    startLng,
    destinationLat,
    destinationLng
  ) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${GoogleApiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK" && data.routes[0]) {
        const encodedPolyline = data.routes[0].overview_polyline.points;
        setCoordinates(decodePolyline(encodedPolyline));
      } else {
        console.error("Directions request failed:", data.status);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch directions:", error);
      setLoading(false);
    }
  };

  const decodePolyline = (encoded) => {
    const points = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let shift = 0;
      let result = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({
        lat: lat / 1e5,
        lng: lng / 1e5,
      });
    }

    return points;
  };

  const onDirectionClick = () => {
    if (!coords) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`,
      "_blank"
    );
  };

  if (!isLoaded || loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 h-auto p-[5px] ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
      >
        {coords && (
          <Marker
            position={{ lat: coords.latitude, lng: coords.longitude }}
            title="Restaurant Location"
          />
        )}
        {coordinates.length > 0 && (
          <Polyline
            path={coordinates}
            options={{ strokeColor: "#FF0000", strokeWeight: 3 }}
          />
        )}
      </GoogleMap>

      <div className="flex justify-between items-center mt-[5px] p-2">
        <p className="text-sm text-gray-600 w-3/4 line-clamp-2 mr-[8px]">
          {restaurantObj.coords.address}
        </p>
        <button
          className="border border-gray-300 px-4 py-2 rounded-lg text-[14px] w-[140px]"
          onClick={onDirectionClick}
        >
          🚶🏽‍♂️ Directions
        </button>
      </div>
    </div>
  );
};

export default Pickup;
