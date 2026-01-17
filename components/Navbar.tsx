import React, { useState } from 'react';

interface NavbarProps {
  onLogoClick?: () => void;
  isDashboard?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick, isDashboard }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    // If we are in dashboard, we might need to navigate home first - handled by parent usually
    // For now, assuming this navbar is mostly for the public page
    if (isDashboard && onLogoClick) {
      onLogoClick(); // Toggle back to home
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Calculate position with offset for fixed header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-6 py-6 md:px-16 flex justify-between items-center bg-[#060b28]/90 backdrop-blur-md border-b border-white/5 shadow-lg">
      {/* Logo */}
       <div 
         className="text-xl font-bold tracking-widest text-white uppercase cursor-pointer z-50 hover:text-pink-500 transition-colors"
         onClick={() => {
           if (onLogoClick) onLogoClick();
           else window.scrollTo({ top: 0, behavior: 'smooth' });
         }}
         title="Click to access Admin Dashboard"
       >
        {isDashboard ? '← Back to Site' : 'Magda.'}
      </div>

      {!isDashboard && (
        <>
          {/* Mobile Menu Icon */}
          <div 
            className="md:hidden text-white cursor-pointer z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-12 text-gray-200 font-normal text-base tracking-wide mx-auto">
            <li>
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors cursor-pointer relative group">
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors cursor-pointer relative group">
                About Us
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="hover:text-white transition-colors cursor-pointer relative group">
                My Projects
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors cursor-pointer relative group">
                Contact Us
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </a>
            </li>
          </ul>
          
          {/* Mobile Menu Dropdown */}
          <div className={`fixed inset-0 bg-[#060b28] z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
             <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-2xl text-white font-medium hover:text-pink-500 transition-colors">Home</a>
             <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-2xl text-white font-medium hover:text-pink-500 transition-colors">About Us</a>
             <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="text-2xl text-white font-medium hover:text-pink-500 transition-colors">My Projects</a>
             <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-2xl text-white font-medium hover:text-pink-500 transition-colors">Contact Us</a>
          </div>

          {/* Empty div for layout balance on large screens */}
          <div className="hidden md:block w-[70px]"></div>
        </>
      )}
      {isDashboard && <div className="hidden md:block w-[70px]"></div>}
    </nav>
  );
};