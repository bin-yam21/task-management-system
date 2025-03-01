import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// 📩 Get notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
