import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";
import { checkFile, updateFile } from "../middlewares/filecheck.js";

const router = express.Router();

//getAllProducts,getTopRatedProducts, searchProduct,productAdd,
router.route("/products").get(getProducts).post(checkFile, createProduct);

//   getProductById, deleteProduct, updateProduct,
router
  .route("/products/:id")
  .get(getProduct)
  .patch(updateFile, updateProduct)
  .delete(removeProduct);

export default router;
