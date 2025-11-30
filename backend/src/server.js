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

// connecting .env with server (files not in same folder)
const __filename=fileURLToPath(import.meta.url); //in module.js __filename is not globally available same for __dirname these are the new methods 
const __dirname=path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});

app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? process.env.FRONTEND_URL || true 
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials:true
}))


app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth',authRoute);
app.use('/api/snippet',snippetRoute);

// Serve static files from frontend build in production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));

    // Handle client-side routing - serve index.html for all non-API routes
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    connectDB();
    console.log(`listning on port ${PORT}`);
})