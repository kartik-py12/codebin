  import { Link,useNavigate } from "react-router-dom";
  import { useAuthStore } from "../store/useAuthStore";

  const Navbar = () => {
    const {authUser,signout} = useAuthStore();
    const navigate = useNavigate();

    const logout = () => {
      console.log("clicked")
      signout();
      navigate("/");
    }
  return (
      <nav className=" flex justify-between items-center px-6 py-4 relative z-10">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold text-pink-400">CodeBin</h1>
        </Link>
        
        {authUser ?
            <div className="hidden md:flex md:gap-x-2 ">
              <Link to="/profile" className="px-4 py-2  bg-pink-600 rounded-lg hover:bg-pink-700 transition">Profile</Link>
              <Link  onClick={logout} className="px-4 py-2  bg-pink-600 rounded-lg hover:bg-pink-700 transition">Logout</Link>
            </div>  
          :
            <div className="gap-4 hidden md:flex">
              <Link to={"/login"} className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition">Login</Link>
              <Link to={"/signup"} className="px-4 py-2  bg-pink-600 rounded-lg hover:bg-pink-700 transition"> Sign Up</Link>
            </div>
        }
        
        {authUser ?
            <div className="md:hidden flex gap-x-2 ">
              <Link to="/profile" className="px-4 py-2  bg-pink-600 rounded-lg hover:bg-pink-700 transition">Profile</Link>
              <Link  onClick={logout} className="px-4 py-2  bg-pink-600 rounded-lg hover:bg-pink-700 transition">Logout</Link>
            </div>    
          :
            <div className="md:hidden">
              <Link to="/login" className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition">Login</Link>
            </div>      
        }


      {/* Mobile Menu */}

    </nav>
  );
};

export default Navbar;