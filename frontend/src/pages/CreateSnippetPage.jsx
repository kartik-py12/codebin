import React, { useEffect, useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import { Copy, PlusCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams,useNavigate } from 'react-router-dom';
import useSnippetStore from '../store/useSnippetStore';
import {nanoid} from "nanoid";

//TODO: need to create a edit snippet page

const CreateSnippetPage = () => {
    const [code,setCode] = useState("");
    const [title,setTitle] = useState("");
    const [language,setLanguage] = useState("plaintext");
    const [expiry,setExpiry] = useState("never");
    const [shortId, setShortId] = useState(null);
    
    const navigate = useNavigate();
    
    const {id}=useParams();
    
    const {createSnippet,snippet} = useSnippetStore();
    
    useEffect(()=>{
        if(!id){
            const newId=nanoid(8);
            setShortId(newId);
            navigate(`/create/${newId}`, { replace: true });
        }else{
            setShortId(id);
        }
    },[])
    

    // const [visibility,setVisibility] = useState(false);

    const copyUrl = () => {
        navigator.clipboard.writeText(`http://localhost:5173/view/${shortId}`)
        .then(()=>{
                toast.success("Copied!");
        }).catch((err)=>{
            toast.error("Failed to copy")
            console.log(`Failed to copy ${err}`);
        })

    }

    const create = async () => {
        const snippet ={
            title,
            content:code,
            language,
            expiryTime:expiry,
            shortId,
        }

        createSnippet(snippet);
        
    }


    

  return (
    <div className='text-white m-6 mb-0 overflow-hidden min-h-screen '>
        <div className="mb-7 ml-1">
            <h1 className='lg:text-4xl md:text-3xl text-2xl font-medium'>Create New Snippet</h1>
        </div>

        <div className="bg-[#1F1F1F] flex flex-col p-5 text-gray-600 font-semibold rounded-2xl  gap-y-6">
            {/* Snippet title */}

            <div className="flex flex-col gap-y-2  ">
                <p className='pl-1'>Snippet Title</p>
                {console.log(snippet)}
                <input type="text" placeholder={snippet?.title ? snippet.title : 'e.g. My Awesome React Component'} className='w-full bg-[#282c34] pl-4 outline-none border border-gray-600 text-gray-500    p-2 rounded-md' 
                    onChange={(e)=>(setTitle(e.target.value))}
                />
            </div>

            {/* Code Snippet */}
            <div className="flex flex-col gap-y-5">
                <div className="flex justify-between items-center">
                    <p className='pl-1'>Code</p>
                    <select className='bg-[#1f1f1f] hover:text-white transition duration-500 outline-none border rounded-2xl p-1  border-gray-600' onChange={(e) => setLanguage(e.target.value)} value={language}>
                        <option value="plaintext">Plain Text</option>
                        <option value="javascript">Javascript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                    </select>
                </div>
                <CodeEditor Language={language} code={code} setCode={setCode}/>
            </div>

            {/* meta details */}

            <div className="flex flex-col justify-between md:flex-row gap-y-3 gap-x-6  lg:pl-20 lg:pr-20 text-sm md:items-center w-full ">
                <div className="flex flex-col gap-y-2 flex-1 ">
                    <p className='text-lg'>Snippet Expiration</p>
                    <select value={expiry} className='bg-[#1f1f1f] hover:text-white transition duration-500 outline-none border rounded-lg border-gray-600 p-2 ' onChange={(e) => setExpiry(e.target.value)}>
                        <option value="never">Never</option>
                        <option value="10m">10 min</option>
                        <option value="30m">30 min</option>
                        <option value="1h">1 hr</option>
                        <option value="1d">1 day</option>
                        <option value="1w">1 week</option>
                    </select>
                </div>
                
                {/* All url's are public currently  */}

                {/* <div className="flex flex-col gap-y-2 items-center ">
                    <p>Visibility</p>
                    <div className="flex items-center gap-x-3">
                        <p className={!visibility ? "text-gray-400":""}>Private</p>
                        <input
                            type="checkbox"
                            checked={visibility}
                            onChange={()=>setVisibility((prev) => !prev)}
                            className="toggle rounded-full text-black  border-black bg-pink-600 border checked:border-pink-600 checked:bg-black checked:text-pink-600 w-10"
                            />
                        <p className={visibility ? "text-gray-400" : ""}>Public</p>
                        </div>
                </div> */}
                    {/* URL  */}

                <div className="flex flex-col items-center text-lg gap-y-2 flex-1">
                    <p className='text-xl'>Shareable Url</p>
                    
                    {!shortId ?
                      <div className="text-pink-800 text-sm ">* Create snippet to Generate your url </div>  
                    :
                        <div className="border border-gray-600 group  rounded-lg w-full p-2  flex justify-between items-center">
                            <p className='text-sm group-hover:text-white transition overflow-hidden duration-700'>https://thecodebin.vercel.app/view/{shortId}</p>
                            <button className='cursor-pointer bg-black' onClick={copyUrl}>
                                <Copy size={18}/>
                            </button>
                        </div>
                    }
                </div>

            </div>
                {/* submit and cancel */}

                <div className="flex flex-col gap-y-5 gap-x-3 justify-center  text-sm sm:flex-row  ">
                    <button className='flex items-center justify-center gap-x-2 pl-4 pr-4 p-2 text-pink-500 border border-pink-500 rounded-3xl cursor-pointer'><X/>Cancel</button>
                    <button className='flex items-center justify-center gap-x-2  pl-4 pr-4 p-2 bg-pink-500 text-white rounded-3xl cursor-pointer' onClick={create}><PlusCircle/> Create Snippet</button>
                </div>

        </div>
    </div>
  )
}

export default CreateSnippetPage