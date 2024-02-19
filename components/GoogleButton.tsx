import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import * as WebBrowser from "expo-web-browser";

import { GoogleLogo } from "./logos/GoogleLogo";
import { BORDER_RADIUS } from "@/constants";

WebBrowser.maybeCompleteAuthSession();

export const GoogleButton = ({
  text,
  style,
  onPress,
}: {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <GoogleLogo style={styles.logo} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: BORDER_RADIUS,
    backgroundColor: "#fff",
    height: 50,
  },
  logo: { 
    marginLeft: 10, 
    marginTop: 1 
  },
  text: {
    color: "#36454f",
    alignSelf: "center",
    marginLeft: 40,
    fontWeight: "bold",
    fontSize: 15,
  },
});