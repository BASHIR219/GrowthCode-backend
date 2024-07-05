import express from "express"
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import payment from "./routes/paymentRoute.js"
import {error} from "./middlewares/error.js"
import fileUpload from "express-fileupload";
import cors from 'cors';
// import asyncErrorHandler from "./middlewares/asyncErrorHandler.js";
import cookieParser from "cookie-parser";


process.on("uncaughtException",(err)=>{
    console.log(`Error is ${err}`);
    console.log("Closing server due to uncaught exception");
    process.exit(1);
})

const app=express();

// Configure CORS to allow requests from your front-end origin
const corsOptions = {
    origin: '*',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({useTempFiles:true})); // useTempFiles true is very important or else no tempFilePath in uploaded images in postman, and won't be uploaded to cloudinary


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment)

app.get('/',(req,res)=>{
    res.send("Hello world|Bashir this side");
})

app.use(error);


export default app;