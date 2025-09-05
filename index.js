// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Import your routes
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// ----------------- CORS Configuration -----------------
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  process.env.FRONTEND_URL, // deployed Vercel frontend
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ----------------- Middlewares -----------------
app.use(cookieParser());
app.use(express.json());
app.use(express.static("uploads"));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  })
);

// ----------------- Routes -----------------
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running!" });
});

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connected & server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // stop server if DB fails
  });
