import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";

import { Row } from "./Row";
import { BORDER_RADIUS } from "@/constants";

export const ModalHeader = ({
  xShown,
  text,
  onPress,
  style,
}: {
  xShown?: boolean;
  text?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}) => {
  const navigation = useRouter();

  if (text) {
    return (
      <Row style={[styles.container, style as ViewStyle]}>
        {xShown ? (
          <MaterialCommunityIcons
            onPress={() => navigation.back()}
            style={styles.x}
            name="close"
            color={"black"}
            size={24}
          />
        ) : null}
        <Text category={"h5"}>{text}</Text>
      </Row>
    );
  }

  return (
    <View style={[styles.container, style as ViewStyle]}>
      <View style={styles.bar} />
    </View>
  );
};

const styles = StyleSheet.create({
  x: { position: "absolute", left: 10, alignSelf: "center" },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#a4a4a4",
  },
  bar: {
    width: 50,
    backgroundColor: "#a4a4a4",
    height: 4,
    borderRadius: BORDER_RADIUS,
  },
});