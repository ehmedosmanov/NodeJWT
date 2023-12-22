import express from 'express'
import { createUser, deleteUser, getAllUsers } from '../controller/usersController.js';
import { verifyAuth } from '../middleware/verifyAuth.js';

export const userRouter = express.Router();


userRouter.get('/user', getAllUsers)

userRouter.post('/user', createUser)

userRouter.delete('/user/:id', verifyAuth ,deleteUser)