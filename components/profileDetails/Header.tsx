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
import { useUser } from "@/hooks/useUser";
import { useFavoritedSpecialialistMutation } from "@/hooks/mutations/useFavoritedSpecialistMutation";
import { FavoriteIcon } from "../FavoriteIcon";

export const SpecialistHeader = ({ specialist }: { specialist: Specialist }) => {
    const { user } = useUser();

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
                    onPress={async () => { await shareItem() }}
                    name="ios-share"
                    size={30}
                    color={theme["color-primary-500"]}
                    style={styles.shareIcon}
                />
                <FavoriteIcon specialist={specialist} size={30} />
            </Row>
        </Row>
        <ImageCarousel style={styles.defaultMarginTop} images={specialist.images} indexShown={true} avatar={specialist.avatar} />
        <Row style={styles.rowContainer}>
            <Column style={styles.columnAlign}>
                <MaterialCommunityIcons name="briefcase-clock" size={24} color={theme["color-warning-500"]} />
                <Text style={styles.textAlign}>{specialist.experience === 0 ? "New to Jotno" : specialist.experience + " years experience"} </Text>
            </Column>
            <Column style={styles.columnAlign}>
                <MaterialCommunityIcons name="star" size={24} color={theme["color-warning-500"]} />
                <Text style={styles.textAlign}> {specialist.stars === 0 ? "No Reviews" : specialist.stars + " stars"} </Text>
            </Column>
            <Column style={styles.columnAlign}>
                <MaterialCommunityIcons name={specialist.verified ? "check-circle" : "close-circle"} size={24} color={theme["color-warning-500"]} />
                <Text style={styles.textAlign}>{specialist.verified ? "Verified" : "Not Verified"}</Text>
            </Column>
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
        marginRight: 10,
        marginTop: -2,
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