import { Routes, Route } from "react-router-dom";
import { PAGE_URLS } from "../config/app.config";
import Home from "../pages/Home";
import Chat from "../pages/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PAGE_URLS.HOME} index element={<Home />} />
      <Route path={PAGE_URLS.CHAT} element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
