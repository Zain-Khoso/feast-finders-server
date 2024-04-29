import { Router } from "express";
import { AddNewCategory } from "../controllers/admin/categories.controller.js";
import validateAdmin from "../middlewares/validateAdmin.js";

const router = Router()

router.post("/business/categories/add-category", validateAdmin, AddNewCategory)

export default router;