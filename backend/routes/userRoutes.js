import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/loginUser").post(loginUser);

export default userRouter;
