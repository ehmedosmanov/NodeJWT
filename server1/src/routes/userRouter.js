import express from "express";
import {  createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import {verifyToken } from "../middleware/verifyToken.js";

export const userRouter = express.Router();


userRouter.get("/user", getAllUsers)
userRouter.get("/user/:id", getUserById)
userRouter.put("/user/:id", verifyToken, updateUser);
userRouter.delete("/user/:id", verifyToken, deleteUser);
userRouter.post("/user", verifyToken, createUser);


