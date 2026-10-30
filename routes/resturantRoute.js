import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createResturantController,
  deleteResturantById,
  getAllResturantController,
  getResturantById,
} from "../controllers/resturantController.js";

const router = express.Router();

// routes

// Create Resturant || Post
router.post("/create", authMiddleware, createResturantController);

// GET ALL Resturant
router.get("/getAll", authMiddleware, getAllResturantController);

// GET SINGLE Resturant
router.get("/get/:id", authMiddleware, getResturantById);

// Delete Resturant
router.delete("/delete/:id", authMiddleware, deleteResturantById);

export default router;
