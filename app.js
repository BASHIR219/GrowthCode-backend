import express from "express";
import dotenv from "dotenv";
import path from "path";
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";
import { error } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables from config.env
dotenv.config({ path: path.resolve('config', 'config.env') });

const app = express();

// Configure CORS to allow requests from your front-end origin
const corsOptions = {
    origin: 'https://growthcodehub.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
};

app.use(cors(corsOptions));

// Logging middleware for debugging
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
});

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

// Define routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.get('/', (req, res) => {
    res.send("Hello world|Bashir this side");
});

// Enhanced Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error handler:', err);
    res.status(500).json({
        message: 'Something broke!',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {} // Include stack trace in development mode
    });
});

app.use(error);

export default app;
