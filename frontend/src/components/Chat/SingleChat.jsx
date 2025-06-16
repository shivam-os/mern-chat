import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { BsArrowLeft, BsFillTrash3Fill } from "react-icons/bs";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { SOCKET_URL } from "../../config/app.config";
import { useChats } from "../../contexts/ChatsContext";
import { deleteChat } from "../../services/chatService";
import { getChatName, showError } from "../../utils/utils";

const SingleChat = () => {
  const { selectedChat, handleChatSelect, fetchChats } = useChats();
  const user = JSON.parse(localStorage.getItem("user")) ?? {};
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const messagesContainerRef = useRef(null);
const chatName = getChatName(selectedChat, user.name);

  const handleChatDelete = async (id) => {
    try {
      const response = await deleteChat(id);
      toast.success(response.message);
      handleChatSelect(null);
      await fetchChats();
    } catch (err) {
      showError(err);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      roomId: selectedChat.id,
      content: newMessage,
      sender: user,
      timestamp: new Date().toISOString(),
    };

    socket.current.emit("send_message", messageData); // Send only
    setNewMessage(""); // Clear input only
  };

  useEffect(() => {
setMessages([]);
    socket.current = io(SOCKET_URL, {
      auth: { token: localStorage.getItem("userToken") },
    });
    socket.current.emit("setup", user);
    socket.current.emit("join_chat", selectedChat?.id);

    socket.current.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [selectedChat?.id]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        display: selectedChat ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "white",
        width: "100%",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
      }}
    >
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <BsArrowLeft
              size={24}
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={() => handleChatSelect(null)}
            />
            <h5 className="mb-0">{chatName}</h5>
          </div>

          <BsFillTrash3Fill
            size={18}
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => handleChatDelete(selectedChat?.id)}
          />
        </div>

        <div
          className="p-3 bg-light rounded"
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            overflowY: "hidden",
          }}
        >
          <div
            className="flex-grow-1 overflow-auto mb-2 d-flex flex-column"
            style={{ maxHeight: "100%", overflowY: "auto" }}
            ref={messagesContainerRef}
          >
            {messages.map((msg, idx) => {
              const isSender = msg?.sender?.id === user?.id;

              return (
                <div
                  key={idx}
                  className={`d-flex ${
                    isSender ? "justify-content-end" : "justify-content-start"
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded ${
                      isSender
                        ? "sender-color text-white"
                        : "bg-white text-dark"
                    }`}
                    style={{
                      maxWidth: "70%",
                      wordBreak: "break-word",
                    }}
                  >
                    <div style={{ fontSize: "0.9rem" }}>{msg?.content}</div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textAlign: "right",
                        color: isSender ? "white" : "#666",
                      }}
                    >
                      {new Date(msg?.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      - By {msg?.sender?.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Form onSubmit={sendMessage}>
            <Form.Control
              type="text"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-secondary-subtle"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
