import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // nice icons

const slides = [
  {
    title: "Create Your Snippet",
    desc: "Write or paste your code in seconds. No hassle, no clutter.",
    img: "s1.png",
  },
  {
    title: "Set Expiry Date",
    desc: "Decide how long your snippet should live. 10 mins, 1 day, or forever.",
    img: "s2.png",
  },
  {
    title: "Get Shareable Link",
    desc: "One click, one link. Share securely with anyone.",
    img: "s3.png",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-6 py-12">
      {/* Slide */}
      <div className="relative bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-600/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg transition-all duration-500">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {slides[current].title}
          </h2>
          <p className="text-gray-300 text-lg">{slides[current].desc}</p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={slides[current].img}
            alt={slides[current].title}
            className="w-[250px] md:w-[300px] rounded-lg shadow-md select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition shadow-lg"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition shadow-lg"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-pink-500 scale-110" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
