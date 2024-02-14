import { SafeAreaView, StyleSheet, ViewStyle, Platform, StatusBar } from "react-native"

export const Screen = ({
    children,
    style
}: {
    children: any;
    style?: ViewStyle
}) => {
    return <SafeAreaView style={[styles.container, style]}><StatusBar barStyle={"dark-content"} />{children}</SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
})