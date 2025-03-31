import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: Number,
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);
export default Course;
