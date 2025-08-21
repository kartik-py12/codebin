import { User,Mail,Lock,Eye,EyeClosed } from "lucide-react"
import { useState } from "react"
import { GlobeDemo } from "../components/Global";
import { useAuthStore } from "../store/useAuthStore";

const Signuppage = () => {
    const [show, setShow] = useState();
    const {signup,isSigningUp} = useAuthStore();
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:"",
    });

    const handleSubmit = ()=>{
        console.log(formData);
        signup(formData);
    }


  return (
    <div className='flex flex-col h-[80vh] items-center justify-center sm:flex-row sm:justify-between  min-w-screen overflow-hidden gap-0 lg:p-5 '>
        {/* create account */}
        <div className="flex flex-col items-center w-full justify-center text-white gap-y-4 ">

        <div className="">
            <h1 className="relative -top-10 text-3xl font-bold text-transparent bg-clip-text 
               bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 
               animate-pulse">Create Accout</h1>    
        </div>  
 
  
        {/* Username */}

        {/* <form onSubmit={handleSubmit}> */}

        <div className="relative m-2 ">
            <div className="absolute blur bg-gradient-to-r from-pink-600 to-purple-600 inset-0 "></div>
            <label className="relative flex items-center bg-black rounded-md p-2 ">
                <User className="text-white"/>
                <input type="text" placeholder="Username" className="pl-2 pr-8 p-1 outline-none"
                    onChange={(e)=>setFormData({...formData,username:e.target.value})}
                />

            </label>
        </div>

        <div className="relative m-2">
            <div className="absolute blur bg-gradient-to-r from-pink-600 to-purple-600 inset-0 "></div>
            <label className="relative flex items-center bg-black rounded-md p-2 ">
                <Mail className="text-white"/>
                <input type="text" placeholder="Email" className="pl-2 pr-8 p-1 outline-none"
                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                />
            </label>
        </div>

        <div className="relative m-2">
            <div className="absolute blur bg-gradient-to-r from-pink-600 to-purple-600 inset-0 "></div>
            <label className="relative flex items-center bg-black rounded-md p-2 ">
                <Lock className="text-white"/>
                <input type={show ? "text" : "password"}  placeholder="Password" className="pl-2 pr-2 p-1 outline-none"
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                />
                <button onClick={()=>setShow(!show)}>
                    {show ? <EyeClosed/> : <Eye/>}
                    </button>
            </label>
        </div>

        {/* </form> */}
          <div className="relative group ">
                <div className="absolute bg-gradient-to-r from-pink-600 to-purple-700 inset-0 rounded-2xl blur group-hover:animate-pulse transition duration-1000"></div>
                <button type="submit" className="pl-2 pr-2 p-1 rounded-2xl  relative text-lg font-medium bg-black cursor-pointer"
                    onClick={handleSubmit}
                >Submit</button>
            </div>

        </div>

    {/* <div className="w-full h-full hidden lg:block ">
        <div className="relative w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-130 lg:h-130">
            {/* Gradient background 
            {/* <div className="absolute inset-0 animate-pulse blur rounded-full bg-gradient-to-r from-pink-600 to-purple-700"></div> 
        
            <img src="ca.png" alt="" className="relative w-full h-full rounded-full animate- transform delay-700 object-cover" />
        </div>
    </div> */}

    <div className="w-full hidden lg:block">
        <GlobeDemo />
    </div>

</div>





  )
}

export default Signuppage