import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#060b28]">
      {/* 1. Top Left - Large Dark Purple/Blue */}
      <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-[#1a1b4b] rounded-full mix-blend-screen filter blur-[100px] opacity-60"></div>
      
      {/* 2. Bottom Left (Behind text) - Cyan/Blue */}
      <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] bg-[#004e92] rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>

      {/* 3. Top Right - Deep Teal/Blue */}
      <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-[#003366] rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
      
      {/* 4. Bottom Right - Magenta/Purple */}
      <div className="absolute -bottom-[20%] -right-[15%] w-[70vw] h-[70vw] bg-[#6a11cb] rounded-full mix-blend-screen filter blur-[140px] opacity-40"></div>
      
      {/* Overall Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060b28] via-transparent to-[#060b28] opacity-80"></div>
    </div>
  );
};