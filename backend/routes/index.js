import express from "express";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { authenticate } from "../middlewares/authHandler.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { userRoutes } from "../modules/user/user.routes.js";
import { chatRoutes } from "../modules/chat/chat.routes.js";

export const appRoutes = express.Router();

appRoutes.get("/health", (req, res) =>
  res.status(200).json(new ApiResponse(200, "Working", "App working fine!"))
);

appRoutes.use("/auth", authRoutes);
appRoutes.use("/users", authenticate, userRoutes);
appRoutes.use("/chats", authenticate, chatRoutes);
