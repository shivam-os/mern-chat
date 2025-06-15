import { Routes, Route, Navigate } from "react-router-dom";
import { PAGE_URLS } from "../config/app.config";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PAGE_URLS.HOME} index element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/chats" element={<Chat />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
