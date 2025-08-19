import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
  loginSchema,
  registerSchema,
  validatorJoi,
} from "../utils/validators.js";
// import { validatorJoi } from "../utils/validator.js";
// import { userCheck } from '../middlewares/authCheck.js';

const router = express.Router();

router.route("/login").post(validatorJoi.body(loginSchema), loginUser);
router.route("/register").post(validatorJoi.body(registerSchema), registerUser);
// router.route("/update").patch(userCheck, updateUser);

export default router;
