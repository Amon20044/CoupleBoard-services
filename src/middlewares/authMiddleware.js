import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

// Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
  console.log('Headers:', req.headers); // Log all headers

  const token = req.header('authorization');
  console.log('Token received:', token); // Log received token

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(400).json({ message: 'Invalid token' });
  }
};

export { authenticateUser };
