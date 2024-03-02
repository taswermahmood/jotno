import { View, StyleSheet, Platform } from "react-native";
import MapView, { Region, PROVIDER_GOOGLE } from "react-native-maps";
import { Specialist } from "@/types/profiles/specialist";
import { MapMarker } from "./MapMarker";
import { useEffect, useState } from "react";
import { theme } from "@/theme";
import { router, useNavigation } from "expo-router";
import { Card } from "./SearchCard";
import { Modal } from "react-native-paper";
import { HEADERHIGHT } from "@/constants";
import { Button } from "@ui-kitten/components";
import { getSpecialistsInArea } from "@/types/data";

let mapRegion: Region | undefined = undefined;

export const Map = ({
    profiles,
    mapRef,
    initialRegion,
    location,
    setLocation,
    setProfiles
}: {
    profiles: Specialist[];
    location: string;
    setLocation: (location: string) => void;
    setProfiles: (profile: Specialist[]) => void;
    mapRef?: React.MutableRefObject<MapView | null>
    initialRegion?: Region | undefined;
}) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [boundingBox, setBoundingBox] = useState<number[]>([]);
    const [region, setRegion] = useState<Region | undefined>(
        mapRegion ? mapRegion : undefined
    );
    const [showSearchAreaButton, setShowSearchAreaButton] = useState(false)

    const navigation = useNavigation();

    useEffect(() => {
        if (location === "Map Area") return;

        if (initialRegion) {
            setShowSearchAreaButton(false);
            setRegion(initialRegion);
        }
    }, [initialRegion]);

    const unFocusProperty = () => {
        setActiveIndex(-1);
        setShowModal(false);
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
    };
    const handleMapPress = () => {
        if (Platform.OS === "android") unFocusProperty();
    };
    const handleSearchAreaButtonPress = () => {
        setProfiles(getSpecialistsInArea(boundingBox))
        setLocation("Map Area");
        mapRegion = region;
        setShowSearchAreaButton(false);
    };
    const handleMarkerPress = (index: number) => {
        setTimeout(() => {
            mapRef?.current?.animateCamera({
                center: {
                    latitude: profiles[index].lat,
                    longitude: profiles[index].lon,
                },
            });
        }, 100);
        setTimeout(() => {
            const newRegion: Region = {
                latitude: profiles[index].lat,
                latitudeDelta:
                    region?.latitudeDelta && region.latitudeDelta < 4
                        ? region.latitudeDelta
                        : 4,
                longitude: profiles[index].lon,
                longitudeDelta:
                    region?.longitudeDelta && region.longitudeDelta < 4
                        ? region.longitudeDelta
                        : 4,
            };
            setRegion(newRegion);
        }, 600);

        setShowModal(true);
        setActiveIndex(index);
        navigation.setOptions({ tabBarStyle: { display: "none" } });
    };

    return <View style={styles.container} >

        <MapView style={styles.map}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            onPress={handleMapPress}
            showsUserLocation={true}
            region={region}
            userInterfaceStyle={"light"}
            onRegionChangeComplete={(region, isGesture) => {
                if (isGesture?.isGesture) {
                    if (!showSearchAreaButton) setShowSearchAreaButton(true);
                    const newBoundingBox = [
                        region.latitude - region.latitudeDelta / 2,
                        region.latitude + region.latitudeDelta / 2,
                        region.longitude - region.longitudeDelta / 2,
                        region.longitude + region.longitudeDelta / 2,
                    ];
                    setRegion(region);
                    setBoundingBox(newBoundingBox);
                }
            }}>
            {profiles.map((i, index) => (
                <MapMarker
                    lat={i.lat}
                    lon={i.lon}
                    onPress={() => handleMarkerPress(index)}
                    color={activeIndex === index ?
                        theme["color-primary-700"] : theme["color-info-500"]} />
            ),
            )}
        </MapView>
        {activeIndex > -1 && (
            <Modal visible={showModal} onDismiss={unFocusProperty} contentContainerStyle={styles.card}>
                <Card key={profiles[activeIndex].ID} profile={profiles[activeIndex]} onPress={() => { router.push({ pathname: "/screens/SpecialistDetails", params: { specialistID: profiles[activeIndex].ID } }) }} />
            </Modal>
        )}
        {showSearchAreaButton && activeIndex === -1 && (
            <Button style={[styles.searchAreaButton]} appearance="ghost" onPress={handleSearchAreaButtonPress}> Search Area </Button>
        )}
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: HEADERHIGHT - 5,
        overflow: "hidden",
    },
    map: {
        height: "100%",
        width: "100%",
    },
    card: {
        overflow: "hidden",
        padding: 5,
        position: "absolute",
        bottom: 0,
        width: "100%"
    },
    searchAreaButton: {
        position: "absolute",
        bottom: 30,
        zIndex: 100,
        borderRadius: 30,
        alignSelf: "center",
        backgroundColor: "white",
    },
});