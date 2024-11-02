import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running at port", PORT);
});
