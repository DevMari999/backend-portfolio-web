import { model, Schema } from "mongoose";

const formSchema =  new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            required: true,
        }
    }
)

export const Form = model("form", formSchema);