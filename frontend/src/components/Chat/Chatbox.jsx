import SingleChat from "./SingleChat";
import { useChats } from "../../contexts/ChatsContext";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChats();

  const isVisible = selectedChat;

  return (
    <div
      style={{
        display: isVisible ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "white",
        width: "100%",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
      }}
    >
      {isVisible && (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </div>
  );
};

export default Chatbox;
