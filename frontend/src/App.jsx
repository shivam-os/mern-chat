import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import ChatProvider from "./contexts/ChatsContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </AuthProvider>
    </>
  );
}

export default App;
