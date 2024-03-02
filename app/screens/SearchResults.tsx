import { StatusBar } from 'expo-status-bar';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { Screen } from "@/components/Screen";
import { Card } from '@/components/SearchCard';
import { HEADERHIGHT, LISTMARGIN } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { AnimatedListHeader } from '@/components/AnimatedListHeader';
import { Map } from '@/components/Map';
import { SearchScreenParams } from '@/types/searchResultsParams';
import MapView from 'react-native-maps';
import { router, useLocalSearchParams } from 'expo-router';
import { getSpecialistsInArea } from '@/types/data';
import { Specialist } from '@/types/profiles/specialist';
import { Text } from '@ui-kitten/components';
import LottieView from "lottie-react-native";
import { useTranslation } from 'react-i18next';

export default function SearchResultsScreen() {

  const { t } = useTranslation();

  const route = useLocalSearchParams<SearchScreenParams>();

  const [scrollAnimation] = useState(new Animated.Value(0));
  const [showMap, setShowMap] = useState<boolean>(false)
  const mapRef = useRef<MapView | null>(null)
  const [profiles, setProfiles] = useState<Specialist[]>([]);
  const [location, setLocation] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (route.lat) {
      const bb = String(route.boundingBox).split(",")
      const BoundingBox = [
        Number(bb[0]),
        Number(bb[1]),
        Number(bb[2]),
        Number(bb[3]),
      ];
      setLocation(route.location)
      setProfiles(getSpecialistsInArea(BoundingBox))
      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.lat),
          longitude: Number(route.lon),
        },
      });
    }
  }, [route.lat]);

  return (
    <Screen>
      <AnimatedListHeader
        setShowMap={setShowMap}
        showMap={showMap}
        location={route.location ? route.location : "Find Jotno Specialist near"}
        availableSpecialist={profiles ? profiles.length : undefined} />
      {showMap ?
        <Map
          profiles={profiles}
          mapRef={mapRef}
          location={location ? location : "Find Jotno Specialists"}
          setLocation={setLocation}
          setProfiles={setProfiles}
          initialRegion={route.lat ? {
            latitude: Number(route.lat),
            longitude: Number(route.lon),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          } : 
          { latitude: 23.7840395, 
            longitude: 90.40327833, 
            latitudeDelta: 0.3, 
            longitudeDelta: 0.3 }} /> :
        <>
          {profiles.length > 0 ? (
            <View style={styles.horizontalContainer}>
              <Animated.FlatList
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnimation
                      }
                    }
                  }
                ], { useNativeDriver: true })}
                scrollEventThrottle={15}
                contentContainerStyle={{ paddingTop: HEADERHIGHT }}
                bounces={false}
                data={profiles}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                  <Card key={item.ID} profile={item} onPress={() => { router.push({ pathname: "/screens/SpecialistDetails", params: { specialistID: item.ID } }) }}></Card>
                )}
              />
            </View>
          ) :
            <>
              {route.lat ? (
                <View style={styles.lottieContainer}>
                  <Text category={"h6"}>{t("No Jotno Specialist Found")}</Text>
                  <Text appearance={"hint"}>
                    {t("Please search in a different location.")}
                  </Text>
                </View>
              ) : (
                <View style={styles.lottieContainer}>
                  <LottieView
                    autoPlay
                    loop
                    style={styles.lottie}
                    source={require("@/assets/lotties/searchAnimation.json")}
                  />
                  <View style={styles.headerContainer}>
                    <Text category={"h6"}>{t("Begin Your Search")}</Text>
                    <Text appearance={"hint"} style={styles.subHeader}>
                      {t("Find Jotno Specialist anytime and anywhere.")}
                    </Text>
                  </View>
                </View>
              )}</>
          }
        </>
      }
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Screen >
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    marginHorizontal: LISTMARGIN,
  },
  lottieContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 250,
    width: 250
  },
  headerContainer: {
    marginHorizontal: 20,
    alignItems: "center"
  },
  subHeader: {
    marginTop: 10,
    textAlign: "center"
  },
});