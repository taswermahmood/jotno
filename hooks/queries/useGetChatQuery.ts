import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { MessageType } from "@flyerhq/react-native-chat-ui";

import { endpoints, queryKeys } from "@/constants";
import { Message } from "@/types/message";
import { useUser } from "../useUser";
import { SelectedChat } from "@/types/chat";
import { router } from "expo-router";
import { Specialist } from "@/types/profiles/specialist";

const fetchChat = async (userID?: number, specialistID?: number, jobID?: number, token?: string): Promise<SelectedChat> => {
    const response = await axios.post(endpoints.openCoversation(userID),
        { userID: userID, specialistID: specialistID, jobID: jobID },
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

export const useGetChatQuery = async (specialistID: number, jobID: number) => {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const chat = await fetchChat(user?.ID, specialistID, jobID, user?.accessToken);
    if (chat?.ID) {
        const selectedSpecialist: Specialist | undefined = queryClient.getQueryData(queryKeys.selectedSpecialist)
        const data = { chatId: chat.ID, recipientName: `${selectedSpecialist?.firstName} ${selectedSpecialist?.lastName}` };
        router.replace({ pathname: "/screens/SpecialistChat", params: data });
    }
}


type ChatRes = {
    ID: number;
    CreatedAt: string;
    userID: number;
    jobID: number;
    specialistJobName: string;
    specialistID: number;
    specialistFirstName: string;
    specialistLastName: string;
    specialistAvatar: string;
    userFirstName: string;
    userLastName?: string;
    userAvatar: string;
    messages: Message[];
};