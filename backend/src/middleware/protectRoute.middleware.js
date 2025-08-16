import userModel from "../db/models/user.model.js"
import jwt from "jsonwebtoken";

const protectRoute = async (req,res,next) => {
    try {
        const jwtToken = req.cookies.jwt;   
        if(!jwtToken){
            return res.status(401).json({
                success:false,
                message:"Not authorized"
            })
        }
        
        const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET);
        const user = await userModel.findOne({_id:decoded.userId}).select("-password");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Not authorized"
            })
        }    
        req.userData=user; 
        next();
        
    } catch (error) {
        console.error(`Error in protectRoute middleware ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
    
}

export default protectRoute;    