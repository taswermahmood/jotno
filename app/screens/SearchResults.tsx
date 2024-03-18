import { StatusBar } from 'expo-status-bar';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kitten/components';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import MapView from 'react-native-maps';

import { Screen } from "@/components/Screen";
import { Card } from '@/components/SearchCard';
import { HEADERHIGHT, LISTMARGIN } from '@/constants';
import { AnimatedListHeader } from '@/components/AnimatedListHeader';
import { Map } from '@/components/Map';
import { SearchScreenParams } from '@/types/params/searchResultsParams';
import { useSearchSpecialistsQuery } from '@/hooks/queries/useSearchSpecialistsQuery';
import { camelCaseToWords } from '@/utils/handleCase';
import { useUser } from '@/hooks/useUser';
import { JDivider } from '@/components/Divider';
import { AnimationLottie } from '@/components/AnimationLottie';

export default function SearchResultsScreen() {

  const { user } = useUser()
  if (!user) return <Redirect href="/" />;

  const { t } = useTranslation();
  const { jobName } = useLocalSearchParams();
  const route = useLocalSearchParams<SearchScreenParams>();
  const [scrollAnimation] = useState(new Animated.Value(0));
  const [showMap, setShowMap] = useState<boolean>(false)
  const mapRef = useRef<MapView | null>(null)
  const [location, setLocation] = useState<string | undefined>(undefined);

  const initialRegion = {
    latitude: 23.7840395,
    longitude: 90.40327833,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  }
  let [boundingBox, setBoundingBox] = useState<number[]>([])

  if (route.lat) {
    const bb = String(route.boundingBox).split(",")
    boundingBox = [Number(bb[0]), Number(bb[1]), Number(bb[2]), Number(bb[3])];
  }

  const searchedSpecialists = useSearchSpecialistsQuery(boundingBox, jobName.toString())

  useEffect(() => {
    if (route.lat) {
      setLocation(route.location)
      searchedSpecialists.refetch()
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
        jobName={jobName}
        setShowMap={setShowMap}
        showMap={showMap}
        location={route.location ? route.location : `Find ${camelCaseToWords(jobName.toString())} Specialist near`}
        availableSpecialist={searchedSpecialists.data ? searchedSpecialists.data?.length : undefined} />
      {showMap ?
        <Map
          listBoundingBox={boundingBox}
          setListBoundingBox={setBoundingBox}
          specialists={searchedSpecialists?.data ? searchedSpecialists.data : []}
          jobName={jobName}
          mapRef={mapRef}
          location={location ? location : "Find Jotno Specialists"}
          setLocation={setLocation}
          initialRegion={
            route.lat ? {
              latitude: Number(route.lat),
              longitude: Number(route.lon),
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            } :
              initialRegion} /> :
        <>
          {searchedSpecialists.data && searchedSpecialists.data.length > 0 ? (
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
                data={searchedSpecialists.data}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                  <>
                    <Card key={item.ID} specialist={item} jobName={jobName.toString()} onPress={() => { router.push({ pathname: "/screens/SpecialistDetails", params: { specialistID: item.ID, jobName: jobName } }) }}></Card>
                    <JDivider />
                  </>
                )}
              />
            </View>
          ) :
            <>
              {!searchedSpecialists.isFetching ?
                <>
                  {route.lat ?
                    <View style={styles.container}>
                      <Text category={"h6"}>{t("No Jotno Specialist Found")}</Text>
                      <Text appearance={"hint"}>
                        {t("Please search in a different location.")}
                      </Text>
                    </View>
                    :
                    <AnimationLottie
                      title="Begin Your Search"
                      subHeader="Find Jotno Specialist anytime and anywhere."
                      source={require("@/assets/lotties/searchAnimation.json")}
                    />
                  }
                </> : null}
            </>
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
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});