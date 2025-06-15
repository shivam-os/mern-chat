import express from "express";
import { getAllUsers } from "./user.controller.js";

export const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
