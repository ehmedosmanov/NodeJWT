import mongoose from "mongoose";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateUser = await userModel.findByIdAndUpdate(userId);
    const hashPass = bcrypt.hashSync(req.body.password, 10);
    if (updateUser) {
      userModel.username = req.body.username;
      userModel.password = hashPass;
      userModel.role = req.body.role;
    }
    res.status(200).json({ message: updateUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const findUser = await userModel.findById(userId);
    if (!findUser) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ user: findUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await userModel.findByIdAndDelete(userId);
    if (deleteUser) {
      res.status(200).json({ user: deleteUser });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ data: users, message: "Users retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { role } = req.body;
    const hash = await bcrypt.hashSync(req.body.password, 10);
    const newUser = new userModel({
      ...req.body,
      password: hash,
      role: role,
    });
    await newUser.save()
    res.status(200).json({ message: "Created User", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
