import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

import { Logo } from "@/components/Logo";
import { Row } from "@/components/Row";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
    const {user} = useAuth()
    const router = useRouter();
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
                <Logo/>
            </Row>
        </Screen>
    </>
};
export default Index;

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
