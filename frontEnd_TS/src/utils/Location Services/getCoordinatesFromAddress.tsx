import axios from "axios";
import { MAP_API } from "../../Constants/api";

export const getCoordinatesFromAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${MAP_API}`
    );

    if (response) {
      const result = response.data.results[0].geometry.location;

      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
