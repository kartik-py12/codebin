import jwt from "jsonwebtoken";

const generateToken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
    console.log(token);

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        secure:process.env.NODE_ENV!="development",
        httpOnly:true,
        sameSite:"none"
    })
}

export default generateToken;