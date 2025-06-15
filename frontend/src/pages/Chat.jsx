import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Chatbox from "../components/Chat/Chatbox";
import MyChats from "../components/Chat/MyChats";
// import SideDrawer from "../components/miscellaneous/SideDrawer";
import { useAuth } from "../contexts/AuthContext";
import ChatHeader from "../components/Chat/ChatHeader";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Container
      fluid
      style={{
        width: "100%",
        padding: "10px",
        height: "91.5vh",
        border: "1px solid goldenrod",
      }}
    >
      <ChatHeader />
      <Row style={{ height: "100%" }}>
        {
          <>
            <Col style={{ borderRight: "1px solid #ccc" }}>
              <MyChats fetchAgain={fetchAgain} />
            </Col>
            <Col md={8}>
              <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </Col>
          </>
        }
      </Row>
    </Container>
  );
};

export default Chat;
