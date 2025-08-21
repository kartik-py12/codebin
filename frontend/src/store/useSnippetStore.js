import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { AlwaysStencilFunc } from "three";
import { AwardIcon } from "lucide-react";

const useSnippetStore = create((set,get)=>({
    Allsnippets:[],
    snippet:null,
    createdSnippetsShortId:["hfi2nHHZ"],
    isFetchingSnippet:true,
    shortId:null,
    isLodingSnippets:false,
    viewSnippet: async (id) => {
        try {
            const res = await axiosInstance.get(`/snippet/${id}`);
            set({snippet:res.data.snippet});
            set({isFetchingSnippet:false});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isFetchingSnippet:false});
            
        }
    },

    createSnippet: async (snippetData) =>{
        const {createdSnippetsShortId} = get();
        const existingSnippet = createdSnippetsShortId.includes(snippetData.shortId);
        try {
            if(existingSnippet){
                const res = await axiosInstance.put(`/snippet/${snippetData.shortId}`,snippetData);
                toast.success(res.data.message);
                set({snippet:res.data.snippet});
            }else{
                const res = await axiosInstance.post(`/snippet/create/${snippetData.shortId}`,snippetData);
                toast.success(res.data.message);
                createdSnippetsShortId.insert(snippetData.shortId);
                set({snippet:res.data.snippet});
            }
            // set({shortId:res.data.snippet.shortId});

        } catch (error) {
            const errors = error.response.data.errors;
            if(errors){
                errors.forEach((error)=>{
                    toast.error(error.message);
                })
            }else{
                toast.error("Failed to create snippet");    
            }
            console.error(error.response.data.message);
        }
    },

    getAllSnippets: async () => {
        set({isLodingSnippets:true})
        try {
            const res = await axiosInstance.get("/snippet/all");
            set({Allsnippets:res.data.snippets});
        } catch (error) {
            toast.error("Error in fetching user details");
            console.error(error.response.data.message);
        }finally{
            set({isLodingSnippets:false})
        }
    },
    deleteSnippet: async (snippetId) => {
        try {
            const res = await axiosInstance.delete(`snippet/${snippetId}`);
            toast.success(res.data.message);
        } catch (error) {
            console.error(error.response.data.message);
            toast.error("Failed to delete snippet");
            
        }
    }
}))

export default useSnippetStore;