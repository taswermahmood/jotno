import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Row } from "./Row";
import { theme } from "@/theme";
import { BORDER_RADIUS } from "@/constants";

export const Search = ({
    name,
    style,
    onPress
}: {
    name?: any;
    style?: ViewStyle;
    onPress?: () => void
}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Row style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="magnify" color={theme["color-primary-500"]} size={28} />
                <Text numberOfLines={1} style={{ marginLeft: 10, width: "90%"}}>{name}</Text>
            </Row>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: theme["color-gray"],
        padding: 10,
        borderRadius: BORDER_RADIUS
    },
})