import userModel from "../db/models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../lib/utils/generateToken.js";




export const signup = async (req,res) => {
    try {
        const {username,password,email} = req.validated;

        const existingUser=await userModel.findOne({
            $or:[{username},{email}]
        })

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:(existingUser.username===username) ? "Username already taken" : "Email already taken"
            })
        }

        const saltRounds=10
        const salt=await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = await userModel.create({
            username:username,
            password:hashedPassword,
            email:email
        });

        generateToken(newUser._id,res);
        return res.status(200).json({
            success:true,
            user:{
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                createdAt:newUser.createdAt,
                updatedAt:newUser.updatedAt
            },
            message:"Account created Successfully"
        })
    } catch (error) {
        console.error(`Error in signup controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const signin = async (req,res) => {
    try {
        const {username,password} = req.validated;
        const user = await userModel.findOne({username});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        generateToken(user._id,res);


        
        return res.status(200).json({
            success:true,
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt
            },  
            message:"Signed in successfully "
        })
        
    } catch (error) {
        console.error(`Error in auth signin controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const logout = async (req,res) => {
    try {
        res.clearCookie("jwt",{
            secure:true,
            httpOnly:true,
            sameSite:"none"
        })
        
        res.status(200).json({
            success:true,
            message:"Logged out succefully"
        })
        
    } catch (error) {
        console.error(`Error in logout controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
}

export const me = async (req,res) => {
    try {
        const user = req.userData;
        console.log(user);
        return res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        console.error(`Error in me controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}