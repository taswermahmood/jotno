import axios from "axios";
import { useQuery } from "react-query";
import { MessageType } from "@flyerhq/react-native-chat-ui";

import { endpoints, queryKeys } from "@/constants";
import { Message } from "@/types/message";
import { useUser } from "../useUser";
import { SelectedChat } from "@/types/chat";

const fetchChat = async (chatID: number, userID?: number, token?: string): Promise<SelectedChat> => {
    const response = await axios.get(endpoints.getChatByID(chatID, userID),
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data: ChatRes = response.data;

    const userAuthor = {
        id: data.userID.toString(),
        firstName: data.userFirstName,
        lastName: data.userLastName ? data.userLastName : "",
    };

    const specialistAuthor = {
        id: data.specialistID.toString(),
        firstName: data.specialistFirstName,
        lastName: data.specialistLastName,
        imageUrl: data.specialistAvatar,
    };

    const messages: MessageType.Any[] = [];
    for (let m of data.messages) {
        const message: MessageType.Any = {
            id: m.ID.toString(),
            author: m.senderID.toString() === specialistAuthor.id ? specialistAuthor : userAuthor,
            createdAt: new Date(m.CreatedAt).getTime(),
            text: m.text,
            type: "text",
        };
        messages.push(message);
    }

    const chat: SelectedChat = {
        ID: data.ID,
        receiverID: userID === data.specialistID ? data.userID : data.specialistID,
        messages,
        author: userID === data.specialistID ? specialistAuthor : userAuthor,
        receiverAvatar: userID === data.specialistID ? data.userAvatar : data.specialistAvatar,
    };

    return chat;
};

export const useSelectedChatQuery = (chatID: number) => {
    const { user } = useUser();
    return useQuery(queryKeys.selectedChat, () => fetchChat(chatID, user?.ID, user?.accessToken));
};

type ChatRes = {
    ID: number;
    CreatedAt: string;
    userID: number;
    specialistID: number;
    jobID: number;
    specialistJobName: string;
    specialistFirstName: string;
    specialistLastName: string;
    specialistAvatar: string;
    userFirstName: string;
    userLastName?: string;
    userAvatar: string;
    messages: Message[];
};