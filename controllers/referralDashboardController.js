import { getReferralDashboardStats } from '../services/referralDashboardService.js';

export const getReferralDashboard = async (req, res) => {
    try {
        const referrerId = req.user; // Extract user ID from auth middleware
        const data = await getReferralDashboardStats(referrerId);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
