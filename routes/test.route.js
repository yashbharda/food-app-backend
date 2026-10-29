import express from "express";
import { testUserController } from "../controllers/testController.js";

// router
const router = express.Router();

// routes
router.get("/test-user", testUserController);

export default router;
