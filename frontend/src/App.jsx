import AppRoutes from "./routes/AppRoutes";
import ChatProvider from "./contexts/ChatsContext";

function App() {
  return (
    <>
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </>
  );
}

export default App;
