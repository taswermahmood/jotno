import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { Screen } from "./Screen";

export const Laoding = () => {
    return <Screen style={styles.container}>
        <LottieView
            style={styles.lottie}
            autoPlay
            speed={3}
            source={require("@/assets/lotties/loading.json")} 
        />
    </Screen>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    lottie: {
        height: 250,
        width: 250
    }
})