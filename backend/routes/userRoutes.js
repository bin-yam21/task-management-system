import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
// import { signup } from "../controllers/authController.js";

const userRouter = express.Router();
// userRouter.post("/signup", signup);
userRouter.route("/register").post(registerUser);
userRouter.route("/loginUser").post(loginUser);

export default userRouter;
