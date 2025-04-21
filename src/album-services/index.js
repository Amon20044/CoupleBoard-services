// server.js or index.js
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import { albumRoutes } from './routes/albumRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config(); // Load env vars

const app = express();

// ---------- Global Middleware ----------
app.use(cors({
    credentials: true,
}));
app.use(helmet()); // Secure HTTP headers
app.use(morgan('dev')); // Log requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Album Service API is running!' });
});

// Mount album routes
app.use('/api/albums', albumRoutes);

// ---------- 404 Handler ----------
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ---------- Error Handler ----------
app.use(errorHandler);

// ---------- Server ----------
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Export for testing or shutdown
export default server;
