import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const newUser = new User({ name, email, password, passwordConfirm, role });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token, user });
});
