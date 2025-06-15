import { useState } from "react";
import { Container, Tab, Tabs, Card } from "react-bootstrap";
import Login from "../components/Home/Login";
import Signup from "../components/Home/Signup";

function Home() {
  const [activeTab, setActiveTab] = useState("login");

  // // Optional: redirect authenticated users to /chats
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   if (user) window.location.href = "/chats";
  // }, []);

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card className="w-100 text-center p-3 mb-4 shadow-sm">
        <h1 className="display-5 fw-semibold">Chat App</h1>
      </Card>

      <Card className="w-100 p-4 shadow-sm">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          id="auth-tabs"
          justify
        >
          <Tab eventKey="login" title="Login">
            <Login />
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <Signup onSignupSuccess={() => setActiveTab("login")} />
          </Tab>
        </Tabs>
      </Card>
    </Container>
  );
}

export default Home;
