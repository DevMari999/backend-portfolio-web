import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
import cors from "cors";


import { configs } from "./configs/configs";
import {IForm} from "./types/form.type";
import {Form} from "./models/Form.model";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
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

app.listen( configs.PORT, () => {
    mongoose.connect(configs.DB_URL);
    console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});

// app.listen( process.env.PORT, () => {
//     mongoose.connect(configs.DB_URL);
//     console.log(`Server has started on PORT ${configs.PORT} 🥸`);
// });
