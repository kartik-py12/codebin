import React from "react";
import Slider from "../components/Slider";
import {Link} from "react-router-dom";

const Homepage = () => {
  return (
    <div className="relative pt-20 w-full min-h-screen overflow-hidden flex flex-col text-white">


      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center  px-6 py-12 gap-10 relative z-10">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg gap-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Share code, <span className="text-pink-500">securely</span> ✨
          </h1>
          <p className="text-gray-300 text-lg">
            Paste your snippet, set an expiry date, and share a secure link with
            anyone.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row  ">
            <Link
              to="/create"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-medium hover:opacity-90 transition"
            >
              Create Snippet 🚀
            </Link>
            <Link
              to="/profile"
              className="px-6 py-3 border border-pink-500 rounded-full hover:bg-pink-600/20 transition"
            >
              Explore Snippets 🔍
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative group">
          {/* Gradient background with blur */}
          <div className="absolute inset-0 rounded-lg blur-md bg-gradient-to-r from-pink-600 to-purple-600 group-hover:blur-lg transition-all duration-300"></div>
          {/* Image */}
          <img
            src="homeBg.png"
            alt="Code illustration"
            className="relative w-[280px] md:w-[400px] rounded-lg object-cover select-none pointer-events-none"
          />
        </div>
      </div>


      <Slider/>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 relative z-10">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} CodeShare. Built for developers 💻
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
