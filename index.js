import { config } from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

// route imports
import userRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"

// cofiguration
config()
const app = express()

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*"
}))
app.use(express.json())


// routes 
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)

// server listen
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("server and db connected!")
    })
})