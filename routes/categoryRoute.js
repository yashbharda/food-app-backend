import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// routes

// Create Category
router.post("/create", authMiddleware, createCategoryController);

// Get All Category
router.get("/getAll", authMiddleware, getAllCategoryController);

// Update Category
router.put("/update/:id", authMiddleware, updateCategoryController);

// Delete Category
router.delete("/delete/:id", authMiddleware, deleteCategoryController);
export default router;
