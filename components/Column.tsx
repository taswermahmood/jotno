import { StyleSheet, View, ViewStyle } from "react-native";

export const Column = ({
  children,
  style,
}: {
  children: any;
  style?: ViewStyle | ViewStyle[];
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});