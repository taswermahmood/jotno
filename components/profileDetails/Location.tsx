import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Specialist } from "@/types/profiles/specialist";
import { Row } from "@/components/Row";
import { MapMarker } from "@/components/MapMarker";
import { theme } from "@/theme";
import { BORDER_RADIUS } from "@/constants";

export const LocationSection = ({ specialist, style}: { specialist: Specialist, style?: ViewStyle }) => {
  return (
    <View style={style}>
      <Text category={"h5"} style={styles.defaultVerticalMargin}>
        Location
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          userInterfaceStyle={"light"}
          initialRegion={{
            latitude: specialist.lat,
            longitude: specialist.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapMarker
            color={theme["color-primary-700"]}
            lat={specialist.lat}
            lon={specialist.lon}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultVerticalMargin: { 
    marginVertical: 10 
    },
  mapText: { 
    marginLeft: 10 
    },
  mapHeaderContainer: { 
    alignItems: "center", 
    marginVertical: 15,
    },
  mapContainer: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});