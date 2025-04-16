import { createUser, getUserByEmail, getMediaByUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import process from 'process';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register User (Couple Sign-up)
const registerUser = async (req, res) => {
  try {
    const { name_1, name_2, partner1_email, partner2_email, password_hash, f_url, m_url } = req.body;
    console.log(req.body)
    if (!name_1 || !name_2 || !partner1_email || !partner2_email || !password_hash) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await getUserByEmail(partner1_email) || await getUserByEmail(partner2_email);
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    console.log(m_url, f_url)
    // Create the user
    const user = await createUser(name_1, name_2, partner1_email, partner2_email, password_hash, m_url, f_url);
    
    res.status(201).json({ message: 'User registered successfully', user });

  } catch (error) {
    res.status(500).json({ message: 'User registration failed', error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Get User by ID
const getUserBy_ID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getMediaByUser(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

export { registerUser, loginUser, getUserBy_ID };
