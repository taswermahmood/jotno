import { Divider } from "@ui-kitten/components";
import { StyleSheet, ViewStyle } from "react-native";

export const JDivider = ({
    style,
}: {
    style?: ViewStyle | ViewStyle[];
}) => {
    return <Divider style={[styles.divider, style]} ></Divider>;
};

const styles = StyleSheet.create({
    divider: {
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 4,
    },
});