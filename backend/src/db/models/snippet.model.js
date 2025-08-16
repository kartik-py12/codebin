import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User" //make sure it match the model name given to user schema (moongose application layer is case sensitive)
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        default:"plaintext"
    },
    expiresAt:{
        type:Date,
    },
    shortId:{
        type:String,
        unique:true,
        required:true
    }

},{timestamps:true});

snippetSchema.index({expiresAt:1},{expireAfterSeconds:0});
//create a index at expiresAt sort it in ascending order(1)/descending order(-1) passing an option expireAfterSeconds:0 this option can only be passed to fields with type date 

const snippetModel = mongoose.model("snippet",snippetSchema);

export default snippetModel;