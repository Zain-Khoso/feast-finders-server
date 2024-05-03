import { Business } from "../../models/business.js";
import { User } from "../../models/user.js";
import bcryptjs from "bcryptjs"

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

export const BusinessSignup = async (req, res) => {
    try {
        let {
            country,
            city,
            email,
            phone,
            username,
            account_type,
            password,
            business_name,
            business_hours,
            business_category,
            address,
            gender,
            dob,
            about_me,
        } = req.body;

        if (!country || !city || !email || !phone || !username || !account_type || !password || !business_name || !business_category || !address) {
            return res.status(400).json({ status: false, message: "Required fields are missing!" })
        }

        const salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password, salt);

        const user = new User({
            country,
            city,
            email,
            phone,
            username,
            account_type,
            password,
        });

        await user.save();

        const business = new Business({
            business_name,
            business_hours,
            business_category,
            address,
            gender,
            dob,
            about_me,
            userId: user?._id,
        });

        await business.save();

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user?._id },
            { business: business?._id },
            { new: true }
        )

        return res.status(201).json({ status: true, message: "Business account created successfully!" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error.", error })
    }
}