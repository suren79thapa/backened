import express from "express";
import {
  loginSchema,
  registerSchema,
  validatorJoi,
} from "../utils/validator.js";
import { loginUser, registerUser } from "../controllers/userController.js";
import { methodNotAllowed } from "../utils/methodNotAllowed.js";
const router = express.Router();
router
  .route("/users/login")
  .post(validatorJoi.body(loginSchema), loginUser)
  .all(methodNotAllowed);
router
  .route("/users/register")
  .post(validatorJoi.body(registerSchema), registerUser)
  .all(methodNotAllowed);
export default router;
