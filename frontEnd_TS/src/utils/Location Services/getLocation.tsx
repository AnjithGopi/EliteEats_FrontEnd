// export const getLocation = async () => {
//   try {
//     console.log("Location service working");

//     if (!navigator.geolocation) {
//       alert("! geo location not supported");

//       return;
//     }

//     const position = await new Promise<GeolocationPosition>(
//       (resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//       }
//     );

//     console.log("Position of user:",position)

//     const location = {
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//     };

//     return location;
//   } catch (error) {
//     console.log(error);
//   }
// };
import axios from "axios";

export const getLocation = async () => {
  try {
   
    if (navigator.geolocation) {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true, // Prefer GPS if available
            timeout: 5000, // Wait max 5 seconds
            maximumAge: 0, // Don't use cached location
          });
        }
      );

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy, // Meters (useful for checking precision)
        source: "GPS",
      };
    }

   
    const ipResponse = await axios.get("https://ipapi.co/json/");
    const ipData = ipResponse.data;

    if (ipData.latitude && ipData.longitude) {
      return {
        latitude: ipData.latitude,
        longitude: ipData.longitude,
        accuracy: 5000, // Approximate accuracy in meters (IP is city-level)
        source: "IP",
      };
    }

    throw new Error("Geolocation not supported and IP lookup failed.");
  } catch (error) {
    console.error("Location Error:", error);
    return null; // Handle this in your login flow
  }
};
