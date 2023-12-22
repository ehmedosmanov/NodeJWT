import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();


app.use("/api/auth", authRouter);
app.use("/api", userRouter)


const port = process.env.PORT;

const URL = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(URL).catch((err) => console.log(`ERROR: ${err}`))


app.listen(port, (req,res) => {
    console.log('server connected');
})