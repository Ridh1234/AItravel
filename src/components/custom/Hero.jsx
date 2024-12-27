import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/homeimg.jpeg')` }} // Correct path for public folder
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <h2 className="font-extrabold text-[45px] md:text-[60px] text-white leading-snug">
          <span className="text-[#f56551] block">Plan Your Next Adventure With AI:</span>
          Your Own Personalised Itinerary At Your Fingertips
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mt-6">
          Your personal trip planner and travel curator creates custom itineraries tailored to your budget and interests.
        </p>
        <Link to={'/create-trip'}>
          <Button className="mt-8 text-lg bg-[#f56551] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#d44c3c] transition-transform transform hover:scale-105">
            Get started!
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
