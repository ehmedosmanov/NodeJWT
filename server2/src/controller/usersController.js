import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      res.status(200).json({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).json({ message: "Not Found" });
    res
      .status(200)
      .json({ data: users, message: "Users retrieved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      username: username,
      password: hashPassword,
      role: role,
    });
    await newUser.save();
    res.status(200).json({ message: "Created User", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
