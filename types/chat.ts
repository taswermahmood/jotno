import { MessageType } from "@flyerhq/react-native-chat-ui";

import { Message } from "./message";
import { ImageURISource } from "react-native";

export type Chat = {
  ID: number;
  userID: number;
  specialistID: number;
  messages: Message[];
}

export type SelectedChat = {
  ID: number;
  receiverID: number;
  receiverAvatar: string;
  messages: MessageType.Any[];
  author: Author;
};

export type TransformedChat = {
  ID: number;
  jobName: string;
  avatar: string;
  recipientName: string;
  messages: Message[];
};

export type CreateChat = {
  userID: number;
  specialistID: number;
  jobID: number;
  senderID: number;
  receiverID: number;
  text: string;
};

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: ImageURISource['uri'];
};