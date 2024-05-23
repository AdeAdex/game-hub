import { useCallback, useState, useEffect } from "react";
import UAParser from "ua-parser-js";

export const useFetchLocation = () => {
  const [location, setLocation] = useState("");

  const fetchLocation = useCallback(async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const deviceLocation = data ? `${data.city} ${data.region} ${data.country_name}` : "Location permission denied";
      setLocation(deviceLocation);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return location;
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
