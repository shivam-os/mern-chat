import { useEffect, useState } from "react";
import { Modal, Card } from "react-bootstrap";
import { BsFillSendFill } from "react-icons/bs";
import Button from "../global/Button";
import FormInput from "../global/FormInput";
import { getRandomBgColor, showError } from "../../utils/utils";
import { getAllUsers } from "../../services/userService";

const UserCard = ({ user }) => {
  return (
    <Card className="mb-2 px-3" style={{ width: "100%" }}>
      <div className="d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <div
            className="rounded-circle text-white d-flex align-items-center justify-content-center"
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
            <span>{user.name}</span>
            <small className="text-muted">{user.email}</small>
          </div>
        </div>

        <BsFillSendFill color="green" size={18} />
      </div>
    </Card>
  );
};

const AllUsersModal = ({ show, handleClose, onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const handleSearch = () => {
    if (!searchText.trim()) return;
    onSearch(searchText);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response.data);
      } catch (err) {
        showError(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Modal show={show} size="md" onHide={handleClose} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Search Users</Modal.Title>
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

        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default AllUsersModal;
