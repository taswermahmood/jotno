import { LISTMARGIN } from "@/constants";
import { StyleSheet, View, ViewStyle } from "react-native";

export const ScreenView = ({
  children,
  style,
}: {
  children: any,
  style?: ViewStyle | ViewStyle[];
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: LISTMARGIN, 
    flex: 1
  },
});