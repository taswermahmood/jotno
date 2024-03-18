import { Divider, Text, Toggle } from '@ui-kitten/components';
import { Screen } from "@/components/Screen";
import { FlatList, StyleSheet, Touchable, TouchableOpacity, View, RefreshControl } from 'react-native';
import { BUTTON_BORDER_RADIUS, LISTMARGIN } from '@/constants';
import { router } from 'expo-router';
import { useUser } from '@/hooks/useUser';
import { useTranslation } from 'react-i18next';
import { theme } from '@/theme';
import { useCallback, useState } from 'react';
import { Icon, List, Modal } from 'react-native-paper';
import { Row } from '@/components/Row';
import { useNotifications } from '@/hooks/useNotifications';
import { JDivider } from '@/components/Divider';

export default function AccountScreen() {
  const { user, logout, setAllowsNotifications } = useUser();
  const { registerForPushNotificationsAsync } = useNotifications();
  const [languageModal, setLanguageModal] = useState(false)
  const [notifcationsModal, setNotifcationsModal] = useState(false)
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

  const notificationsChanged = async (checked: boolean) => {
    try {
      if (!checked) return setAllowsNotifications(checked);
      setAllowsNotifications(checked);
      await registerForPushNotificationsAsync(true);
    } catch (error) {
      setAllowsNotifications(!checked);
    }
  };


  const onPress = (title: string) => {
    if (title === t("Profile")) router.push("/screens/account/AccountInformation");
    if (title === t("Logout")) logout();
    if (title === t("Language")) setLanguageModal(true);
    if (title === t("Notifications")) setNotifcationsModal(true);
    if (title === "English") { i18n.changeLanguage('en'); setLanguageModal(false) };
    if (title === "বাংলা") { i18n.changeLanguage('bn'); setLanguageModal(false) };

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
    "English", "বাংলা"
  ]

  return (
    <Screen>
      {user ? <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
          data={listData}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <>
            <JDivider />
              <View style={styles.container}>
                {item.name ? <Text category='s2' appearance='hint'>
                  {item.name}
                </Text> : null}
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={item.list}
                  keyExtractor={(item) => item.title}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPress(item.title)}>
                      <List.Item title={item.title} left={() => icon(item.iconName)} />
                    </TouchableOpacity>
                  )} />
              </View>
            </>
          )}
        />
      </View> : null}
      {/* Language Modal */}
      <Modal contentContainerStyle={styles.card} visible={languageModal} onDismiss={() => setLanguageModal(false)}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={languageList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item)}>
              <List.Item title={item} />
            </TouchableOpacity>
          )} />
      </Modal>
      {/* Notifcations Modal */}
      <Modal contentContainerStyle={styles.card} visible={notifcationsModal} onDismiss={() => setNotifcationsModal(false)}>
        <Row style={styles.row}>
          <Text>Allow Notifications</Text>
          <Toggle
            checked={user?.allowsNotifications}
            onChange={notificationsChanged}
          />
        </Row>
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
    borderRadius: BUTTON_BORDER_RADIUS
  },
  card: {
    position: "absolute",
    overflow: "hidden",
    width: "100%",
    bottom: 0,
    backgroundColor: "#fff",
    backfaceVisibility: "visible"
  },
  row: {
    justifyContent: "space-between",
    margin: 15,
  },
});
