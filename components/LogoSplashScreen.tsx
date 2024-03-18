import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

import { Row } from "@/components/Row";
import { Screen } from "@/components/Screen";

export const LogoSplashScreen = () => {
    return <>
        <Screen style={styles.container}>
            <Row style={{ alignItems: "center" }}>
                <LottieView
                    style={styles.lottie}
                    speed={1}
                    autoPlay
                    loop={false}
                    // onAnimationFinish={() => { !user ? router.push("/screens/SignUpSignIn") : router.push("/tabs/HomeScreen") }}
                    source={require("@/assets/lotties/indexLogo2.json")} />
            </Row>
        </Screen>
    </>
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center"
    },
    lottie: {
        height: 120,
        width: 120
    },
})
