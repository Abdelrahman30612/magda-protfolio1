import React from 'react';

export const GeometricArt: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[700px] flex items-center justify-center scale-110 md:scale-125 origin-center translate-x-10">
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff7e5f', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#feb47b', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradPinkPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ec008c', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#fc6767', stopOpacity: 0.9 }} />
          </linearGradient>
           <linearGradient id="gradBlue" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00c6ff', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#0072ff', stopOpacity: 0.8 }} />
          </linearGradient>
           <linearGradient id="gradMulti" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#4facfe', stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: '#f093fb', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>

        <g transform="translate(400, 350)">
          
          {/* --- Bottom Right Cluster (Blue/Purple/Wireframes) --- */}
          <g transform="translate(100, 100)">
             {/* Large faint wireframe background */}
             <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="#6a11cb" strokeWidth="1" transform="rotate(45)" opacity="0.3" />
             
             {/* Blue/Multi Gradient Square */}
             <rect x="-80" y="-80" width="160" height="160" fill="url(#gradBlue)" transform="rotate(45)" opacity="0.8" style={{ mixBlendMode: 'screen' }} />
             
             {/* Inner bright square */}
             <rect x="-40" y="-40" width="80" height="80" fill="#00f2fe" transform="rotate(45)" opacity="0.6" />
             
             {/* Overlapping Wireframes */}
             <rect x="-90" y="-90" width="180" height="180" fill="none" stroke="#f093fb" strokeWidth="2" transform="rotate(45)" />
             <rect x="-100" y="-60" width="180" height="180" fill="none" stroke="#4facfe" strokeWidth="1" transform="rotate(30)" opacity="0.5" />

             {/* Tech lines extending out */}
             <line x1="0" y1="0" x2="200" y2="0" stroke="#00c6ff" strokeWidth="2" />
             <line x1="0" y1="0" x2="0" y2="200" stroke="#f093fb" strokeWidth="2" />
          </g>

          {/* --- Top Left Cluster (Orange/Pink Dominant) --- */}
          <g transform="translate(-80, -80)">
             {/* Large Back Wireframe */}
             <rect x="-130" y="-130" width="260" height="260" fill="none" stroke="#fc6767" strokeWidth="1" transform="rotate(45)" opacity="0.5" />
             <line x1="-200" y1="-150" x2="200" y2="-150" stroke="#fc6767" strokeWidth="1" opacity="0.4" />

             {/* Main Solid Orange Gradient Diamond */}
             <rect x="-90" y="-90" width="180" height="180" fill="url(#gradOrange)" transform="rotate(45)" />
             
             {/* Overlapping Pink Transparent Diamond */}
             <rect x="-60" y="-110" width="160" height="160" fill="url(#gradPinkPurple)" transform="rotate(60)" style={{ mixBlendMode: 'overlay' }} />

             {/* White Wireframe Box */}
             <rect x="-85" y="-85" width="170" height="170" fill="none" stroke="white" strokeWidth="3" transform="rotate(45)" />
             
             {/* Floating geometric bits */}
             <rect x="-140" y="0" width="30" height="30" fill="#feb47b" transform="rotate(45)" />
             <rect x="80" y="-100" width="20" height="20" fill="#ec008c" transform="rotate(15)" />
          </g>

          {/* --- Intersecting Elements & Scatter --- */}
          <g>
             {/* Long horizontal lines */}
             <line x1="-300" y1="20" x2="200" y2="20" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
             <line x1="-250" y1="40" x2="100" y2="40" stroke="#ec008c" strokeWidth="2" />
             <line x1="50" y1="120" x2="300" y2="120" stroke="#00c6ff" strokeWidth="2" />

             {/* Diagonal cuts */}
             <line x1="100" y1="-200" x2="-200" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
             
             {/* Small Squares/Triangles */}
             <rect x="180" y="150" width="15" height="15" fill="#f093fb" />
             <rect x="-220" y="-50" width="15" height="15" fill="#feb47b" transform="rotate(45)" />
             <polygon points="200,-50 220,-30 180,-30" fill="#00f2fe" opacity="0.8" />
             
             {/* Connection Nodes */}
             <circle cx="-80" cy="-80" r="5" fill="white" />
             <circle cx="100" cy="100" r="5" fill="white" />
             <circle cx="120" cy="120" r="3" fill="#00c6ff" />
          </g>
        </g>
      </svg>
    </div>
  );
};