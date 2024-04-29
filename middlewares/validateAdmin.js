import jwt from "jsonwebtoken"

export default validateAdmin = async (req, res, next) => {
    try {
        const { source, token } = req.headers
        if (!source || !token || source.toLowerCase() !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Authorization failed."
            })
        }
        const adminData = jwt.verify(token, process.env.JWT_SECRET)
        req.admin = adminData.admin
        next()
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error."
        })
    }
}