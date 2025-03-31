import User from '../models/User.js';

export const findUserByEmail = async (email) => User.findOne({ email });
export const createUser = async (userData) => new User(userData).save();
export const findUserByReferralCode = async (referralCode) => User.findOne({ referralCode });
export const findUserById = async (userId) => User.findById(userId).select('-password -updatedAt');
export const incrementReferralCount = async (userId) => User.findByIdAndUpdate(userId, { $inc: { referralCount: 1 } }, { new: true });
export const updateReferral = async (userId, newReferrerId) => User.findByIdAndUpdate(userId, { referredBy: newReferrerId }, { new: true });


export const enrollUserInCourse = async (userId, courseId) => {
    return User.findByIdAndUpdate(userId, { $addToSet: { enrolledCourses: courseId } }, { new: true });
};

export const getReferredUsersWithCourses = async (referrerId) => {
    return User.find({ referredBy: referrerId }).populate('enrolledCourses', 'name');
};

export const updateNewClickRate = async (code) => User.findOneAndUpdate({referralCode: code}, { $inc: { clickRate: 1 } }, { new: true });
