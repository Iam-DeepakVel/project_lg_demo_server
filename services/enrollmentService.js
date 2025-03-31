import { findUserById, enrollUserInCourse } from '../repositories/userRepository.js';
import { findCourseById } from '../repositories/courseRepository.js';
import { addReferralEnrollment } from '../repositories/referralRepository.js';

export const enrollInCourse = async (userId, courseId) => {
    const user = await findUserById(userId);
    if (!user) throw new Error("User not found");

    const course = await findCourseById(courseId);
    if (!course) throw new Error("Course not found");

    await enrollUserInCourse(userId, courseId.toString());

    if (user.referredBy) {
        await addReferralEnrollment(user.referredBy, userId, user.email, user.name, courseId.toString());
    }

    return { message: "Enrollment successful", courseName: course.name };
};
