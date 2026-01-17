import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20 relative z-10">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
        
        {/* Text Content */}
        <div className="w-full space-y-8 text-center">
           <div className="inline-block px-4 py-1 border border-pink-500/50 rounded-full bg-pink-500/10 text-pink-300 text-sm tracking-wider uppercase mb-4">
             About Me
           </div>
           <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
             Creative Design <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
               Solutions
             </span>
           </h2>
           <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
             I am Magda Emad, a professional Graphic Designer with a deep passion for modern aesthetics. My journey involves exploring the intersection of art and technology to create visually compelling narratives.
           </p>
           <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
             From branding and logo design to UI/UX and digital illustration, I focus on delivering designs that are not only beautiful but also functional and meaningful.
           </p>
        </div>

      </div>
    </section>
  );
};