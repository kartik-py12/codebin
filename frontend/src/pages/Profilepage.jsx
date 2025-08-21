import React, { useEffect } from 'react'
import { Camera, Eye,Pencil, Plus, Trash2 } from 'lucide-react';
import { Snippets } from '../data/hardcodedSnippet';
import { useAuthStore } from '../store/useAuthStore';
import useSnippetStore from '../store/useSnippetStore';
import { Link } from 'react-router-dom';


const Profilepage = () => {
    const {authUser} = useAuthStore();
    const {Allsnippets,getAllSnippets,isLodingSnippets,deleteSnippet} = useSnippetStore();

    useEffect(()=>{
        getAllSnippets();
    },[])

    if(isLodingSnippets){
        return (
        <div className="bg-black h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-y-5">
              <span className="text-pink-500 loading loading-infinity text-7xl w-12 "></span>
              <p className='text-sm text-purple-600'>  Loading your snippet, please wait a few seconds...</p>
            </div>
      </div>
        )
    }

    const date = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(authUser.createdAt));

    const convertDate = (oldDate) =>{
        const snippetCreationdate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(oldDate));
        return snippetCreationdate;
    }
// → "20 Aug 2025"

    console.log(Allsnippets);

  return (
    <div className='text-white flex flex-col mt-10 lg:flex-row gap-y-10  justify-between  lg:gap-x-10 ml-5 mr-5 '>
        <div className="flex flex-col gap-y-2 bg-gray-900 p-5 lg:pl-20 lg:pr-20 items-center h-fit rounded-2xl ">
            <div className="relative size-20 bg-gray-500 rounded-full">
                {/* <LucideUserCircle2 className='size-20 '/> */}
                <img src="zoro.png" alt="" className='object-cover size-20 rounded-full' />
                <Camera className='absolute -bottom-0 -right-0 text-gray-400 cursor-pointer hover:text-gray-500'/>
            </div>
            <p className='text-3xl'>{authUser.username}</p>
            <p className='text-lg text-gray-600 font-medium'>{authUser.email}</p>
            <p className='text-gray-700 text-sm font-medium'>{`Joined on: ${date}`}</p>
            <button className='mt-1 pl-2 pr-2 p-1 text-pink-600 border cursor-pointer hover:font-semibold transition duration-500 border-gray-600 rounded-2xl'>Edit Profile</button>
        </div>

        <div className="flex flex-col flex-1 gap-y-2 p-5 lg:pl-20 lg:pr-20 rounded-2xl bg-gray-900 justify-center">
            <div className="flex justify-between  items-center">
                <p>My Snippets</p>
                <Link to={"/create"}>
                <button className='bg-pink-600 text-sm font-medium pl-2 pr-2 p-1 rounded-2xl flex items-center'><Plus className='size-4'/> New Snippet</button>
                </Link>
            </div>
            
            <div className="overflow-y-auto max-h-120">
                {Allsnippets.map((snippet)=>(
                    <div className="flex items-center justify-between pl-4 pr-4 p-1 border border-gray-600 rounded-xl mt-4  ">
                        <div className="">
                            <p className='text-lg font-medium'>{snippet.title}</p>
                            <p className='text-gray-500'>{snippet.language} | {convertDate(snippet.createdAt)}</p>
                        </div>
                        <div className="flex gap-x-2 items-center size-16 lg:size-24 ">
                            <Link to={`/view/${snippet.shortId}`}>
                                <Eye className='size-5 lg:size-8'/>
                            </Link>
                            
                            <Pencil/>

                            <Trash2 className='text-red-600' onClick={() => deleteSnippet(snippet.shortId)}/>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    </div>

    
  )
}

export default Profilepage