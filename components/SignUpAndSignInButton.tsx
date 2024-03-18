import { BUTTON_BORDER_RADIUS } from "@/constants"
import { theme } from "@/theme"
import { Button } from "@ui-kitten/components"
import { StyleSheet, View, ViewStyle } from "react-native"
import { useRouter } from "expo-router"

export const SignUpAndSignInButton = ({
    style
}: {
    style?: ViewStyle
}) => {
    const router = useRouter();
    return <View>
        <Button
            appearance='filled'
            size="large"
            style={styles.button}
            onPress={() => { router.push("/screens/authentication/SignUpScreen") }} >
                Create an account
        </Button>
        <Button
            appearance='ghost'
            size="large"
            style={styles.button}
            onPress={() => { router.push("/screens/authentication/SignInScreen") }} >
                Login
        </Button>
    </View>

}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        width: "80%",
        marginVertical: 10,
        borderRadius: BUTTON_BORDER_RADIUS,
        borderWidth: 1,
        borderColor: theme["color-primary-500"]
    }
})