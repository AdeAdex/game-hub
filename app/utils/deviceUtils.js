import { useCallback } from "react";
import UAParser from "ua-parser-js";

export const fetchLocation = useCallback(async (setLocation) => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    const deviceLocation = data ? `${data.city} ${data.region} ${data.country_name}` : "Location permission denied";
    setLocation(deviceLocation);
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}, []);

export const detectDevice = useCallback((setDevice) => {
  const parser = new UAParser();
  const result = parser.getResult();
  const deviceInfo = result.device.vendor
    ? `${result.device.vendor} ${result.device.model}`
    : result.os.name || "Unknown Device";
  setDevice(deviceInfo);
}, []);
