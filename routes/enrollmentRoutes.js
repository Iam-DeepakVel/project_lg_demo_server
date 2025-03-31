import express from 'express';
import { enrollCourse, createCourse } from '../controllers/enrollmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/enroll', authMiddleware, enrollCourse);
router.post('/create', createCourse);

export default router;
