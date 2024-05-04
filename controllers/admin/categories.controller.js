import { ACCESS_DENIED_ERROR, INTERNAL_SERVER_ERROR, REQUIRED_FIELDS_ERROR } from "../../config/app.config.js";
import { Admin } from "../../models/admin.js";
import { BusinessCategory } from "../../models/business-categories.js";


export const getAllCategories = async (_, res) => {
    try {
        const categories = await BusinessCategory.find({})
        return res.status(200).json({ status: true, message: "Categories found!", categories })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}

export const AddNewCategory = async (req, res) => {
    try {
        const { name } = req.body; // name must be unique
        const admin = await Admin.findById(req.admin._id);

        if (!admin) {
            return res.status(403).json(ACCESS_DENIED_ERROR)
        }

        if (!name) {
            return res.status(400).json(REQUIRED_FIELDS_ERROR)
        }

        const category = await BusinessCategory.create({ name });
        await category.save();

        return res.status(201).json({
            status: true,
            message: 'New category added successfully.',
            category
        });
    } catch {
        res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}