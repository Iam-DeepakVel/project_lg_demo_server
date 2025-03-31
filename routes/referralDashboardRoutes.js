import express from 'express';
import { getReferralDashboard } from '../controllers/referralDashboardController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/stats', authMiddleware, getReferralDashboard);

export default router;
