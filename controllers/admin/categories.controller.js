import { Admin } from "../../models/admin.js";
import { BusinessCategory } from "../../models/business-categories.js";

export const AddNewCategory = async (req, res) => {
    try {
        const { name } = req.body; // name must be unique
        const admin = await Admin.findById(req.admin._id);

        if (!admin) {
            return res.status(403).json({ status: false, message: "Access denied." })
        }

        if (!name) {
            return res.status(400).json({ status: false, message: "Required fields are missing!" })
        }

        const category = await BusinessCategory.create({ name });
        await category.save();

        return res.status(201).json({
            status: true,
            message: 'New category added successfully.',
            category
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error!" })
    }
}