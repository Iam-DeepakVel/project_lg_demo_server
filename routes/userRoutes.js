import express from 'express';
import { getUser, getMyCourses } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { incrementClickRate } from '../controllers/referralController.js';

const router = express.Router();

router.get('/get-user', authMiddleware, getUser);
router.get('/get-my-courses', authMiddleware, getMyCourses);
router.post('/increment-click-rate', incrementClickRate);

export default router;
