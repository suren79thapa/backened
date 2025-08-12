import express from "express";
import productRoutes from "./routes/productRoutes.js";

//mvc

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello" });
});

app.use(productRoutes);
app.listen(port, (req, res) => {
  console.log("server is running");
});
