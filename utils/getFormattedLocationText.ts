import { Location, SearchLocation } from "../types/location";

export const getFormattedLocationText = (
  item: Location | SearchLocation,
  type: "autocomplete" | "search"
) => {
  let location = "";
  if (type === "search") {
    item = item as SearchLocation;
    location = item.display_name;
  } else {
    location += item.address?.name ? item.address.name : "";
    location += item.address?.neighbourhood ? ", " + item.address.neighbourhood : "";
    location += item.address?.city ? ", " + item.address.city : "";
  }
  return location;
};