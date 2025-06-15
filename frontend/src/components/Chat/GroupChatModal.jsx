import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import AsyncMultiSelect from "../global/AsyncMultiSelect.jsx";
import { createNewChat } from "../../services/chatService";
import { showError } from "../../utils/utils";
import { toast } from "react-toastify";
import { getAllUsers } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext.jsx";

const getUser = (user) => {
  return [{ label: user.name, value: user.id }];
};

const GroupChatModal = ({ show, handleClose }) => {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(() => getUser(user));

  const loadUserOptions = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await getAllUsers(inputValue);
      return response.data.map((user) => ({
        label: user.name,
        value: user.id,
      }));
    } catch (err) {
      showError(err);
      return [];
    }
  };

  const handleSubmit = async () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      return showError("Please provide a group name and select users.");
    }

    const payload = {
      name: groupName,
      isGroup: true,
      users: selectedUsers.map((u) => u.value),
    };

    try {
      const response = await createNewChat(payload);
      toast.success(response.message);
      handleClose();
    } catch (err) {
      showError(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Group Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter group chat name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Add Users</Form.Label>
          <AsyncMultiSelect
            loadOptions={loadUserOptions}
            value={selectedUsers}
            onChange={setSelectedUsers}
            placeholder="Search users..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupChatModal;
