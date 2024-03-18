import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import { useChatsQuery } from "@/hooks/queries/useChatQuery";
import { Loading } from "@/components/Loading";
import { theme } from "@/theme";
import { Row } from "@/components/Row";
import { router } from "expo-router";
import { Avatar } from "react-native-paper";
import { Column } from "@/components/Column";
import { Screen } from "@/components/Screen";
import { camelCaseToWords } from "@/utils/handleCase";
import { getFormattedDate } from "@/utils/getFormatedDate";
import { AnimationLottie } from "@/components/AnimationLottie";

export default function InboxScreen() {
  const chats = useChatsQuery();
  const { t } = useTranslation();

  if (chats.isLoading) return <Loading />;

  if (!chats?.data || chats.data.length === 0)
    return (
      <AnimationLottie
        title="No messages, start conversing with Specialists about your needs."
        subHeader="Find Jotno Specialist anytime and anywhere."
        source={require("@/assets/lotties/emptyInbox.json")}
      />
    )

  const handleMessagePress = (
    chatID: number,
    recipientName: string,
    jobName: string,
  ) => {
    const data = { chatId: chatID, recipientName: `${recipientName} | ${camelCaseToWords(jobName)}` };
    router.push({ pathname: "/screens/SpecialistChat", params: data });
  };

  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats.data}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.message}
            onPress={() => { handleMessagePress(item.ID, item.recipientName, item.jobName) }}
          >
            <Row>
              <Avatar.Image style={{ alignSelf: "center" }} size={50} source={{ uri: item.avatar }} />
              <Column style={{ margin: 10 }}>
                <Text style={{ color: theme["color-primary-500"] }} category="label">{camelCaseToWords(item.jobName)}</Text>
                <Row style={{ justifyContent: "space-between" }}>
                  <Text style={styles.messageTitle} numberOfLines={1}>{item.recipientName}</Text>
                  <Text style={{ alignItems: "flex-end", width: "33%" }} appearance="hint">{getFormattedDate(item.messages[0].CreatedAt)}</Text>
                </Row>
                <Text style={{ alignItems: "flex-start", width: "75%" }} numberOfLines={1} appearance="hint">{item.messages[0].text}</Text>
              </Column>
            </Row>
          </Pressable>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  message: {
    justifyContent: "center",
    height: 100,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  messageTitle: {
    fontWeight: "bold",
    width: "50%"
  }
});