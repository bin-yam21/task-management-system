import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["todo", "in progress", "done"],
    default: "todo",
  },
  deadline: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
