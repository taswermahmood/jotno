import { Divider, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

import { Screen } from "@/components/Screen";
import { theme } from '@/theme';
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <Screen>
      <Text style={{margin: 10}} category='h6'>How can we help you today?</Text>
      <View style={{ margin: 20 }}>
        <Row style={{ alignContent: "center", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() => { router.push("/screens/SearchResults") }}>
            <Column style={{ alignItems: "center" }}>
              <LottieView
                autoPlay
                loop
                style={{ height: 120, width: 120 }}
                source={require("@/assets/lotties/petCareLogo.json")} />
              <Text category='h6' appearance={"hint"}>Pet Care</Text>
            </Column>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push("/screens/SearchResults") }}>
            <Column style={{ alignItems: "center" }}>
              <LottieView
                autoPlay
                loop
                style={{ height: 120, width: 120 }}
                source={require("@/assets/lotties/babySitterLogo.json")} />
              <Text category='h6' appearance={"hint"}>Baby Sitter</Text>
            </Column>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push("/screens/SearchResults") }}>
            <Column style={{ alignItems: "center" }}>
              <LottieView
                autoPlay
                loop
                style={{ height: 120, width: 120 }}
                source={require("@/assets/lotties/houseKeepingLogo.json")} />
              <Text category='h6' appearance={"hint"}>House Keeping</Text>
            </Column>
          </TouchableOpacity>
        </Row>
        <Row style={{ alignContent: "center", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() => { router.push("/screens/SearchResults") }}>
            <Column style={{ alignItems: "center" }}>
              <LottieView
                autoPlay
                loop
                style={{ height: 120, width: 120 }}
                source={require("@/assets/lotties/teacherLogo.json")} />
              <Text category='h6' appearance={"hint"}>Teacher</Text>
            </Column>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push("/screens/SearchResults") }}>
            <Column style={{ alignItems: "center" }}>
              <LottieView
                autoPlay
                loop
                style={{ height: 120, width: 120 }}
                source={require("@/assets/lotties/elderlyCareLogo.json")} />
              <Text category='h6' appearance={"hint"}>Elderly Care</Text>
            </Column>
          </TouchableOpacity>
        </Row>
      </View>
      <Divider style={{ padding: 5 }}></Divider>
      <View style={{ margin: 10 }}>
        <Text category='h6'>Invite Friends & Get Discount</Text>
      </View>
    </Screen >
  );
}
