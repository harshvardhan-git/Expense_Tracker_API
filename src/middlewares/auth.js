import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

//const JWT_SECRET = process.env.JWT_SECRET; // Replace with your own secret key

const secret = process.env.JWT_SECRET || JWT_SECRET;

export const AuthenticateToken = (req, res, next) => {
    //const token  = req.headers['x-jwt-token'];
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log(token)
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user; // Save user info in request
        next(); // Proceed to the next middleware or route handler
    });
};