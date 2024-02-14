import { StyleSheet, View, ViewStyle } from "react-native";

export const Divider = ({
  style,
}: {
  style?: ViewStyle;
}) => {
  return <View style={[styles.container, style]}></View>;
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'black', 
    borderBottomWidth: 1,
  },
});