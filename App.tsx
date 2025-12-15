import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import FeaturedBooks from './components/FeaturedBooks';
import AboutSection from './components/AboutSection';
import MethodologySection from './components/MethodologySection';
import ContactFooter from './components/ContactFooter';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a high-end preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-charran-wood flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-charran-white italic animate-pulse">
            Editorial Charrán
          </h1>
          <p className="text-charran-gold mt-4 font-sans tracking-widest text-sm uppercase">Cargando historias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charran-white min-h-screen text-charran-wood font-sans selection:bg-charran-burgundy selection:text-white relative">
      <CustomCursor />
      <NavBar />
      <main>
        <Hero />
        <FeaturedBooks />
        <AboutSection />
        <MethodologySection />
        <ContactFooter />
      </main>
    </div>
  );
};

export default App;