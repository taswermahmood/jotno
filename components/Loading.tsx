import { Dimensions, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView
                style={styles.lottie}
                autoPlay
                speed={1}
                source={require("@/assets/lotties/loading.json")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        justifyContent: "center",
        alignItems: "center"
    },
    lottie: {
        height: 200,
        width: 200
    }
})