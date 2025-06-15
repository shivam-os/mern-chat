import { createContext, useContext, useState } from "react";
import { getChats } from "../services/chatService";
import { showError } from "../utils/utils";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  // const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const handleChatSelect = (chat) => setSelectedChat(chat);
  const handleSetChats = (chats) => setChats(chats);

  const fetchChats = async () => {
    try {
      const { data } = await getChats();
      handleSetChats(data);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        handleChatSelect,
        chats,
        handleSetChats,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChats = () => useContext(ChatContext);

export default ChatProvider;
