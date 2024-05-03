import { BusinessCategory } from "../../models/business-categories.js";
import { Business } from "../../models/business.js";
import { Individual } from "../../models/individual.js";
import { User } from "../../models/user.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const checkUserAvailability = async (req, res) => {
    try {
        const { email, phone, username } = req.body;
        const errors = {
            email: "",
            phone: "",
            username: ""
        }

        if (!email || !phone || !username) {
            return res.status(400).json({ status: false, message: "Required fields are missing!" })
        }

        const [emailUser, phoneUser, usernameUser] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ phone }),
            User.findOne({ username })
        ]);

        if (emailUser) errors.email = "Email is in use.";
        if (phoneUser) errors.phone = "Phone number is in use.";
        if (usernameUser) errors.username = "Username is taken.";

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ status: false, message: "Email, phone, or username is in use.", errors });
        }

        return res.status(200).json({ status: true, message: "Email, phone, and username are available." })
    } catch {
        return res.status(500).json({ status: false, message: "Internal server error." })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { query, password } = req.body;

        let user = query.includes('@')
            ? await User.findOne({ email: query })
            : await User.findOne({ username: query });

        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid Credentials!' });
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ status: false, message: 'Invalid Credentials!' });
        }

        // getting specific account details based on account type
        user[user.account_type] =
            user.account_type === 'individual'
                ? await Individual.findOne({ userId: user._id })
                : await Business.findOne({ userId: user._id });

        if (user.account_type === 'business') {
            const _id = user.business.business_category;
            user.business.business_category = await BusinessCategory.findOne({
                _id,
            });
        }

        const payload = {
            user: {
                _id: user._id,
            },
        };


        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(201).json({ status: true, message: 'Logged in successfully', token });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error." })
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const { token } = req.params;
        const { user: { _id } } = jwt.verify(token, process.env.JWT_SECRET)

        if (!_id) {
            return res.status(403).json({ status: false, message: "Please authenticate using valid token!" })
        }

        let user = await User.findById(_id).select("-password")

        if (!user) {
            return res.status(404).json({ status: false, message: 'No user found!' });
        }

        // getting specific account details based on account type
        user[user.account_type] =
            user.account_type === 'individual'
                ? await Individual.findOne({ userId: user._id })
                : await Business.findOne({ userId: user._id });

        if (user.account_type === 'business') {
            const _id = user.business.business_category;
            user.business.business_category = await BusinessCategory.findOne({
                _id,
            });
        }

        res.status(200).json({ status: true, message: "Fetched user details successfully!", user })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error.", error })
    }

}