import { Text, Divider } from "@ui-kitten/components";
import { StyleSheet, ViewStyle } from "react-native";

import { Row } from "./Row";
import { theme } from "../theme";

export const LoginDivider = ({ style }: { style?: ViewStyle }) => {
  return (
    <Row style={[styles.container, style as ViewStyle]}>
      <Divider style={styles.divider} />
      <Text style={styles.orText} appearance={"hint"}>
        or
      </Text>
      <Divider style={styles.divider} />
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  orText: { paddingHorizontal: 10, marginTop: -5 },
  divider: {
    borderWidth: 0.5,
    width: "45%",
    borderColor: theme["color-gray"],
  },
});