import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { TransformedChat } from "@/types/chat";
import { Message } from "@/types/message";
import { useUser } from "../useUser";

const fetchChats = async (userID?: number, token?: string): Promise<TransformedChat[]> => {
    if (!userID) return [];

    const response = await axios.get(
        endpoints.getChatsByUserID(userID),
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const chats: ChatsRes[] = response.data;
    const data: TransformedChat[] = [];
    for (let i of chats) {
        let recipientName = `${i.specialistFirstName} ${i.specialistLastName}`;
        data.push({
            ID: i.ID,
            jobName: i.specialistJobName,
            avatar: i.specialistAvatar,
            recipientName,
            messages: i.messages,
        });
    }

    return data;
};

export const useChatsQuery = () => {
    const { user } = useUser();
    return useQuery(queryKeys.chats, () => fetchChats(user?.ID, user?.accessToken), { retry: false });
};

type ChatsRes = {
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
    userLastName: string;
    userAvatar: string;
    messages: Message[];
};