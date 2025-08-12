import express from "express";
import {
  AddProduct,
  findProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();
// now we will be defining the routes which will be responsible for handling the routes
//getallproduct,addproduct,search product,toprated product
router.route("/products").get(getProducts).post(AddProduct);
router.route("/products/:id").get(findProduct);
// getproductbyId,deleteproduct,updateproduct
// router.route("/products/:id").get().patch().delete();
export default router;
