import jwt from 'jsonwebtoken';
import { findUserByReferralCode, updateReferral, updateNewClickRate, findUserById } from '../repositories/userRepository.js';
import { logReferral } from '../repositories/referralRepository.js';

export const handleReferralLink = async (req, res) => {
    try {
        const { referralCode } = req.params;
        const referrer = await findUserByReferralCode(referralCode);

        if (!referrer) {
            return res.status(404).json({ message: "Invalid referral link" });
        }

        const referralToken = jwt.sign({ referrerId: referrer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token: referralToken });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateReferralUser = async (req, res) => {
    try {
        const { referralCode } = req.body;
        const userId = req.user; 

        const newReferrer = await findUserByReferralCode(referralCode);
        if (!newReferrer) {
            return res.status(404).json({ message: "Invalid referral code" });
        }

        const user = await findUserById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.referralCode === referralCode) {
            return res.status(400).json({ message: "You cannot refer yourself" });
        }

        await updateReferral(userId, newReferrer._id);
        await logReferral(newReferrer._id, { referredUser: user._id, referredUserEmail: user.email, referredUserName: user.name})

        res.json({ message: "Referral updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const incrementClickRate = async (req, res) => {
    try {
        const { referralCode } = req.body;
     
        const newReferrer = await findUserByReferralCode(referralCode);
        if(!newReferrer) {
            return res.status(404).json({ message: "Invalid referral code" });
        }

        await updateNewClickRate(newReferrer.referralCode);
        res.json({ message: "Click rate updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

