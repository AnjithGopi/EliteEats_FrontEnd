import axios from "axios";
import { MAP_API } from "../../Constants/api";

export const getRestaurentLocations = async (postalCode: string) => {
  try {
    console.log("Location checking worked");
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: postalCode,
          key: MAP_API,
        },
      }
    );

    console.log("Response recieved:", response);

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
      const location = {
        latitude: lat,
        longitude: lng,
      };

      console.log("Location Object :::", location);

      return location;
    } else {
      console.log("Google Maps API returned an error:");
      console.log("Status:", response.data.status);
      console.log(
        "Error message:",
        response.data.error_message || "No error message provided"
      );
      console.log("Full response:", response.data);
    }
  } catch (error) {
    console.log("Error in finding the hotel location");
    console.log(error);
  }
};



