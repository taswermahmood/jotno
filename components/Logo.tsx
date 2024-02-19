import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { BORDER_RADIUS } from "@/constants";
import { theme } from "@/theme";

export const Logo = () => {
    return <View style={styles.logoContainer}>
        <Text style={styles.logoText} category='h1'>Jotno</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignSelf: "center",
    },
    logoContainer: {
        backgroundColor: "#fff", 
        borderRadius: BORDER_RADIUS, 
        width: "30%", padding: 2
    },
    logoText: {
        alignSelf: "center", 
        color: theme["color-primary-900"]
    }
})