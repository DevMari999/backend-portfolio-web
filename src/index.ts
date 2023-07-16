import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
import cors from "cors";


import { configs } from "./configs/configs";
import {IForm} from "./types/form.type";
import {Form} from "./models/Form.model";

const index = express();

index.use(cors());
index.use(express.json());
index.use(express.urlencoded({ extended: true }));

index.get("/forms",
    async (req: Request, res: Response): Promise<Response<IForm[]>> => {
    try {
        const forms = await Form.find({});

        return res.json(forms);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to fetch forms" });
    }
});

index.post(
    "/submit",
    async (req: Request, res: Response): Promise<Response<IForm>> => {
        try {
            const createdUser = await Form.create(req.body);

            return res.status(201).json(createdUser);
        } catch (e) {
            console.log(e);
        }
    }
);

index.listen( configs.PORT, () => {
    mongoose.connect(configs.DB_URL);
    console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});

