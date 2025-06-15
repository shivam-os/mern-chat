import express from "express";
import { guestUserLogin, loginUser, signupUser } from "./auth.controller.js";
import { validationHandler } from "../../middlewares/validationHandler.js";
import { loginSchema, signupSchema } from "./auth.validator.js";
import { REQ } from "../../config/constants.js";

export const authRoutes = express.Router();

authRoutes.post("/login", validationHandler(loginSchema, REQ.BODY), loginUser);
authRoutes.post(
  "/signup",
  validationHandler(signupSchema, REQ.BODY),
  signupUser
);
authRoutes.post("/guestUserLogin", guestUserLogin);
