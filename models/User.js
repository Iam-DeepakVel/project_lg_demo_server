import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String },
    referralCode: { type: String, unique: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    referralCount: { type: Number, default: 0 },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of course IDs,
    clickRate: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
