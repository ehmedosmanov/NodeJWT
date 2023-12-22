import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { authRouter } from './routes/authRouter.js'
import { userRouter } from './routes/userRouter.js'

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api', userRouter)


const PORT = process.env.PORT
const URL = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect(URL).catch((err) => {
    console.log(err)
})

app.listen(PORT, (req,res) => {
    console.log(`Connected to PORT - ${PORT}`);
})
