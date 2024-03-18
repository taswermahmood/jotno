import { BORDER_RADIUS, HEADERHIGHT, LISTMARGIN } from "@/constants";
import { Animated, StyleSheet, TouchableOpacity, } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, Text } from "@ui-kitten/components";

import { theme } from "@/theme";
import { Row } from "./Row";
import { Search } from "./Search";
import { Filter } from "./Filter";
import { MenuRoute } from "./MenuRoute";
import { router } from "expo-router";

export const AnimatedListHeader = ({
    jobName,
    location,
    setShowMap,
    availableSpecialist,
    showMap }: {
        jobName: string | string[],
        showMap: boolean,
        location: string,
        availableSpecialist?: number,
        setShowMap: (bool: boolean) => void
    }) => {
    const mapToggle = () => {
        if (showMap) return setShowMap(false)
        setShowMap(true)
    }

    return <Animated.View style={[styles.container]}>
        <Row>
            <MenuRoute />
            <Search onPress={() => router.push({ pathname: "/screens/FindJotno", params: { jobName: jobName } })} name={location} style={styles.grid} />
            <Filter />
        </Row>
        <Divider style={{ backgroundColor: theme["color-gray"], marginTop: 10, marginBottom: 10 }}></Divider>
        <Row style={[styles.grid, { justifyContent: "space-between" }]}>
            <Row>
                <MaterialCommunityIcons name="map-marker" size={18} color={theme["color-primary-500"]} />
                <Text category="c1" appearance="hint"> {availableSpecialist ? availableSpecialist + " Jotno Specialist found" : "Search for Jotno Specialist"}</Text>
            </Row>
            <Row>
                {showMap ?
                    <TouchableOpacity onPress={mapToggle}>
                        <Row style={styles.marginLeft}>
                            <MaterialCommunityIcons style={styles.center} name={"format-list-bulleted"} size={18} color={theme["color-primary-500"]} />
                            <Text style={{ fontWeight: "bold" }} category="c1" appearance="hint"> List</Text>
                        </Row>
                    </TouchableOpacity>
                    :
                    <>
                        <TouchableOpacity onPress={() => console.log("navigate sort")}>
                            <Row>
                                <MaterialCommunityIcons style={styles.center} name={"sort"} size={18} color={theme["color-primary-500"]} />
                                <Text style={{ fontWeight: "bold" }} category="c1" appearance="hint"> Sort</Text>
                            </Row>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={mapToggle}>
                            <Row style={styles.marginLeft}>
                                <MaterialCommunityIcons style={styles.center} name={"map"} size={18} color={theme["color-primary-500"]} />
                                <Text style={{ fontWeight: "bold" }} category="c1" appearance="hint"> Map</Text>
                            </Row>
                        </TouchableOpacity>
                    </>
                }
            </Row>
        </Row>
    </Animated.View>
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        paddingTop: 50,
        paddingHorizontal: LISTMARGIN,
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        borderRadius: BORDER_RADIUS,
        height: HEADERHIGHT,
        backgroundColor: "#fff",
    },
    center: {
        alignContent: "center"
    },
    marginLeft: {
        marginLeft: 20
    },
    grid: {
        flex: 1
    },
})