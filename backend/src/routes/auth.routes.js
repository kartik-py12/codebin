import express from "express";
import { signup,signin,me, logout } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { signupSchema,signinSchema} from "../validations/auth.validation.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const authRoute=express.Router();

authRoute.post('/signup',validate(signupSchema),signup);
authRoute.post('/signin',validate(signinSchema),signin);
authRoute.post('/logout',protectRoute,logout);
authRoute.get('/me',protectRoute,me);

export default authRoute;

