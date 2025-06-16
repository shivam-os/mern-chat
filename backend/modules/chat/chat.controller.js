import { ApiError } from "../../helpers/ApiError.js";
import { ApiResponse } from "../../helpers/ApiResponse.js";
import { Chat } from "./chat.model.js";

export const getAllChats = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assumes you have authentication middleware setting req.user

    const chats = await Chat.find({
      $or: [{ admin: userId }, { users: { $in: [userId] } }],
    })
      .populate("admin", "-password")
      .populate("users", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json(new ApiResponse(200, null, chats));
  } catch (error) {
    next(error);
  }
};

export const getChatDetails = () => {};

export const createNewChat = async (req, res, next) => {
  try {
    const { users, name, isGroup } = req.body;
    const admin = req.user.id;

    // Ensure admin (sender) is in the users list
    if (!users.includes(admin)) {
      users.push(admin);
    }

    if (!isGroup) {
      // For 1-on-1
      const existingChat = await Chat.findOne({
        isGroup: false,
        users: { $all: users, $size: 2 },
      });

      if (existingChat) {
        throw new ApiError(409, "Chat already exists!");
      }
    }

    // Create new chat
    const newChat = await Chat.create({
      name,
      isGroup,
      users,
      admin,
    });

    const fullChat = await Chat.findById(newChat._id)
      .populate("admin", "-password")
      .populate("users", "-password");

    res
      .status(201)
      .json(new ApiResponse(201, "Chat created successfully!", fullChat));
  } catch (error) {
    next(error);
  }
};

export const editExistingChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { name, users } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { name, users },
      {
        new: true,
      }
    )
      .populate("admin", "-password")
      .populate("users", "-password");

    if (!updatedChat) {
      return res.status(404).json(new ApiResponse(404, "Chat not found."));
    }

    res.status(200).json(new ApiResponse(200, "Chat edited successfully!"));
  } catch (error) {
    next(error);
  }
};

export const deleteExistingChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json(new ApiError(404, "Chat not found."));
    }

    res.status(200).json(new ApiResponse(200, "Chat deleted successfully!"));
  } catch (error) {
    next(error);
  }
};
