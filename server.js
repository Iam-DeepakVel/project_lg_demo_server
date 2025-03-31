import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import userRoutes from './routes/userRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import referralDashboardRoutes from './routes/referralDashboardRoutes.js';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "*" })); 
app.use(express.json());
app.use(cookieParser()); 
app.use(morgan("tiny"));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/referral', referralRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', enrollmentRoutes);
app.use('/api/v1/dashboard', referralDashboardRoutes);

app.get('/', (req, res) => res.send('API is running...'));

export default app;
