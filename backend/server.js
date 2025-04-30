import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();

console.log(process.env.MONGO_URI)
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
    connectMongoDB();
    
})