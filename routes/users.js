import { Router } from "express";
import { getAllCategories } from "../controllers/admin/categories.controller.js";
import { authenticateUser, checkUserAvailability, userLogin } from "../controllers/user/user.controller.js";
import { BusinessSignup, checkBusinessAvailability } from "../controllers/user/business.controller.js";
import { becomeRider, individualSignup } from "../controllers/user/individual.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router()

// auth routes 
router.post("/available", checkUserAvailability)
router.post("/auth/login", userLogin)
router.get("/auth/verify-user/:token", authenticateUser)

// individual routes
router.post("/individual/signup", individualSignup)
router.post("/individual/become-a-rider", verifyUser, becomeRider)

// business routes
router.post("/business/available", checkBusinessAvailability)
router.post("/business/signup", BusinessSignup)
router.get("/business/categories/get-all-categories", getAllCategories)

export default router;