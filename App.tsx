import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Background } from './components/Background';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Dashboard } from './components/Dashboard';
import { supabase } from './lib/supabaseClient';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const effectRan = useRef(false);

  useEffect(() => {
    // Increment visitor count only once per session/mount
    if (effectRan.current === false) {
      const incrementStats = async () => {
        try {
          // Fetch current count first
          const { data: currentData, error: fetchError } = await supabase
            .from('site_stats')
            .select('visitors')
            .single();

          if (currentData) {
            // Increment
             await supabase
            .from('site_stats')
            .update({ visitors: currentData.visitors + 1 })
            .eq('id', 1);
          } else {
             // Handle case where row doesn't exist yet (optional)
             await supabase.from('site_stats').insert([{ id: 1, visitors: 1 }]);
          }
        } catch (err) {
          console.warn('Failed to update stats', err);
        }
      };
      
      incrementStats();
      effectRan.current = true;
    }
  }, []);

  const handleLogoClick = () => {
    if (currentView === 'home') {
       setCurrentView('dashboard');
    } else {
       setCurrentView('home');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060b28] text-white overflow-x-hidden selection:bg-pink-500 selection:text-white font-sans">
      <Background />
      <Navbar onLogoClick={handleLogoClick} isDashboard={currentView === 'dashboard'} />
      
      {currentView === 'home' ? (
        <div className="relative z-10 flex flex-col">
          <Hero />
          <About />
          <Portfolio />
          <Contact />
          
          {/* Simple Footer */}
          <footer className="py-8 text-center text-white/40 text-sm relative z-10 border-t border-white/5">
            © {new Date().getFullYear()} Magda Emad. All rights reserved.
          </footer>
        </div>
      ) : (
        <div className="relative z-10">
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default App;