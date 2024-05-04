import bcryptjs from "bcryptjs"
import { User } from "../../models/user.js";
import { Individual } from "../../models/individual.js";
import { INTERNAL_SERVER_ERROR, NO_USER_ERROR, REQUIRED_FIELDS_ERROR } from "../../config/app.config.js";
import { Rider } from "../../models/rider.js";

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
            return res.status(400).json(REQUIRED_FIELDS_ERROR)
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
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}

export const becomeRider = async (req, res) => {
    try {
        const { _id } = req;

        let userDetails = await User.findById(_id)
        if (!userDetails || !userDetails.individual) {
            return res.status(404).json(NO_USER_ERROR)
        }

        let user = await Individual.findById(userDetails.individual)
        if (!user) {
            return res.status(404).json(NO_USER_ERROR)
        }

        if (user?.rider !== "") {
            return res.status(403).json({ status: false, message: "Already a rider." })
        }

        const dob = new Date(user.dob)
        const age = +Math.floor((new Date().getTime() - dob.getTime()) / 1000 / 60 / 60 / 24 / 365.25); // getting age in years

        if (age < 18) {
            return res.status(403).json({ status: false, message: 'You must be at least 18 years old to become a rider.' })
        }

        const rider = new Rider({
            user_id: _id,
        });

        await rider.save();

        await Individual.findByIdAndUpdate(
            _id,
            { rider: rider._id },
            { new: true }
        );

        return res.status(200).json({ status: true, message: 'Became a rider successfully!', rider })
    } catch {
        return res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}