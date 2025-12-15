import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Catálogo', href: '#catalogo' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Contacto', href: '#contacto' },
];

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out px-6 md:px-12 py-4 ${
        scrolled ? 'bg-charran-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="group flex items-center gap-3 relative z-50">
           <motion.div
             whileHover={{ rotate: 5 }}
             transition={{ type: 'spring', stiffness: 300 }}
           >
             <img 
               src="https://i.postimg.cc/x1f1mkSK/Logo-sin-fondo.png" 
               alt="Editorial Charrán Logo" 
               className="h-12 w-auto object-contain"
             />
           </motion.div>
           <span className={`font-serif text-2xl font-bold tracking-tight ${scrolled ? 'text-charran-wood' : 'text-charran-wood'}`}>
             Editorial Charrán
           </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium tracking-wide uppercase text-charran-wood group overflow-hidden"
            >
              <span className="block relative z-10 transition-colors duration-300 group-hover:text-charran-burgundy">
                {link.name}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charran-burgundy -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
          <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="px-6 py-2 bg-charran-wood text-white text-sm font-bold uppercase tracking-widest hover:bg-charran-burgundy transition-colors duration-300"
          >
            Suscribirse
          </motion.button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-charran-wood"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-charran-wood z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="font-serif text-4xl text-charran-white hover:text-charran-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;