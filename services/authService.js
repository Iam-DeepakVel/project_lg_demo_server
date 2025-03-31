import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helper.js";
import {
  createUser,
  findUserByEmail,
  incrementReferralCount,
  findUserById,
  updateReferral,
} from "../repositories/userRepository.js";
import { generateReferralCode } from "../utils/helper.js";
import { logReferral } from "../repositories/referralRepository.js"; // New function to track referrals
import jwt from "jsonwebtoken";

export const registerUser = async ({
  name,
  email,
  password,
  phone,
  referralToken,
}) => {
   const existingUser = await findUserByEmail(email);
   if(existingUser) {
    throw new Error("User already exists");
   }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newReferralCode = await generateReferralCode();

  let referredBy = null;

  if (referralToken) {
    try {
      const decoded = jwt.verify(referralToken, process.env.JWT_SECRET);
      referredBy = decoded.referrerId;
    } catch (err) {
      console.error("Invalid referral token:", err);
    }
  }

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    referralCode: newReferralCode,
    referredBy,
    phone,
  });

  if (referredBy) {
    await incrementReferralCount(referredBy);
    await logReferral(referredBy, { referredUser: user._id, referredUserEmail: user.email, referredUserName: user.name});
  }

  const userWithoutSensitive = await findUserById(user._id);
  return { user: userWithoutSensitive, token: generateToken(user._id) };
};

export const loginUser = async ({ email, password, referralToken }) => {
  const user = await findUserByEmail(email);
  console.log(user);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) throw new Error("Invalid credentials");

  if (referralToken) {
    try {
      const decoded = await jwt.verify(referralToken, process.env.JWT_SECRET);
      const referrerId = decoded.referrerId;

      console.log(user._id.toString(), referrerId.toString());

      if (user._id.toString() !== referrerId.toString()) {
        console.log("here");
        if (referrerId) {
          console.log("here2");
          await updateReferral(user._id, referrerId);
          if (!user.referredBy) {
            console.log("here3");
            await incrementReferralCount(referrerId);
          }
          await logReferral(referrerId, { referredUser: user._id, referredUserEmail: email, referredUserName: user.name}); 
        }
      }
    } catch (err) {
      console.error("Invalid referral token:", err);
    }
  }

  const userWithoutSensitive = await findUserById(user._id);
  console.log(userWithoutSensitive);
  return { user: userWithoutSensitive, token: generateToken(user._id) };
};
