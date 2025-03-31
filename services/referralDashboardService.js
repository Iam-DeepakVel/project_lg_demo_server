import User from '../models/User.js';
import Referral from '../models/Referral.js';

export const getReferralDashboardStats = async (referrerId) => {
    // 1️⃣ Get total number of users EVER referred (from Referral model)
    const allReferrals = await Referral.find({ referrer: referrerId }).select('referredUserEmail referredUserName createdAt');

    // 2️⃣ Get total courses enrolled by the logged-in user
    const loggedInUser = await User.findById(referrerId).populate('enrolledCourses', 'name');
    const totalEnrolledCourses = loggedInUser.enrolledCourses.length;

    const clickRate = await User.findById(referrerId).select('clickRate');

    // 3️⃣ Get historical referral enrollments
    const referralEnrollments = await Referral.find({ referrer: referrerId }).populate('enrolledCourses', 'name');  

    // Formatting referral enrollments
    const referredUserCourses = referralEnrollments.map(entry => ({
        email: entry.referredUserEmail,
        enrolledCourses: entry.enrolledCourses.map(course => course.name),
    }));

    return {
        totalReferredUsers: allReferrals.length,
        totalEnrolledCourses,
        referredUsersList: allReferrals,
        referredUserCourses,
        clickRate
    };
};
