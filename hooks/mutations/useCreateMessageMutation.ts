import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

import { endpoints, queryKeys } from "../../constants";
import { socket } from "../../constants/socket";
import { SelectedChat, TransformedChat, Author } from "@/types/chat";
import { MessageType } from "@flyerhq/react-native-chat-ui/lib/types";
import { useUser } from "../useUser";

const createMessage = (
    chatID: number,
    senderID: number,
    receiverID: number,
    text: string,
    userID?: number,
    token?: string
) =>
    axios.post(endpoints.createMessage(userID), { chatID, senderID, receiverID, text },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const useCreateMessageMutation = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();

    return useMutation(
        ({
            chatID,
            author,
            senderID,
            receiverID,
            text,
        }: {
            chatID: number;
            author: Author;
            senderID: number;
            receiverID: number;
            text: string;
        }) =>
            createMessage(chatID, senderID, receiverID, text, user?.ID, user?.accessToken),
        {
            onMutate: async ({ author, text, chatID, receiverID, senderID, }) => {
                await queryClient.cancelQueries(queryKeys.chats);
                await queryClient.cancelQueries(queryKeys.selectedChat);

                const prevChats: TransformedChat[] | undefined = queryClient.getQueryData(queryKeys.chats);
                const prevSelectedChat: SelectedChat | undefined = queryClient.getQueryData(queryKeys.selectedChat);

                const textMessage: MessageType.Text = {
                    author: author,
                    createdAt: Date.now(),
                    id: Date.now().toString(),
                    text: text,
                    type: "text",
                };

                if (prevSelectedChat) {
                    const newSelectedChat = { ...prevSelectedChat };
                    newSelectedChat.messages.unshift(textMessage);

                    queryClient.setQueryData(queryKeys.selectedChat, newSelectedChat);
                }

                if (prevChats) {
                    const newChats = [...prevChats];
                    const index = newChats.findIndex((i) => i.ID === chatID);
                    newChats[index].messages.unshift({
                        CreatedAt: new Date().toString(),
                        ID: Date.now(),
                        receiverID,
                        senderID,
                        text,
                    });
                    queryClient.setQueryData(queryKeys.chats, newChats);
                }

                return {
                    prevChats,
                    prevSelectedChat,
                };
            },
            onError: (err, vars, context) => {
                queryClient.setQueryData(queryKeys.chats, context?.prevChats);
                queryClient.setQueryData(queryKeys.selectedChat, context?.prevSelectedChat);
            },
            onSuccess: (
                _,
                { author, chatID, receiverID, senderID, text }
            ) => {
                socket.emit("sendMessage", {
                    senderID,
                    chatID,
                    receiverID,
                    text,
                    senderName: `${author.firstName} ${author.lastName}`,
                });
            },
            onSettled: () => {
                queryClient.invalidateQueries(queryKeys.chats);
                queryClient.invalidateQueries(queryKeys.selectedChat);
            },
        }
    );
};