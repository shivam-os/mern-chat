import { Container, Row, Col } from "react-bootstrap";
import MyChats from "../components/Chat/MyChats";
import ChatHeader from "../components/Chat/ChatHeader";
import SingleChat from "../components/Chat/SingleChat";

const Chat = () => {
  return (
    <Container
      fluid
      style={{
        width: "100%",
        padding: "10px",
        height: "100%",
      }}
    >
      <ChatHeader />
      <Row style={{ height: "100%" }}>
        <Col style={{ borderRight: "1px solid #ccc" }}>
          <MyChats />
        </Col>
        <Col md={8}>
          <SingleChat />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
