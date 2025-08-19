import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // need to check if email is in database
    const isExist = await User.findOne({ email });
    if (!isExist.email)
      return res.status(404).json({ message: "user not found" });
    const checkPass = bcrypt.compareSync(password, isExist.password);
    if (!checkPass)
      return res.status(400).json({ message: "invalid credentials" });
    // res.status(200).json({ message: "user successfully login" });
    // but we won't we doing this instead we are going to create the token(server and give them which is going to be sealed and we will be stored in the user local storage web browser)
    const token = jwt.sign({ id: isExist._id, role: isExist.role }, "secret");
    return res.status(200).json({
      token,
      role: isExist.role,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashpassword = bcrypt.hashSync(password, 10);
    await User.create({
      email,
      username,
      password: hashpassword,
    });
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
