import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import connectDB from "./db/connection.js";
import authRoute from "./routes/auth.routes.js";
import snippetRoute from "./routes/snippet.routes.js";
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173",

    ],
    credentials:true
}))

// connecting .env with server (files not in same folder)
const __filename=fileURLToPath(import.meta.url); //in module.js __filename is not globally available same for __dirname these are the new methods 
const __dirname=path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});

app.use('/api/auth',authRoute);
app.use('/api/snippet',snippetRoute);


app.listen(3000,()=>{
    connectDB();
    console.log(`listning on port 3000`);
})