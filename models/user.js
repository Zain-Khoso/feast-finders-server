import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, "Email is already in use."]
        },
        phone: {
            type: String,
            required: true,
            unique: [true, "Phone number is already in use."]
        },
        username: {
            type: String,
            required: true,
            unique: [true, "Username is already in use."]
        },
        account_type: {
            type: String,
            enum: ['individual', 'business'],
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 30,
        },
        status: {
            type: String,
            enum: ['active', 'disable', 'suspended', 'deleted'],
            default: 'active',
        },
        individual: {
            type: Schema.Types.ObjectId,
            ref: 'individual',
            required: false,
        },
        business: {
            type: Schema.Types.ObjectId,
            ref: 'business',
            required: false,
        },
    },
    {
        timestamps: true,
    }
);
export const User = model('User', userSchema);