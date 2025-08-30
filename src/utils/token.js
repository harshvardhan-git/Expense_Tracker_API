import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET || JWT_SECRET;

export const generateAccessToken = (user) => {
  return jwt.sign({ user }, secret, {
    expiresIn: '7w',
  });
};

export const verifyAccessToken = (token) => jwt.verify(token, secret);



