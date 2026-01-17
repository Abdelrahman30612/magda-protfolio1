import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20 relative z-10">
       <div className="max-w-4xl mx-auto w-full bg-[#1a1b4b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
         
         {/* Decorative blob inside card */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

         <div className="text-center mb-12">
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
           <p className="text-gray-300 text-lg max-w-2xl mx-auto">
             Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            
            {/* Email Card */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-pink-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Me</h3>
                <a href="mailto:magdae536@gmail.com" className="text-gray-300 hover:text-pink-400 transition-colors">
                    magdae536@gmail.com
                </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">WhatsApp Me</h3>
                <a href="https://wa.me/201155434881" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                    01155434881
                </a>
            </div>

         </div>

         {/* Social Links */}
         <div className="mt-12 flex justify-center space-x-6 relative z-10">
            <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#060b28] transition-all duration-300">
                <span className="font-bold text-lg">Be</span>
            </a>
             <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#060b28] transition-all duration-300">
                <span className="font-bold text-lg">in</span>
            </a>
             <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#060b28] transition-all duration-300">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </a>
         </div>

       </div>
    </section>
  );
};