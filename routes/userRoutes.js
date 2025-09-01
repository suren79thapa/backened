import express from "express";
import {
  loginSchema,
  registerSchema,
  validatorJoi,
} from "../utils/validator.js";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { methodNotAllowed } from "../utils/methodNotAllowed.js";
import { checkUser } from "../middlewares/checkAuth.js";
const router = express.Router();
router.route("/users").get(checkUser, getUser).all(methodNotAllowed);
router
  .route("/users/update")
  .patch(checkUser, updateUser)
  .all(methodNotAllowed);
router
  .route("/users/login")
  .post(validatorJoi.body(loginSchema), loginUser)
  .all(methodNotAllowed);
router
  .route("/users/register")
  .post(validatorJoi.body(registerSchema), registerUser)
  .all(methodNotAllowed);
export default router;
