import express from 'express';
import { handleReferralLink, updateReferralUser } from '../controllers/referralController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:referralCode', handleReferralLink);
router.post('/update', authMiddleware, updateReferralUser);

export default router;
