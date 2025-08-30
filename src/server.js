import express from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import { AuthenticateToken } from './middlewares/auth.js';

import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    keyGenerator: ipKeyGenerator, // Use helper for IPv6 compatibility
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

app.use("/api/v1/user",  AuthenticateToken ,userRoutes);
app.use("/api/v1/tasks", AuthenticateToken, taskRoutes);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

const PORT = process.env.PORT || 4000;
// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Expense Tracker API is running on http://localhost:${port}`);
});

export default app;

