import { SafeAreaView, StyleSheet, ViewStyle, StatusBar } from "react-native"
import { Loading } from "./Loading";
import { useLoading } from "@/hooks/useLoading";

export const Screen = ({
    children,
    style,
}: {
    children: any;
    style?: ViewStyle
}) => {
    const { loading } = useLoading();
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle={"dark-content"} />
            {loading ? <Loading /> : children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
})