import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({ email });

    if (!isExist) return res.status(400).json({ message: "User not found" });
    const checkPass = bcrypt.compareSync(password, isExist.password);
    if (!checkPass)
      return res.status(400).json({ message: "Invalid credentials" });

    return res.status(201).json({ message: "User login successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    await User.create({
      email,
      username,
      password: hashPassword,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
