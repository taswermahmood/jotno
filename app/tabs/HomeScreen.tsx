import { Divider, Text } from '@ui-kitten/components';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

import { Screen } from "@/components/Screen";
import { Column } from '@/components/Column';
import { useTranslation } from "react-i18next";
import { ReferCard } from '@/components/ReferCard';
import { MENU_OPTIONS } from '@/constants';
import { Search } from '@/components/Search';
import { useUser } from '@/hooks/useUser';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useUser();
  const [boundingBox, setBoundingBox] = useState<string[]>();
  useEffect(() => {
    if (user?.address && user.lat && user.lon) {
      setBoundingBox([
        (user.lat - 0.058).toString(),
        (user.lat + 0.058).toString(),
        (user.lon - 0.051).toString(),
        (user.lon + 0.051).toString(),
      ]);
    }
  }, [])
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ marginHorizontal: 15, textAlign: 'right' }} category='label'>{t("Searching in")}</Text>
        <Search style={{ margin: 10 }} name={user?.address ? user.address : "Set up home."} onPress={() => { router.push("/screens/account/AccountInformation") }} />
        <Text style={{ margin: 10 }} category='h6'>{t("How can we help you today?")}</Text>
        <View style={{ margin: 25 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            pagingEnabled
            data={MENU_OPTIONS}
            keyExtractor={(item) => item.jobName}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                if (user?.address && user.lat && user.lon && boundingBox)
                  router.push({
                    pathname: "/screens/SearchResults", params: {
                      jobName: item.jobName,
                      location: user.address,
                      lat: user.lat,
                      lon: user.lon,
                      boundingBox: boundingBox,
                    }
                  })
                else router.push({ pathname: "/screens/SearchResults", params: { jobName: item.jobName } })

              }}>
                <Column style={{ alignItems: "center" }}>
                  <LottieView
                    speed={item.animationSpeed}
                    autoPlay
                    loop
                    style={{ height: 120, width: 120 }}
                    source={item.url} />
                  <Text style={{ margin: 5 }} category='h6'>{t(item.name)}</Text>
                </Column>
              </TouchableOpacity>
            )} />
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
