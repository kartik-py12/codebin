import snippetModel from "../db/models/snippet.model.js";

import {nanoid} from "nanoid"
const expiryOptions = new Map([
    ["10m",10*60*1000],
    ["30m",30*60*1000],
    ["1h",60*60*1000],
    ["1d",24*60*60*1000],
    ["1w",24*7*60*60*1000],
])

export const create = async (req,res) => {
    try {
        const {title,content,language,expiryTime} = req.validated;
        console.log(req.userData);
        const userId = req.userData._id;
        let expiresAt=null;

        if(expiryOptions.has(expiryTime)){
            const durationInMs=expiryOptions.get(expiryTime);
            expiresAt = new Date(Date.now()+durationInMs);
        }

        const shortId = nanoid(8);

        const snippet = await snippetModel.create({
            title,
            content,
            language,
            expiresAt,
            user:userId,
            shortId
        })
        
        return res.status(201).json({
            success:true,
            message:"Snippet created succeffuly",
            snippet
        })

    } catch (error) {
        console.log(`Error in snippet create controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const viewAll = async (req,res) => {
    try {
        const userId = req.userData._id;
        const snippets = await snippetModel.find({user:userId});
        if(snippets.length===0){
            return res.status(200).json({
                success:true,
                message:"No snippets found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Snippets fetched successfully",
            snippets:snippets
        })
    } catch (error) {
        console.error(`Error in snipper viewAll controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const view = async (req,res) => {
    try {
        const shortId=req.params.shortId;
        if(!shortId){
            return res.status(400).json({
                success:false,
                message:"snipped id is required"
            })
        }
        console.log(shortId);
        const snippet = await snippetModel.findOne({shortId:shortId});
        if(!snippet){
            return res.status(404).json({
                success:false,
                message:"No snippet found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Snippet fetched succefully",
            snippet
        })

    } catch (error) {
        console.error(`Error in view snippet controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const updateSnippet = async (req,res) => {   
    try { 
        const shortId = req.params.shortId;
        const allowedFields=["title","content","expiryTime","language"]
        const userId = req.userData._id;
        console.log(userId);
        
        let updates = {};
        
        for (const key of Object.keys(req.validated)){
            if(allowedFields.includes(key)){
                if(key=="expiryTime"){
                    const timeInMs = expiryOptions.get(req.validated[key]);
                    updates["expiresAt"]= new Date(Date.now()+timeInMs);
                }else{
                    updates[key]=req.validated[key];
                }
            }
        }
        
        if(Object.keys(updates).length===0){
            return res.status(400).json({
                success:false,
                message:"No valid fields to update"
            })
        }
        
        const updatedSnippet = await snippetModel.findOneAndUpdate(
            {shortId:shortId,user:userId},
            {$set:updates},
            {new:true,runValidators:true}
            // runValidators: true in Mongoose tells it: “When you update a document, still apply the schema’s validation rules.”
        )
        
        if(!updatedSnippet){
            return res.status(400).json({
                success:false,
                message:"Snippet not found or you don't have permission to edit it"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"snipped updated successfully",
            snippet:updatedSnippet
        })
    }   
    catch (error) {
        console.error(`Error in updateSnippet controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
    
}


export const deleteSnippet = async (req,res) => {
    try {
        const shortId = req.params.shortId;
        const userId = req.userData._id;

        const result = await snippetModel.deleteOne({shortId,user:userId});
        //deleteOne() returns an object like:
        // { acknowledged: true, deletedCount: 1 }

        if(result.deletedCount===0){
            return res.status(404).json({
                success:false,
                message:"Snippet not found or not authorized to delete"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Snippet deleted succeffully"
        })

    } catch (error) {
        console.error(`Error in deleteSnippet controller ${error.message}`);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}