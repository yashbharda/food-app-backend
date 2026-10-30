import express from "express";
import {
  deleteProfileController,
  getUserController,
  resetPasswordController,
  updatePasswordController,
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

// Password Update
router.post("/updatePassword", authMiddleware, updatePasswordController);

// Delete User
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

export default router;
