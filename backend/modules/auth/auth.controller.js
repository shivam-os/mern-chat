import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";
import { ApiError } from "../../helpers/ApiError.js";
import { ApiResponse } from "../../helpers/ApiResponse.js";

export const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //If user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User with given email already exists!");
    }

    //Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, hashedPassword });
    await newUser.save();

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Registration successful! Please log in to continue."
        )
      );
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //If user not found
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    //Send details
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return res.status(200).json(
      new ApiResponse(200, "Welcome again!", {
        token,
        id: user._id,
        name: user.name,
        email: user.email,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = () => {};
