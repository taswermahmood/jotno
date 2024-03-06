import { Divider, Text } from '@ui-kitten/components';
import { Screen } from "@/components/Screen";
import { FlatList, StyleSheet, Touchable, TouchableOpacity, View, RefreshControl } from 'react-native';
import { BORDER_RADIUS, LISTMARGIN } from '@/constants';
import { router } from 'expo-router';
import { useUser } from '@/hooks/useUser';
import { useTranslation } from 'react-i18next';
import { theme } from '@/theme';
import { useCallback, useState } from 'react';
import { Icon, List, Modal } from 'react-native-paper';

export default function AccountScreen() {
  const { user, logout } = useUser()
  // const user = true;
  const [languageModal, setLanguageModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const { t, i18n } = useTranslation();
  router

  const icon = (name: string) => {
    return <Icon
      source={name}
      color={theme["color-primary-400"]}
      size={24}
    />
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const onPress = (title: string) => {
    if (title === t("Profile")) router.push("/screens/account/AccountInformation");
    if (title === t("Logout")) logout();
    if (title === t("Language")) setLanguageModal(true);
    if (title === "English") { i18n.changeLanguage('en'); setLanguageModal(false) };
    if (title === "Bangla") { i18n.changeLanguage('bn'); setLanguageModal(false) };

  }

  const listData = [
    {
      name: t("Account"),
      list:
        [{
          title: t("Profile"),
          iconName: "account-circle",
        },
        {
          title: t("Payments"),
          iconName: "credit-card",
        },
        {
          title: t("Notifications"),
          iconName: "bell-ring",
        }]
    },
    {
      name: t("Offers"),
      list:
        [{
          title: t("Refer & Get Discounts"),
          iconName: "human-greeting-variant",
        }]
    },
    {
      name: t("Setings"),
      list:
        [
          {
            title: t("Language"),
            iconName: "typewriter",
          }
        ]
    },
    {
      name: t("Help and Legal"),
      list:
        [{
          title: t("Emergency Support"),
          iconName: "hours-24",
        },
        {
          title: t("Help"),
          iconName: "square-rounded",
        },
        {
          title: t("Terms and conditions"),
          iconName: "book-open-page-variant",
        }]
    },
    {
      name: "",
      list:
        [{
          title: t("Logout"),
          iconName: "logout",
        }]
    },
  ];

  const languageList = [
    "English", "Bangla"
  ]

  return (
    <Screen>
      {user ? <View style={styles.container}>
        <FlatList
          style={{ height: "100%" }}
          data={listData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View>
              <Divider style={styles.divider} ></Divider>
              {item.name ? <Text category='s2' appearance='hint'>
                {item.name}
              </Text> : null}
              <FlatList
                data={item.list}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onPress(item.title)}>
                    <List.Item title={item.title} left={() => icon(item.iconName)} />
                  </TouchableOpacity>
                )} />
            </View>
          )}
        />
      </View> : null}
      <Modal contentContainerStyle={styles.card} visible={languageModal} onDismiss={() => setLanguageModal(false)}>
        <FlatList
          data={languageList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item)}>
              <List.Item title={item} />
            </TouchableOpacity>
          )} />
      </Modal>
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
  },
  button: {
    marginBottom: 10,
    borderRadius: BORDER_RADIUS
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    padding: 4,
  },
  card: {
    position: "absolute",
    overflow: "hidden",
    width: "100%",
    bottom: 0,
    backgroundColor: "#fff",
    backfaceVisibility: "visible"
  },
});
