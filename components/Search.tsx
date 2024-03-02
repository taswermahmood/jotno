import { TouchableOpacity, StyleSheet, ViewStyle, Platform, useAnimatedValue } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Row } from "./Row";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { BORDER_RADIUS } from "@/constants";

export const Search = ({
    location,
    style,
}: {
    location?: any
    style?: ViewStyle
}) => {
    const navigation = useRouter ();
    return <TouchableOpacity style={[styles.container, style]} onPress={() => navigation.push("/screens/FindJotno")}>
        <Row style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="magnify" color={theme["color-primary-500"]} size={28} />
            <Text style={{ marginLeft: 10 }}>{location}</Text>
        </Row>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: theme["color-gray"],
        padding: 10,
        borderRadius: BORDER_RADIUS
    },
})