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
import { useLocalSearchParams } from 'expo-router';
import { getProfilesInArea } from '@/types/data';
import { Profile } from '@/types/profile';
import { Text } from '@ui-kitten/components';
import LottieView from "lottie-react-native";

export default function SearchResultsScreen() {
  const route = useLocalSearchParams<SearchScreenParams>();

  const [scrollAnimation] = useState(new Animated.Value(0));
  const [showMap, setShowMap] = useState<boolean>(false)
  const mapRef = useRef<MapView | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([]);
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
      setProfiles(getProfilesInArea(BoundingBox))
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
            latitudeDelta: 0.5,
            longitudeDelta: 0.5
          } : undefined} /> :
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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Card key={item.id} profile={item}></Card>
                )}
              />
            </View>
          ) :
            <>
              {route.lat ? (
                <View style={styles.lottieContainer}>
                  <Text category={"h6"}>No Jotno Specialist Found</Text>
                  <Text appearance={"hint"}>
                    Please search in a different location.
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
                  <Text category={"h6"}>Begin Your Search</Text>
                  <Text appearance={"hint"} style={styles.subHeader}>
                    Find Jotno Specialist anytime and anywhere.
                  </Text>
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
  lottie: { height: 250, width: 250 },
  subHeader: {
    marginTop: 10,
  },
});