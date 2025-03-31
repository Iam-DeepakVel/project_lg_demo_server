import { findUserById } from '../repositories/userRepository.js';
import Course from '../models/Course.js';

export const getUser = async (req, res) => {
    const userId = req.user;
    const user = await findUserById(userId);
    res.status(200).json(user);
};

export const getDashboardStats = async (req, res) => {
    const userId = req.user;
    const user = await findUserById(userId);
    res.status(200).json(user);
};

export const getMyCourses = async (req, res) => {
    const userId = req.user;
    const user = await findUserById(userId);
    const courses = await Course.find({ _id: { $in: user.enrolledCourses } });
    res.status(200).json(courses);
};
