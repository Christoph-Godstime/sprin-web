import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { RestaurantContext } from "../../context/RestaurantContext";
import { GoogleApiKey } from "../../constants/theme";

const containerStyle = {
  width: "100%",
  height: "400px",
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
          setMapCenter({ lat: startLat, lng: startLng });
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
    let index = 0,
      lat = 0,
      lng = 0;
    while (index < encoded.length) {
      let shift = 0,
        result = 0,
        byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lat += result & 1 ? ~(result >> 1) : result >> 1;

      (shift = 0), (result = 0);
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lng += result & 1 ? ~(result >> 1) : result >> 1;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
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
    <div className="bg-gray-100 h-auto p-4">
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

      <div className="flex justify-between items-center mt-4 p-2">
        <p className="text-sm text-gray-600 w-3/4">
          {restaurantObj.coords.address}
        </p>
        <button
          className="border border-gray-300 px-4 py-2 rounded-lg text-md"
          onClick={onDirectionClick}
        >
          🚶🏽‍♂️ Directions
        </button>
      </div>
    </div>
  );
};

export default Pickup;
