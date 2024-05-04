import { INTERNAL_SERVER_ERROR } from "../config/app.config.js"
import jwt from "jsonwebtoken"

export const verifyUser = (req, res, next) => {
    try {
        const { token } = req.headers;
        const { user: { _id } } = jwt.verify(token, process.env.JWT_SECRET)

        if (!_id) {
            return res.status(403).json({ status: false, message: "Please authenticate using valid token!" })
        }

        req._id = _id;
        next()
    } catch {
        res.status(500).json(INTERNAL_SERVER_ERROR)
    }
}