import { Schema, model } from 'mongoose';

const businessCategoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export const BusinessCategory = model('business-category', businessCategoriesSchema);