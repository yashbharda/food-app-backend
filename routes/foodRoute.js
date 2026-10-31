import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
} from "../controllers/foodController.js";

const router = express.Router();

// routes

// CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

// Get All Food
router.get("/getAll", getAllFoodController);

// Get Single Food
router.get("/get/:id", getFoodByIdController);

// Get Food By Resturant
router.get("/getByResturant/:id", getFoodByResturantController);

// Update Food
router.put("/update/:id", authMiddleware, updateFoodController);

// Delete Food
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// Place Order
router.post("/placeorder", authMiddleware, placeOrderController);

export default router;
