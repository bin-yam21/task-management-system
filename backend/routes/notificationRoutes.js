import express from "express";
import Notification from "../models/Notification.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

// 📩 Get notifications for a user
router.get(
  "/:userId",
  catchAsync(async (req, res) => {
    const notifications = await Notification.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: notifications.length,
      data: {
        notifications,
      },
    });
  })
);

export default router;
