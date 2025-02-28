import app from "./app.js";
import Task from "./models/Task.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
console.log(Task);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
