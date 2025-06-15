import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
// import { ChatState } from "../Context/ChatProvider";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
import { BsPlusLg } from "react-icons/bs";
import { getChats } from "../../services/chatService";
import { showError } from "../../utils/utils";
import { useChats } from "../../contexts/ChatsContext";
import Button from "../global/Button";
import AllUsersModal from "./AllUsersModal";
import GroupChatModal from "./GroupChatModal";

const GroupCard = ({ group, onClick, selectedChat }) => {
  return (
    <Card
      className="mb-2 px-3"
      style={{ width: "100%" }}
      onClick={() => onClick(group)}
    >
      <div className="d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <div
            className="rounded-circle text-white d-flex align-items-center justify-content-center"
            style={{
              backgroundColor:
                selectedChat?.id === group.id ? "yellow" : "gray",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {group.name.charAt(0).toUpperCase()}
          </div>

          <span>{group.name}</span>
        </div>
      </div>
    </Card>
  );
};

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, handleChatSelect, chats, handleSetChats } = useChats();
  const [isGroupChatModal, setIsGroupChatModal] = useState(false);

  const fetchChats = async () => {
    try {
      const { data } = await getChats();
      handleSetChats(data);
    } catch (error) {
      showError(error);
    }
  };

  console.log(selectedChat);

  const openGroupChatModal = () => setIsGroupChatModal(true);
  const closeGroupModal = () => setIsGroupChatModal(false);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div
      className={`${
        selectedChat ? "d-none d-md-flex" : "d-flex"
      } flex-column align-items-center p-3 bg-white border rounded w-100 w-md-31`}
      style={{ height: "90%" }}
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
