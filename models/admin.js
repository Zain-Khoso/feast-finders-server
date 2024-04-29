import { Schema, model } from "mongoose";

const adminSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "moderator"]
        }
    },
    {
        timestamps: true
    }
)

export const Admin = model("admin", adminSchema)