import { TouchableOpacity, Platform, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Row } from "./Row";
import { theme } from "@/theme";

export const Filter = () => {
    return <TouchableOpacity style={styles.container} onPress={() => console.log("filter")}>
        <Row style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="filter-variant" color={theme["color-primary-500"]} size={28} />
        </Row>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignSelf: "center"
    },
})