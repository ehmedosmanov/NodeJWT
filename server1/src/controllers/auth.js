import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const userExist = await userModel.findOne({ username: username });
    if (userExist)
      return res.status(409).json({ message: "Username already exist" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new userModel({
      username: username,
      password: hashedPassword,
      role
    });
    await newUser.save();
    res.status(200).json({ message: "User registered "});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    
    if (!user || !(await bcrypt.compareSync(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const generateToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" } 
    );
    res.json({ message: 'Login successful', token: generateToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
