import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { socket } from "../../constants/socket";
import { Chat, CreateChat } from "@/types/chat";
import { useUser } from "../useUser";

const createChat = (values: CreateChat, token?: string) =>
  axios.post<Chat>(
    endpoints.createChat(values.userID),
    {
      userID: values.userID,
      specialistID: values.specialistID,
      jobID: values.jobID,
      senderID: values.senderID,
      receiverID: values.receiverID,
      text: values.text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation(
    ({
      specialistID,
      userID,
      jobID,
      senderName,
      text,
    }: {
      specialistID: number;
      userID: number;
      jobID: number;
      senderName: string;
      text: string;
    }) =>
      createChat({ specialistID, userID, jobID, receiverID: specialistID, senderID: userID, text }, user?.accessToken),
    {
      onSuccess: ({ data }, { specialistID, text, userID, senderName }) => {
        queryClient.invalidateQueries(queryKeys.chats);
        socket.emit("sendMessage", {
          senderID: userID,
          chatID: data.ID,
          receiverID: specialistID,
          text,
          senderName,
        });
      },
    }
  );
};