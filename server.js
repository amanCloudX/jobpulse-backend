import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import protectedRoute from "./routes/protectedRoute.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", protectedRoute);
app.use("/", jobRoutes);
app.use("/", applicationRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server Running On Port 4000");
});
