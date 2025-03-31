import { enrollInCourse } from "../services/enrollmentService.js";
import { createNewCourse } from "../repositories/courseRepository.js";

export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user;
    const { courseId } = req.body;

    const response = await enrollInCourse(userId, courseId);

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const course = await createNewCourse({ name, description, price });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
