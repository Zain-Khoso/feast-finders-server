import bcryptjs from "bcryptjs"
import { User } from "../../models/user.js";
import { Individual } from "../../models/individual.js";

export const individualSignup = async (req, res) => {
    try {
        let {
            country,
            city,
            email,
            phone,
            username,
            account_type,
            password,
            firstname,
            lastname,
            address,
            gender,
            dob,
            about_me,
        } = req.body;

        if (!country || !city || !email || !phone || !username || !account_type || !password || !firstname || !lastname || !address) {
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

        const individual = new Individual({
            firstname,
            lastname,
            address,
            gender,
            dob,
            about_me,
            userId: user?._id,
        });

        await individual.save();

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user?._id },
            { individual: individual?._id },
            { new: true }
        )

        return res.status(201).json({ status: true, message: "Individual account created successfully!" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error.", error })
    }
}