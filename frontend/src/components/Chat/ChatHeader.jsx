import { Navbar, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Button from "../global/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useChats } from "../../contexts/ChatsContext";
import { useState } from "react";
import AllUsersModal from "./AllUsersModal";

const ChatHeader = () => {
  const [isUsersModal, setIsUsersModal] = useState(false);
  const { user } = useAuth();
  const { logout } = useChats();

  const openUsersModal = () => setIsUsersModal(true);
  const closeUsersModal = () => setIsUsersModal(false);

  return (
    <Navbar bg="light" className="shadow-sm py-2">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Button
          variant="light"
          className="d-flex align-items-center gap-2"
          onClick={openUsersModal}
        >
          <FaSearch />
          <span className="fw-semibold">Search Users</span>
        </Button>

        {isUsersModal && (
          <AllUsersModal show={isUsersModal} handleClose={closeUsersModal} />
        )}
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">
            Hi, <strong>{user?.name}</strong>
          </span>
          <Button variant="outline-danger" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default ChatHeader;
