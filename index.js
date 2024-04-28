import { config } from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

// cofiguration
config()
const app = express()

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*"
}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello WOrld!")
})

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("server and db connected!")
    })
})