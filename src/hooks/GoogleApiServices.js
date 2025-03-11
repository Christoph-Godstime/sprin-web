import axios from "axios";
import { GoogleApiKey, BaseUrl } from "../constants/theme";

const fetchRatePerKm = async () => {
  const backendUrl = `${BaseUrl}/api/users/ratePerKm`;
  try {
    const response = await axios.get(backendUrl);
    if (response.status === 200 && response.data.ratePerKm) {
      return response.data.ratePerKm;
    } else {
      console.warn("Failed to fetch rate per kilometer. Using default rate.");
      return 250; // Default rate per km
    }
  } catch (error) {
    console.error(
      "Error fetching rate per kilometer. Using default rate:",
      error
    );
    return 250; // Default rate per km
  }
};

const calculateDistanceAndTime = async (
  startLat,
  startLng,
  destinationLat,
  destinationLng,
  mode = "DRIVING"
) => {
  const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
  const ratePerKm = 250;

  const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${GoogleApiKey}`;
  try {
    const ratePerKm = await fetchRatePerKm();

    const response = await fetch(requestUrl);
    const data = await response.json();

    if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
      console.log("API returned valid data:", data);

      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;

      console.log("Parsed distance:", distance);
      console.log("Parsed duration:", duration);

      const distanceInKm = parseFloat(distance.replace(" km", ""));
      console.log("Parsed distance in km:", distanceInKm);

      const price = distanceInKm * ratePerKm;
      const finalPrice = Number(price.toFixed(0));
      console.log("Calculated finalPrice:", finalPrice);

      return {
        distance,
        duration,
        finalPrice,
      };
    } else {
      console.warn("API returned error or incomplete data:", data);
      return null;
    }
  } catch (error) {
    // console.error("Failed to calculate distance and duration:", error);
    return null;
  }
};

export default {
  calculateDistanceAndTime,
};
