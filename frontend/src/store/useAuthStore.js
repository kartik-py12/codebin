/* eslint-disable no-unused-vars */
import {create} from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isSigningIn:false,
    isCheckingAuth:true, //because we are calling checkAuth on app mount

    checkAuth: async () =>{
        try {
            const res = await axiosInstance.get('/auth/me');
            set({authUser:res.data.success ? res.data.user : null});
        } catch (error) {
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data) => {
        try {
            set({isSigningUp:true});
            const res = await axiosInstance.post('/auth/signup',data);
            if(res.data.success){
                toast.success(res.data.message);
                set({authUser:res.data.user});
            }
        } catch (error) {
            const errors=error.response?.data?.errors;
            const message=error.response?.data?.message;
            if(Array.isArray(errors)){
                errors.forEach((error)=>(
                    toast.error(error.message)
                ));
            }
            if(message){
                toast.error(message);
            }
        }finally{
            set({isSigningUp:false})
        }
    },

    signin: async(data) => {
        try {
            set({isSigningIn:true});
            const res = await axiosInstance.post('/auth/signin',data);
            if(res.data.success){
                set({authUser:res.data.user});
                toast.success(res.data.message);
            }
            
        } catch (error) {
            const errors = error.response?.data?.errors;
            const message = error.response?.data?.message;

            if(Array.isArray(errors)){
                errors.forEach((error)=>(
                    toast.error(error.message)
                ))
            }
            if(message){
                toast.error(message);
            }
        } finally{
            set({isSigningIn:false});
        }
    },

    signout: async() => {
        try {
            const res = await axiosInstance.post('/auth/logout')
            toast.success(res.data.message);
            set({authUser:null})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    
}))