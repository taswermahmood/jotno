import { Divider, Text } from '@ui-kitten/components';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

import { Screen } from "@/components/Screen";
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';
import { useTranslation } from "react-i18next";
import { ReferCard } from '@/components/ReferCard';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Screen>
      <ScrollView>
        <Text style={{ margin: 10 }} category='h6'>{t("How can we help you today?")}</Text>
        <View style={{ margin: 20 }}>
          <Row style={{ alignContent: "center", justifyContent: "space-around" }}>
            <TouchableOpacity onPress={() => router.push({ pathname: "/screens/SearchResults", params: { jobName: "petCare" }})}>
              <Column style={{ alignItems: "center" }}>
                <LottieView
                  speed={0.6}
                  autoPlay
                  loop
                  style={{ height: 120, width: 120 }}
                  source={require("@/assets/lotties/petCareLogo3.json")} />
                <Text category='h6' appearance={"hint"}>{t("Pet Care")}</Text>
              </Column>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push({ pathname: "/screens/SearchResults", params: { jobName: "babySitting" }})}>
              <Column style={{ alignItems: "center" }}>
                <LottieView
                  autoPlay
                  loop
                  style={{ height: 120, width: 120 }}
                  source={require("@/assets/lotties/babySitterLogo.json")} />
                <Text category='h6' appearance={"hint"}>{t("Baby Sitter")}</Text>
              </Column>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push({ pathname: "/screens/SearchResults", params: { jobName: "houseKeeping" }})}>
              <Column style={{ alignItems: "center" }}>
                <LottieView
                  autoPlay
                  loop
                  style={{ height: 120, width: 120 }}
                  source={require("@/assets/lotties/houseKeepingLogo.json")} />
                <Text category='h6' appearance={"hint"}>{t("House Keeping")}</Text>
              </Column>
            </TouchableOpacity>
          </Row>
          <Row style={{ alignContent: "center", justifyContent: "space-around", marginTop: 20 }}>
            <TouchableOpacity onPress={() => router.push({ pathname: "/screens/SearchResults", params: { jobName: "teaching" }})}>
              <Column style={{ alignItems: "center" }}>
                <LottieView
                  speed={0.3}
                  autoPlay
                  loop
                  style={{ height: 120, width: 120 }}
                  source={require("@/assets/lotties/teacherLogo.json")} />
                <Text category='h6' appearance={"hint"}>{t("Teacher")}</Text>
              </Column>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push({ pathname: "/screens/SearchResults", params: { jobName: "elderlyCare" }})}>
              <Column style={{ alignItems: "center" }}>
                <LottieView
                  autoPlay
                  loop
                  style={{ height: 120, width: 120 }}
                  source={require("@/assets/lotties/elderlyCareLogo.json")} />
                <Text category='h6' appearance={"hint"}>{t("Elderly Care")}</Text>
              </Column>
            </TouchableOpacity>
          </Row>
        </View>
        <Divider style={{ padding: 5 }}></Divider>
        <View style={{ margin: 10 }}>
          <Text category='h6'>{t("Invite Friends & Get Discount")}</Text>
          <ReferCard />
        </View>
      </ScrollView>
    </Screen >
  );
}
