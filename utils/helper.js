import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export const generateReferralCode = async() => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';

    const generateCode = () => {
        const parts = [];
        for (let i = 0; i < 3; i++) {
            let part = '';
            for (let j = 0; j < 3; j++) {
                const randomIndex = crypto.randomInt(0, letters.length);
                part += letters[randomIndex];
            }
            parts.push(part);
        }
        return parts.join('-');
    };

    let referralCode;
    let exists = true;

    while (exists) {
        referralCode = generateCode();
        exists = await User.exists({ referralCode });
    }

    return referralCode;
};

export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const generateReferralToken = (referrerId) => {
    return jwt.sign({ referrerId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};