import { useEffect, useState } from "react";
import { Modal, Card } from "react-bootstrap";
import { BsFillSendFill } from "react-icons/bs";
import Button from "../global/Button";
import FormInput from "../global/FormInput";
import { getRandomBgColor, showError } from "../../utils/utils";
import { getAllUsers } from "../../services/userService";
import { toast } from "react-toastify";
import { createNewChat } from "../../services/chatService";
import { useChats } from "../../contexts/ChatsContext";

const UserCard = ({ user, onUserClick }) => {
  return (
    <Card className="mb-2 px-3" style={{ width: "100%" }}>
      <div className="d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <div
            className="rounded-circle text-white d-flex align-items-center justify-content-center font-primary"
            style={{
              backgroundColor: getRandomBgColor(),
              width: "40px",
              height: "40px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="d-flex flex-column">
            <span className="font-primary" style={{ fontWeight: "500" }}>
              {user.name}
            </span>
            <small className="text-muted">{user.email}</small>
          </div>
        </div>

        <BsFillSendFill
          color="green"
          size={18}
          style={{ cursor: "pointer" }}
          onClick={() => onUserClick(user)}
        />
      </div>
    </Card>
  );
};

const AllUsersModal = ({ show, handleClose }) => {
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("user")) ?? {};
  const { handleChatSelect } = useChats();

  const fetchUsers = async (payload) => {
    try {
      setIsLoading(true);
      const response = await getAllUsers(payload);
      setAllUsers(response.data);
    } catch (err) {
      showError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = async (user) => {
    const payload = {
      name: user.name,
      isGroup: false,
      admin: loggedInUser?.id,
      users:
        loggedInUser?.id !== user.id ? [user.id, loggedInUser.id] : [user.id],
    };
    try {
      const response = await createNewChat(payload);
      toast.success(response.message);
      handleChatSelect(null);
      handleClose();
    } catch (err) {
      showError(err);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    await fetchUsers(searchText);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Modal show={show} size="md" onHide={handleClose} centered scrollable>
      <Modal.Header closeButton className="primary-font">
        <Modal.Title className="font-weight-bold">Search Users</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <FormInput
            type="text"
            name="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter username or email"
          />
          <Button
            variant="primary"
            size="sm"
            className="ms-3"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {isLoading ? (
          <p>Loading....</p>
        ) : (
          allUsers.map((user) => (
            <UserCard key={user.id} user={user} onUserClick={handleUserClick} />
          ))
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AllUsersModal;
