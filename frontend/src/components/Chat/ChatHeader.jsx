import { Navbar, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Button from "../global/Button";
import { useChats } from "../../contexts/ChatsContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllUsersModal from "./AllUsersModal";
import { PAGE_URLS } from "../../config/app.config";

const ChatHeader = () => {
  const [isUsersModal, setIsUsersModal] = useState(false);
  const userName = JSON.parse(localStorage.getItem("user"))?.name ?? "";
  const { fetchChats } = useChats();
  const navigate = useNavigate();

  const openUsersModal = () => setIsUsersModal(true);
  const closeUsersModal = async () => {
    setIsUsersModal(false);
    await fetchChats();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(PAGE_URLS.HOME);
  };

  return (
    <Navbar className="shadow-sm py-2 primary-font primary-green mb-2">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Button
          size="sm"
          className="d-flex align-items-center gap-2 btn-secondary"
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
            Hi, <strong>{userName}</strong>
          </span>
          <Button className="btn-secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default ChatHeader;
