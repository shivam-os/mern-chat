import express from "express";
import {
  createNewChat,
  deleteExistingChat,
  editExistingChat,
  getAllChats,
  getChatDetails,
} from "./chat.controller.js";
import { validationHandler } from "../../middlewares/validationHandler.js";
import {
  chatIdParamSchema,
  createChatSchema,
  editChatSchema,
} from "./chat.validator.js";
import { REQ } from "../../config/constants.js";

export const chatRoutes = express.Router();

chatRoutes.get(
  "/:chatId",
  validationHandler(chatIdParamSchema, REQ.PARAMS),
  getChatDetails
);
chatRoutes.get("/", getAllChats);
chatRoutes.post(
  "/",
  validationHandler(createChatSchema, REQ.BODY),
  createNewChat
);
chatRoutes.put(
  "/:chatId",
  validationHandler(chatIdParamSchema, REQ.PARAMS),
  validationHandler(editChatSchema, REQ.BODY),
  editExistingChat
);
chatRoutes.delete(
  "/:chatId",
  validationHandler(chatIdParamSchema, REQ.PARAMS),
  deleteExistingChat
);
