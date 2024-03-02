import { useState } from "react";
import { Share, View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Text } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { theme } from "@/theme";
import { Row } from "@/components/Row";
import { Specialist } from "@/types/profiles/specialist";
import { ImageCarousel } from "../ImageCarousel";
import { BORDER_RADIUS } from "@/constants";
import { Column } from "../Column";

export const SpecialistHeader = ({ specialist }: { specialist: Specialist }) => {
    //   const { user, setSavedProperties } = useUser();
    //   const saveProperty = useSavePropertyMutation();

    //   const alterUsersFavorites = (
    //     propertyID: number,
    //     type: "add" | "remove"
    //   ) => {
    //     let newProperties: number[] = user?.savedProperties
    //       ? [...user.savedProperties]
    //       : [];

    //     if (type === "add") newProperties.push(propertyID);
    //     else newProperties = newProperties.filter((i) => i !== propertyID);

    //     setSavedProperties(newProperties);
    //   };

    const handleHeartPress = () => {
        let op: "add" | "remove" = "add";
        if (specialist?.favorite) op = "remove";

        // alterUsersSavedProperties(property.ID, op);
        // saveProperty.mutate({ propertyID: property.ID, op });
    };

    const shareItem = async () => {
        try {
            await Share.share({
                message: "Check out this Jotno Specialist I found on Jotno App",
            });
        } catch (error: unknown) {
            alert("Sorry, we're unable to share");
        }
    };

    return (<>
        {specialist.firstName ? (<Text style={[{ alignSelf: "center" }, styles.defaultMarginTop]} category='h3'> Hey, I'm {specialist.firstName} </Text>) : null}
        <Row style={[styles.container, styles.defaultMarginTop]}>
            <View>
                <Text category={"h6"} appearance="hint">{specialist.location}</Text>
            </View>
            <Row style={styles.iconRow}>
                <MaterialIcons
                    onPress={async () => {
                        await shareItem();
                    }}
                    name="ios-share"
                    size={30}
                    color={theme["color-primary-500"]}
                    style={styles.shareIcon}
                />
                <MaterialCommunityIcons
                    onPress={handleHeartPress}
                    name={specialist?.favorite ? "heart" : "heart-outline"}
                    size={30}
                    color={theme["color-primary-500"]}
                />
            </Row>
        </Row>
        <ImageCarousel style={styles.defaultMarginTop} images={specialist.images} />
        <Row style={styles.rowContainer}>
            {specialist.experience ? <>
                <Column style={styles.columnAlign}>
                    <MaterialCommunityIcons name="briefcase-clock" size={24} color={theme["color-warning-400"]} />
                    <Text style={styles.textAlign}>{specialist.experience} years experience </Text>
                </Column>
            </> : null}
            {specialist.stars ? <>
                <Column style={styles.columnAlign}>
                    <MaterialCommunityIcons name="star" size={24} color={theme["color-warning-400"]} />
                    <Text style={styles.textAlign}>{specialist.stars} stars </Text>
                </Column>
            </> : null}
            {specialist.verified ?
                <Column style={styles.columnAlign}>
                    <MaterialCommunityIcons name="check-circle" size={24} color={theme["color-warning-400"]} />
                    <Text style={styles.textAlign}> Verified</Text>
                </Column>
                :
                <Column style={styles.columnAlign}>
                    <MaterialCommunityIcons name="close-circle" size={24} color={theme["color-danger-400"]} />
                    <Text style={styles.textAlign}> Not Verified</Text>
                </Column>
            }
        </Row>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
    },
    iconRow: {
        paddingRight: 5
    },
    shareIcon: {
        marginRight: 20,
        marginTop: -4,
    },
    defaultMarginTop: {
        marginTop: 10
    },
    textAlign: {
        textAlign: "center"
    },
    columnAlign: {
        width: 100,
        alignItems: "center"
    },
    rowContainer: {
        justifyContent: "space-around",
        backgroundColor: theme["color-primary-100"],
        borderRadius: BORDER_RADIUS,
        padding: 5,
        marginTop: 10,
        width: "80%",
        alignSelf: "center"
    }
});