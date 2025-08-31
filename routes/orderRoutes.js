import express from "express";
import {
  createOrder,
  getOrder,
  getOrders,
} from "../controllers/orderController.js";
import { checkUser } from "../middlewares/checkAuth.js";
const router = express.Router();

router.route("/orders").get(checkUser, getOrders).post(checkUser, createOrder);
router.route("/orders/:id").get(getOrder);

export default router;
