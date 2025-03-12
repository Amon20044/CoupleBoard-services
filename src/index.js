import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';

import { errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';

dotenv.config();

const app = express(); // Declare app

app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow only your frontend URL
    credentials: true, // Allow cookies if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(" Hello Fam, I am Amon and this is API for my project!");
});

app.use('/api', routes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

export default app;
