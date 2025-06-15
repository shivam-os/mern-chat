import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useChats } from "../../contexts/ChatsContext";
import Button from "../global/Button";
import AllUsersModal from "./AllUsersModal";
import GroupChatModal from "./GroupChatModal";

const GroupCard = ({ group, onClick, selectedChat }) => {
  return (
    <Card
      className={`mb-2 px-3 text-truncate ${
        selectedChat?.id === group.id && "primary-green"
      }`}
      style={{ width: "100%", cursor: "pointer" }}
      onClick={() => onClick(group)}
    >
      <div className="d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <div
            className="rounded-circle text-white d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "gray",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {group.name.charAt(0).toUpperCase()}
          </div>

          <span className="primary-font text-truncate">{group.name}</span>
        </div>
      </div>
    </Card>
  );
};

const MyChats = () => {
  const { selectedChat, handleChatSelect, chats, fetchChats } = useChats();
  const [isGroupChatModal, setIsGroupChatModal] = useState(false);

  const openGroupChatModal = () => setIsGroupChatModal(true);
  const closeGroupModal = async () => {
    setIsGroupChatModal(false);
    await fetchChats();
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div
      className={`${
        selectedChat ? "d-none d-md-flex" : "d-flex"
      } flex-column align-items-center p-3 bg-white border rounded w-md-31`}
      style={{ height: "85vh", maxWidth: "420px" }}
    >
      <div className="w-100 d-flex justify-content-between align-items-center pb-3 px-2">
        <h4 className="m-0">My Chats</h4>
        <Button
          variant="light"
          className="d-flex align-items-center gap-2"
          onClick={openGroupChatModal}
        >
          <BsPlusLg />
          <span className="fw-semibold">New Group</span>
        </Button>

        {isGroupChatModal && (
          <GroupChatModal
            show={isGroupChatModal}
            handleClose={closeGroupModal}
          />
        )}
      </div>

      <div className="flex-grow-1 w-100 bg-light rounded p-2 overflow-auto">
        {chats ? (
          chats.length > 0 ? (
            chats.map((chat) => (
              <GroupCard
                key={chat.id}
                group={chat}
                onClick={handleChatSelect}
                selectedChat={selectedChat}
              />
            ))
          ) : (
            <div className="text-muted text-center mt-3">
              No chats available.
            </div>
          )
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
