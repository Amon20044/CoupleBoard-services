import express from 'express';
import { registerUser, loginUser, getUserBy_ID } from '../controllers/userController.js';
const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/:id', getUserBy_ID);

export {authRoutes};