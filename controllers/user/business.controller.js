import { Business } from "../../models/business.js";

export const checkBusinessAvailability = async (req, res) => {
    try {
        const { business_name } = req.body;

        if (!business_name) {
            return res.status(400).json({ status: false, message: "Required fields are missing!" })
        }

        const business = await Business.findOne({ business_name })
        if (business) {
            return res.status(400).json({ status: false, message: "Business name is already registered." });
        }

        return res.status(200).json({ status: true, message: "Business name is available." })
    } catch {
        return res.status(500).json({ status: false, message: "Internal server error." })
    }
}