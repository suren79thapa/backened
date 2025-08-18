import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  getTop5products,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";
import { checkFile, updateFile } from "../middlewares/filecheck.js";
import {
  productSchema,
  productupdateSchema,
  validatorJoi,
} from "../utils/validator.js";

const router = express.Router();

//getAllProducts,getTopRatedProducts, searchProduct,productAdd,
router
  .route("/products")
  .get(getProducts)
  .post(validatorJoi.body(productSchema), checkFile, createProduct);
router.route("/top-5-products").get(getTop5products, getProducts);
//   getProductById, deleteProduct, updateProduct,
router
  .route("/products/:id")
  .get(getProduct)
  .patch(validatorJoi.body(productupdateSchema), updateFile, updateProduct)
  .delete(removeProduct);

export default router;
