import { SafeAreaView, StyleSheet, ViewStyle, StatusBar } from "react-native"

export const Screen = ({
    children,
    style,
}: {
    children: any;
    style?: ViewStyle
}) => {
    return <SafeAreaView style={[styles.container, style]}><StatusBar barStyle={"dark-content"} />{children}</SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
})