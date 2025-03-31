import Course from '../models/Course.js';

export const findCourseById = async (courseId) => Course.findById(courseId);
export const getAllCourses = async () => Course.find();
export const createNewCourse = async (courseData) => new Course(courseData).save();
