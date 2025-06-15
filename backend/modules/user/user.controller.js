import { ApiResponse } from "../../helpers/ApiResponse.js";
import { User } from "./user.model.js";
import { ApiError } from "../../helpers/ApiError.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";

    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};

    const users = await User.find(filter).select("-hashedPassword");

    if (!users.length) {
      throw new ApiError(404, "No users found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Users fetched successfully!", users));
  } catch (err) {
    next(err);
  }
};
