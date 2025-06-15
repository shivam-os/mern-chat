import { BACKEND_URL } from "../config/app.config";
import { httpClient } from "../helpers/httpClient";

const CHAT_ENDPOINTS = {
  CHATS_LIST: `${BACKEND_URL}/chats`,
  CHAT_DETAILS: `${BACKEND_URL}/chats/Id`,
};

export const getChats = async () => {
  const response = await httpClient.get(CHAT_ENDPOINTS.CHATS_LIST);
  return response.data;
};

export const getChatDetails = async (payload) => {
  const response = await httpClient.get(CHAT_ENDPOINTS.CHAT_DETAILS, payload);
  return response.data;
};

export const createNewChat = async (payload) => {
  const response = await httpClient.post(CHAT_ENDPOINTS.CHATS_LIST, payload);
  return response.data;
};

export const deleteChat = async (payload) => {
  const response = await httpClient.delete(
    `${CHAT_ENDPOINTS.CHATS_LIST}/${payload}`
  );
  return response.data;
};
