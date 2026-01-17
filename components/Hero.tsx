import React from 'react';
import { GeometricArt } from './GeometricArt';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 pt-20">
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-2 z-20 mt-10 md:mt-0">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide opacity-90 animate-fade-in-up">
          Welcome to
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-xl leading-tight animate-fade-in-up delay-100">
          Magda Emad
        </h1>
        
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg pt-6 font-normal opacity-80 animate-fade-in-up delay-200">
          A passionate Graphic Designer crafting visual stories through color, typography, and geometry. Transforming ideas into stunning digital experiences.
        </p>

        <div className="pt-10 animate-fade-in-up delay-300">
          <a href="#about" className="inline-block bg-white text-[#060b28] font-bold text-lg py-3 px-12 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 transform active:scale-95">
            More Info
          </a>
        </div>
      </div>

      {/* Right Content - Abstract Art */}
      <div className="w-full md:w-1/2 relative flex justify-center md:justify-end pointer-events-none animate-float">
        <GeometricArt />
      </div>
    </section>
  );
};