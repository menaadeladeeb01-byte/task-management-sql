import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './config/db.js'; 

import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;


