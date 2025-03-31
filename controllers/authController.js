import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const referralToken = req.headers['x-referral-token'] || null;
        const result = await registerUser({ name, email, password, phone, referralToken });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const referralToken = req.headers['x-referral-token'] || null;
        const result = await loginUser({ email, password, referralToken });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

