import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import traditionRoutes from "./routes/tRoutes.js";
import heritageRoutes from "./routes/heritageRoutes.js";
import festivalRoutes from "./routes/festivalRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env (works regardless of CWD)
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/traditions", traditionRoutes);
app.use("/api/heritages", heritageRoutes);
app.use("/api/festivals", festivalRoutes);

// Environment validation
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Check your environment variables.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is missing. Auth routes may fail.");
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
