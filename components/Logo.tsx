import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { BORDER_RADIUS } from "@/constants";
import { theme } from "@/theme";

export const Logo = () => {
    return <Text style={styles.logoText} category='h1'>Jotno</Text>

}

const styles = StyleSheet.create({
    logoText: {
        alignSelf: "center",
        color: theme["color-primary-900"]
    }
})