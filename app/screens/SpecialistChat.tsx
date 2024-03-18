import { StyleSheet, View } from "react-native";
import { Chat, MessageType, defaultTheme } from "@flyerhq/react-native-chat-ui";
import { Button, Text } from "@ui-kitten/components";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Avatar } from "react-native-paper";

import { useUser } from "@/hooks/useUser";
import { theme } from "@/theme";
import { useSelectedChatQuery } from "@/hooks/queries/useSelectedChatQuery";
import { Loading } from "@/components/Loading";
import { useCreateMessageMutation } from "@/hooks/mutations/useCreateMessageMutation";
import { GoBackRoute } from "@/components/GoBackRoute";
import { Screen } from "@/components/Screen";
import { Row } from "@/components/Row";
import { BUTTON_BORDER_RADIUS, LISTMARGIN } from "@/constants";
import { useTranslation } from "react-i18next";
import { AnimationLottie } from "@/components/AnimationLottie";

export default function SpecialistChat() {
    const { user } = useUser();
    if (!user) return <Redirect href="/" />;

    const { t } = useTranslation();
    const { chatId, recipientName } = useLocalSearchParams();
    const chat = useSelectedChatQuery(Number(chatId));
    const title = recipientName
    const createMessage = useCreateMessageMutation();

    if (chat.isLoading) return <Loading />;
    if (!chat.data) return (
        <AnimationLottie
            title="Could not retrieve chat at this moment, try again later."
            source={require("@/assets/lotties/notFound.json")}
        />
    );

    const handleSendPress = (message: MessageType.PartialText) => {
        if (chat)
            createMessage.mutate({
                author: chat.data.author,
                chatID: chat.data.ID,
                receiverID: chat.data.receiverID,
                senderID: user.ID,
                text: message.text,
            });
    };

    return (
        <Screen>
            <View style={{ flex: 1 }}>
                <Row style={{
                    marginTop: 50,
                    marginHorizontal: LISTMARGIN,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Row>
                        <GoBackRoute />
                        <Avatar.Image style={{ alignSelf: "center", marginHorizontal: 10 }} size={30} source={{ uri: chat.data.receiverAvatar }} />
                        <Text category="s1" style={{ marginVertical: 10 }} numberOfLines={1}>
                            {title}
                        </Text>
                    </Row>
                    <Button size="small" style={{ alignSelf: "center", width: "20%", borderRadius: BUTTON_BORDER_RADIUS }}>
                        Book
                    </Button>
                </Row>
                {/* <Card style={{margin: 5, backgroundColor: theme["color-primary-100"] }} >
                    <Text>
                        Book
                    </Text>
                </Card> */}
                <Chat
                    messages={chat.data.messages}
                    showUserAvatars
                    enableAnimation
                    onSendPress={handleSendPress}
                    user={chat.data.author}
                    sendButtonVisibilityMode="always"
                    theme={{
                        ...defaultTheme,
                        colors: {
                            ...defaultTheme.colors,
                            primary: theme["color-info-600"],
                            secondary: theme["color-info-100"],
                            inputText: "#000000",
                            inputBackground: "#FFFFFF",
                        },
                    }}
                />
            </View>
        </Screen >
    );
};

const styles = StyleSheet.create({
});