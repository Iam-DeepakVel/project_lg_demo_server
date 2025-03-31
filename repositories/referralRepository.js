import Referral from '../models/Referral.js';

export const addReferralEnrollment = async (referrerId, referredUserId, email, name, courseId) => {
    const existingReferral = await Referral.findOne({ referrer: referrerId, referredUser: referredUserId });

    if (existingReferral) {
        // Push the new course ID if not already present
        await Referral.findByIdAndUpdate(existingReferral._id, { $addToSet: { enrolledCourses: courseId } });
    } else {
        // Create a new referral entry
        await Referral.create({
            referrer: referrerId,
            referredUser: referredUserId,
            referredUserEmail: email,
            referredUserName: name,
            enrolledCourses: [courseId]
        });
    }
};

export const getReferralEnrollments = async (referrerId) => {
    return Referral.find({ referrer: referrerId }).populate('enrolledCourses', 'name');
};

export const logReferral = async (referrerId, referredUser) => {
    console.log(referrerId, referredUser);
    try {
      await Referral.create({ referrer: referrerId, ...referredUser });
    } catch (err) {
      console.error("Error logging referral:", err);
    }
  };