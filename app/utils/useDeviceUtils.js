import { useCallback, useState, useEffect } from "react";
import UAParser from "ua-parser-js";
import axios from "axios";

export const useFetchLocation = () => {
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");

  const fetchLocation = useCallback(() => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const locationResponse = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              setLocation(locationResponse.data.display_name);
              setLocationError(""); // Clear any previous errors
            } catch (error) {
              console.error("Error fetching location from Nominatim: ", error);
              setLocation("Location not found");
            }
          },
          (error) => {
            console.error("Error fetching location: ", error);
            setLocationError("Location permission denied.");
            setLocation("Location permission denied");
          }
        );
      } else {
        setLocationError("Geolocation is not supported by your browser.");
        setLocation("Geolocation not supported");
      }
    } catch (err) {
      console.error("Error fetching device and location info: ", err);
      setLocationError("An error occurred while fetching location.");
      setLocation("Location error");
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, locationError };
};

export const useDetectDevice = () => {
  const [device, setDevice] = useState("");

  const detectDevice = useCallback(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceInfo = result.device.vendor
      ? `${result.device.vendor} ${result.device.model}`
      : result.os.name || "Unknown Device";
    setDevice(deviceInfo);
  }, []);

  useEffect(() => {
    detectDevice();
  }, [detectDevice]);

  return device;
};
