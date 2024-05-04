import { config } from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

// route imports
import userRoutes from "./routes/users.js"
import adminRoutes from "./routes/admin.js"
import { CORS_CONFIG } from "./config/app.config.js"

// cofiguration
config()
const app = express()

app.options("", cors(CORS_CONFIG))
app.use(cors(CORS_CONFIG))
app.use(express.json())


// routes 
app.get("/", (_, res) => {
    res.send("Feast Finders api!")
})
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)

// server listen and db coonection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("server and db connected!")
})

app.listen(process.env.PORT, () => {
    console.log("server connected")
})