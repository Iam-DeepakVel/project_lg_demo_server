import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who referred
    referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who was referred
    referredUserEmail: { type: String, required: true }, // Store email to avoid losing history
    referredUserName: { type: String, required: true }, // Store name to avoid losing history
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Courses enrolled by referred user
}, { timestamps: true });

const Referral = mongoose.model('Referral', ReferralSchema);
export default Referral;
