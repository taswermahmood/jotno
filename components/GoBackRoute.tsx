import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { useRouter } from "expo-router";

export const GoBackRoute = () => {
    const router = useRouter();
    return <TouchableOpacity style={{
        padding: 5,
    }} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={theme["color-primary-500"]} />
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignSelf: "center"
    },
})