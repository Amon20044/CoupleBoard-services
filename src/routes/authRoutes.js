import express from 'express';
import { registerUser, loginUser, getUserBy_ID } from '../controllers/userController.js';
import { upload } from '../utils/multer.js';
const authRoutes = express.Router();

authRoutes.post('/register',upload, registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/:id', getUserBy_ID);

export {authRoutes};