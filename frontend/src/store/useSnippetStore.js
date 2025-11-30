import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useSnippetStore = create((set, get) => ({
    Allsnippets: [],
    snippet: null,
    // FIXED: Start with empty array, remove hardcoded test ID
    createdSnippetsShortId: [], 
    isFetchingSnippet: true,
    shortId: null,
    isLoadingSnippets: false, // FIXED: Typo corrected

    viewSnippet: async (id) => {
        set({ isFetchingSnippet: true }); // Ensure loading starts
        try {
            const res = await axiosInstance.get(`/snippet/${id}`);
            set({ snippet: res.data.snippet });
        } catch (error) {
            // FIXED: Optional chaining for safety
            toast.error(error.response?.data?.message || "Error fetching snippet");
        } finally {
            set({ isFetchingSnippet: false });
        }
    },

    createSnippet: async (snippetData) => {
        const { createdSnippetsShortId } = get();
        
        // LOGIC NOTE: This works for the current session, but resets on refresh.
        // Consider using Zustand 'persist' middleware if you want this to survive reloads.
        const existingSnippet = createdSnippetsShortId.includes(snippetData.shortId);

        try {
            if (existingSnippet) {
                // UPDATE
                const res = await axiosInstance.put(`/snippet/${snippetData.shortId}`, snippetData);
                toast.success(res.data.message);
                set({ snippet: res.data.snippet });
            } else {
                // CREATE
                const res = await axiosInstance.post(`/snippet/create/${snippetData.shortId}`, snippetData);
                toast.success(res.data.message);
                
                // FIXED: Use functional update to ensure you have the latest state
                set((state) => ({
                    createdSnippetsShortId: [...state.createdSnippetsShortId, snippetData.shortId],
                    snippet: res.data.snippet,
                    // Optional: Add to Allsnippets immediately so the list updates without refetching
                    Allsnippets: [...state.Allsnippets, res.data.snippet] 
                }));
            }
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                errors.forEach((err) => toast.error(err.message));
            } else {
                toast.error(error.response?.data?.message || "Failed to create snippet");
            }
            console.error(error);
        }
    },

    getAllSnippets: async () => {
        set({ isLoadingSnippets: true });
        try {
            const res = await axiosInstance.get("/snippet/all");
            console.log(res);
            if(res.data.snippets.length!==0){
                set({ Allsnippets: res.data.snippets });
            }else{
                set({ Allsnippets: [] });
            }
        } catch (error) {
            toast.error("Error in fetchingfff snippets");
            console.error(error);
        } finally {
            set({ isLoadingSnippets: false });
        }
    },

    deleteSnippet: async (snippetId) => {
        // Optimistic update or wait for server? 
        // Here we wait for server success then update UI.
        try {
            const res = await axiosInstance.delete(`snippet/${snippetId}`);
            toast.success(res.data.message);

            // CRITICAL FIX: Update local state to remove the deleted item from UI 

            
                
            set((state) => ({
                
                Allsnippets: state.Allsnippets.filter((s) =>{
                    console.log(s.shortId, snippetId);
                    return s.shortId !== snippetId;

                })
            })); 


                // Note: Change s._id to s.shortId if that's what you use for identification
      

            console.log(get().Allsnippets);

        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error("Failed to delete snippet");
        }
    }
}));

export default useSnippetStore;