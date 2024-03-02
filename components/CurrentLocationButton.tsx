import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

import { Row } from "./Row";
import { theme } from "../theme";

export const CurrentLocationButton = ({ style }: { style?: ViewStyle }) => {
  const router = useRouter();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({accuracy: 1,});
    handleNavigate(location);
  };

  const handleNavigate = (location: Location.LocationObject) => {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let boundingBox = [
      (lat - 0.058).toString(),
      (lat + 0.058).toString(),
      (lon - 0.051).toString(),
      (lon + 0.051).toString(),
    ];

    router.push({
        pathname: "/screens/SearchResults", params: {
            location: "Jotno Specialist near you",
            lat: lat.toString(),
            lon: lon.toString(),
            boundingBox,
        }
    });
  };

  return (
    <Row style={[styles.container, style as ViewStyle]}>
      <FontAwesome
        name="location-arrow"
        size={24}
        style={styles.icon}
        color={theme["color-primary-500"]}
      />
      <TouchableOpacity onPress={async () => await getLocation()}>
        <Text style={styles.text} status={"info"}>
          Use my current location
        </Text>
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  icon: {
    marginLeft: 5,
  },
  text: {
    marginLeft: 10,
    fontWeight: "600",
  },
});