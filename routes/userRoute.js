import express from "express";
import {
  getUserController,
  resetPasswordController,
  updateUserController,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// GET USER
router.get("/getUser", authMiddleware, getUserController);

// Update Profile
router.put("/updateUser", authMiddleware, updateUserController);

// Reset Password
router.post("/resetPassword", authMiddleware, resetPasswordController);

export default router;
