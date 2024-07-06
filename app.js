import express from "express";
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";
import { error } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configure CORS to allow requests from your front-end origin
const corsOptions = {
    origin: 'https://growthcodehub.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Logging middleware for debugging
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

process.on("uncaughtException", (err) => {
    console.log(`Error is ${err}`);
    console.log("Closing server due to uncaught exception");
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

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(error);

export default app;
