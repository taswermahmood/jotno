import { View, StyleSheet } from "react-native";
import { MapMarker } from "./MapMarker";
import { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Modal } from "react-native-paper";
import { Button } from "@ui-kitten/components";
import MapView, { Region, PROVIDER_GOOGLE } from "react-native-maps";

import { theme } from "@/theme";
import { Card } from "./SearchCard";
import { HEADERHIGHT } from "@/constants";
import { Specialist } from "@/types/profiles/specialist";
import { useSearchSpecialistsQuery } from "@/hooks/queries/useSearchSpecialistsQuery";

let mapRegion: Region | undefined = undefined;

export const Map = ({
    specialists,
    jobName,
    mapRef,
    initialRegion,
    location,
    setLocation,
    listBoundingBox,
    setListBoundingBox,
}: {
    listBoundingBox: number[];
    specialists: Specialist[];
    jobName: string | string[];
    location: string;
    setListBoundingBox: (boundingBox: number[]) => void
    setLocation: (location: string) => void;
    mapRef?: React.MutableRefObject<MapView | null>;
    initialRegion?: Region | undefined;
}) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [boundingBox, setBoundingBox] = useState<number[]>(listBoundingBox ? listBoundingBox : []);
    const [region, setRegion] = useState<Region | undefined>(mapRegion ? mapRegion : undefined);
    const [showSearchAreaButton, setShowSearchAreaButton] = useState(false)

    const searchedSpecialists = useSearchSpecialistsQuery(boundingBox, jobName);

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
    };
    const handleMapPress = () => {
        unFocusProperty();
    };
    const handleSearchAreaButtonPress = () => {
        searchedSpecialists.refetch();
        setListBoundingBox(boundingBox);
        setLocation("Map Area");
        mapRegion = region;
        setShowSearchAreaButton(false);
    };
    const handleMarkerPress = (index: number) => {
        setTimeout(() => {
            mapRef?.current?.animateCamera({
                center: {
                    latitude: specialists[index].lat,
                    longitude: specialists[index].lon,
                },
            });
        }, 100);
        setTimeout(() => {
            const newRegion: Region = {
                latitude: specialists[index].lat,
                latitudeDelta: region?.latitudeDelta && region.latitudeDelta < 4
                    ? region.latitudeDelta
                    : 4,
                longitude: specialists[index].lon,
                longitudeDelta: region?.longitudeDelta && region.longitudeDelta < 4
                    ? region.longitudeDelta
                    : 4,
            };
            setRegion(newRegion);
        }, 600);

        setShowModal(true);
        setActiveIndex(index);
    };

    return (
        <View style={styles.container} >
            <MapView style={styles.map}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                onPress={handleMapPress}
                showsUserLocation={true}
                region={region}
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
                {specialists && specialists.map((i, index) => (
                    <MapMarker
                        key={i.ID}
                        lat={i.lat}
                        lon={i.lon}
                        onPress={() => handleMarkerPress(index)}
                        color={activeIndex === index ?
                            theme["color-info-500"] : theme["color-info-900"]}
                    />
                ))}
            </MapView>
            {activeIndex > -1 && (
                <Modal visible={showModal} onDismiss={unFocusProperty} contentContainerStyle={styles.card}>
                    <Card
                        specialist={specialists[activeIndex]}
                        onPress={() => { router.push({ pathname: "/screens/SpecialistDetails", params: { specialistID: specialists[activeIndex].ID, jobName: jobName } }) }}
                    />
                </Modal>
            )}
            {showSearchAreaButton && activeIndex === -1 && (
                <Button style={[styles.searchAreaButton]} appearance="ghost" onPress={handleSearchAreaButtonPress}> Search Area </Button>
            )}
        </View>
    )
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