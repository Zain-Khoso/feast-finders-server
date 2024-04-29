import { Router } from "express";

const router = Router()

// auth routes 
router.post("/auth/login")
router.post("/available")
router.post("/verify-user/:token")

// individual routes
router.post("/individual/signup")
router.post("/individual/become-a-rider")

// business routes
router.post("/business/signup")
router.post("business/categories/get-all-categories")

export default router;