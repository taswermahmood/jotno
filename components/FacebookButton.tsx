import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Text } from "@ui-kitten/components";

import { FacebookLogo } from "./logos/FacebookLogo";
import { BORDER_RADIUS } from "@/constants";

WebBrowser.maybeCompleteAuthSession();

export const FacebookButton = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FacebookLogo style={styles.logo} />
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
    backgroundColor: "#3b5998",
    height: 50,
  },
  logo: { 
    marginLeft: 10, 
    marginTop: 1 , 
},
  text: {
    color: "#fff",
    alignSelf: "center",
    marginLeft: 40, 
    fontWeight: "bold",
    fontSize: 15,
  },
});