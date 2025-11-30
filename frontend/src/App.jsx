import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'
import Profilepage from './pages/Profilepage'
import {Toaster} from "react-hot-toast";
import { useAuthStore } from './store/useAuthStore';
import CreateSnippetPage from './pages/CreateSnippetPage'
import ViewSnippet from './pages/ViewSnippet'
import NotFoundPage from './pages/NotFoundPage'

const  App = () => {
  const {checkAuth,authUser,isCheckingAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return(
      <div className="bg-black h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-y-5">
          <span className="text-pink-500 loading loading-infinity text-7xl w-12 "></span>
          <p className='text-sm text-purple-600'>  Server is waking up, please wait a few seconds...</p>
        </div>
      </div>
    )
  }

  return (
  // <div data-theme="dark">
  <BrowserRouter>

  <div className='bg-black w-full min-h-screen font-sans'>
      {/* <div className=" inset-0 min-h-screen  bg-gradient-to-r from-pink-500/20 via-pink-500/10 to-transparent "></div> */}

      <Navbar />
      <Routes>
        <Route path='/login' element={authUser ?<Profilepage/>:<Loginpage/>}/>
        <Route path='/signup' element={authUser ?<Profilepage/>:<Signuppage/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/create' element={authUser ? <CreateSnippetPage/> : <Loginpage/>}/>
        <Route path='/create/:id' element={authUser ? <CreateSnippetPage/> : <Loginpage/>}/>
        <Route path='/view/:id' element={<ViewSnippet/>}/>
        <Route path='/profile' element={authUser ?<Profilepage/>:<Loginpage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>


      </Routes>
      <Toaster/>
    </div>
    

  </BrowserRouter>
  )
}

export default  App