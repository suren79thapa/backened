import dotenv from "dotenv";
dotenv.config();
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
// import qs from "qs";
//mvc

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("database connected and server running");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // Set FRONTEND_URL in Render
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);
app.use(cookieParser());

app.use(express.static("uploads"));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.use(express.json());
// app.set("query parser", (str) => qs.parse(str));
app.get("/", (req, res) => {
  // console.log(req.cookies.jwt);
  return res.status(200).json({ message: "hello" });
});

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);
