import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  // const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const handleChatSelect = (chat) => setSelectedChat(chat);
  const handleSetChats = (chats) => setChats(chats);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        handleChatSelect,
        chats,
        handleSetChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChats = () => useContext(ChatContext);

export default ChatProvider;
