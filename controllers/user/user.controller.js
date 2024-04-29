import { User } from "../../models/user.js";

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