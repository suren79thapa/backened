import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

//getAllProducts,getTopRatedProducts, searchProduct,productAdd,
router.route("/products").get(getProducts).post(createProduct);

//   getProductById, deleteProduct, updateProduct,
router
  .route("/products/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(removeProduct);

export default router;
