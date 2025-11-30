import CodeEditor from '../components/CodeEditor'
import { Copy, PlusCircle, Share2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Snippets } from '../data/hardcodedSnippet';
import useSnippetStore from '../store/useSnippetStore';
import { useEffect, useState } from 'react';

const ViewSnippet = () => {
    const {id}=useParams();
    const shortId = id;
    const {viewSnippet,snippet,isFetchingSnippet} = useSnippetStore();
    const copyCode = () => {
        navigator.clipboard.writeText(snippet.code)
        .then(()=>{
                toast.success("Copied!");
        }).catch((err)=>{
            toast.error("Failed to copy")
            console.log(`Failed to copy ${err}`);
        })
    }
    const copyUrl = () => {
        navigator.clipboard.writeText(`https://thecodebin.vercel.app/view/${shortId}`)
        .then(()=>{
                toast.success("Copied!");
        }).catch((err)=>{
            toast.error("Failed to copy")
            console.log(`Failed to copy ${err}`);
        })
    }


    useEffect(()=>{
      viewSnippet(shortId);
    },[shortId,viewSnippet])

      if(isFetchingSnippet){
    return(
      <div className="bg-black h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-y-5">
          <span className="text-pink-500 loading loading-infinity text-7xl w-12 "></span>
          <p className='text-sm text-purple-600'>  Loading your snippet, please wait a few seconds...</p>
        </div>
      </div>
    )
  }

    const postDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(snippet.createdAt));

    const expiryDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(snippet.expiresAt));




    return (
      <div className='text-white m-6 mb-0 overflow-hidden '>
        <div className="bg-[#1F1F1F] flex flex-col p-5 text-gray-600 font-semibold rounded-2xl  gap-y-6">
          <div className="flex flex-col md:flex-row gap-y-5 md:justify-between md:items-center">
            <div className="ml-1 text-white flex flex-col gap-y-2">
                <h1 className='lg:text-4xl md:text-3xl text-2xl font-medium'>{snippet.title}</h1>
                <p className='text-gray-500 capitalize'><span className='text-gray-400 font-bold'>Language:</span> {snippet.language} | <span className='text-gray-400 font-bold'>Posted: </span>{postDate}</p>
            </div>

              {/* submit and cancel */}
            <div className="flex flex-col gap-y-5 gap-x-3 justify-end md:justify-center  text-sm sm:flex-row  ">
              <button className='flex items-center justify-center gap-x-2 pl-4 pr-4 p-2 text-pink-500 border border-pink-500 rounded cursor-pointer' onClick={copyCode}><Copy size={18}/> Copy Code</button>
              <button className='items-center hidden md:flex justify-center gap-x-2 pl-4 pr-4 p-2 text-pink-500 border border-pink-500 rounded cursor-pointer' onClick={copyUrl}><Share2 size={18}/>Share</button>
            </div>
          </div>
            
            {/* Code Snippet */}
                <CodeEditor Language={snippet.language} code={snippet.content} viewOnly={true} customHeight="350px"/>
            
            <div className="bg-gray-700 h-[0.5px] w-full"></div>
            <div className="flex flex-col gap-y-3 md:flex-row justify-between items-center">
              <p>This snippet is public and viewable with the link</p>
              <p>Expire on: <span className='text-white/80'>{snippet.expiresAt ?expiryDate : "Never"}</span></p>
            </div>
            </div>
        </div>
  )
}

export default ViewSnippet