import express from "express";
import productRoutes from "./routes/productRoutes.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

//mvc

const app = express();
const port = 5000;

mongoose
  .connect(
    "mongodb+srv://thapasurendra447:KLus2sgihJBUCkSi@cluster0.pwck3ty.mongodb.net/Shop"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("database connected and server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello" });
});

app.use(productRoutes);
