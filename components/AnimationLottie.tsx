import { Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ViewStyle } from "react-native";

export const AnimationLottie = ({
    title,
    subHeader,
    source,
    style,
}: {
    title?: string,
    subHeader?: string,
    source: any,
    style?: ViewStyle | ViewStyle[];
}) => {
    const { t } = useTranslation();
    return (
        <View style={styles.lottieContainer}>
            <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={source}
            />
            <View style={styles.headerContainer}>
                {title ? <Text category={"h6"}>{t(title)}</Text> : null}
                {subHeader ? <Text appearance={"hint"} style={styles.subHeader}> {t(subHeader)} </Text> : null}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    lottieContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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