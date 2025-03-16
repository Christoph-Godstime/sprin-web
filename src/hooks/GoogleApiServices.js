import axios from "axios";
import { BaseUrl } from "../constants/theme";

const fetchRatePerKm = async () => {
  const backendUrl = `${BaseUrl}/api/users/ratePerKm`;
  try {
    const response = await axios.get(backendUrl);
    return response.status === 200 && response.data.ratePerKm
      ? response.data.ratePerKm
      : 250;
  } catch (error) {
    console.error(
      "Error fetching rate per kilometer. Using default rate:",
      error
    );
    return 250; // Default rate
  }
};

const calculateDistanceAndTime = async (
  startLat,
  startLng,
  destinationLat,
  destinationLng,
  mode = "DRIVING"
) => {
  const requestUrl = `${BaseUrl}/api/users/calculate-distance?startLat=${startLat}&startLng=${startLng}&destinationLat=${destinationLat}&destinationLng=${destinationLng}&mode=${mode}`;

  try {
    const ratePerKm = await fetchRatePerKm();
    const response = await axios.get(requestUrl);

    if (response.data.distance && response.data.duration) {
      const distance = response.data.distance;
      const duration = response.data.duration;

      const distanceInKm = parseFloat(distance.replace(" km", ""));
      const price = distanceInKm * ratePerKm;
      const finalPrice = Math.round(price);

      return { distance, duration, finalPrice };
    } else {
      console.warn("Invalid response from backend:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error calculating distance:", error);
    return null;
  }
};

export default { calculateDistanceAndTime };
