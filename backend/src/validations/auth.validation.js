import * as z from "zod"

const usernameSchema= z.string()
    .min(3,{error:"Username must be at least 3 characters"})
    .max(64,{error:"Username must be less then 64 characters"})
    .trim()

const passwordSchema = z.string()
    .min(6,{error:"Password must be at least 6 characters"})
    .max(64,{error:"Password must be less then 64 characters"})
    .regex(/[A-Z]/,{error:"Password must contain at least 1 Uppercase character"})
    .regex(/[0-9]/,{error:"Password must contain at least 1 number"})
    .regex(/[^A-Za-z0-9]/,{error:"Password must contain at least 1 special character"})

const emailSchema = z.email({error:"Invalid email address"})


export const signupSchema = z.object({
    username:usernameSchema,
    password:passwordSchema,    
    email:emailSchema
})

export const signinSchema = z.object({
    username:usernameSchema,
    password:passwordSchema
})

