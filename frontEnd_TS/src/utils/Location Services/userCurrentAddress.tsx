import axios from "axios";
import { MAP_API } from "../../Constants/api";
export const getUserCurrentAddress = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API}`
    );

    const address = response.data.results[0].formatted_address;
    console.log("Address of current Location of user:::", address);

    return address;
  } catch (error) {
    console.log(error);
  }
};
