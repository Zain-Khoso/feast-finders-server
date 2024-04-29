import { Router } from "express";
import { getAllCategories } from "../controllers/admin/categories.controller.js";
import { checkUserAvailability } from "../controllers/user/user.controller.js";
import { checkBusinessAvailability } from "../controllers/user/business.controller.js";

const router = Router()

// auth routes 
router.post("/available", checkUserAvailability)
router.post("/auth/login")
router.post("/verify-user/:token")

// individual routes
router.post("/individual/signup")
router.post("/individual/become-a-rider")

// business routes
router.post("/business/available", checkBusinessAvailability)
router.post("/business/signup")
router.get("/business/categories/get-all-categories", getAllCategories)

export default router;