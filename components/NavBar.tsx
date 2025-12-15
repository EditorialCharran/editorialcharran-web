import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Check, AlertCircle, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Contacto', href: '#contacto' },
];

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [subMessage, setSubMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset status after closing (delay slightly to avoid visual glitch)
    setTimeout(() => {
      setSubStatus('idle');
      setSubMessage('');
      setSubEmail('');
    }, 300);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus('submitting');
    setSubMessage('');

    const formData = new FormData();
    formData.append('access_key', '8389036c-1921-430f-a6b4-665249ca2646');
    formData.append('email', subEmail);
    formData.append('botcheck', ''); // Spam protection

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubStatus('success');
        setSubMessage('¡Gracias! Te hemos añadido a la lista.');
        setSubEmail('');
        // Close automatically after 1.5 seconds
        setTimeout(() => {
          handleCloseModal();
        }, 1500);
      } else {
        setSubStatus('error');
        setSubMessage('No se pudo enviar. Inténtalo de nuevo.');
      }
    } catch (error) {
      setSubStatus('error');
      setSubMessage('Error de conexión.');
    }
  };

  return (
    <>
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
             <span className={`font-serif text-2xl font-bold tracking-tight text-charran-wood`}>
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
               onClick={() => setIsModalOpen(true)}
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

      {/* Subscription Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-charran-wood/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden"
            >
               {/* Close Button */}
               <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-charran-burgundy transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-charran-wood/10 rounded-full mb-4 text-charran-wood">
                   <Mail size={24} />
                </div>

                <h3 className="font-serif text-2xl font-bold text-charran-wood mb-2 leading-tight">
                  Recibe novedades de Editorial Charrán
                </h3>
                
                <p className="text-gray-600 mb-6 font-light text-sm leading-relaxed">
                  Déjanos tu email y te avisaremos de nuevos textos paralelos, ofertas y recursos.
                </p>

                {subStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 text-green-800 p-4 rounded-md flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    <span className="font-bold">{subMessage}</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        placeholder="Tu correo electrónico"
                        value={subEmail}
                        onChange={(e) => setSubEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-charran-burgundy focus:ring-1 focus:ring-charran-burgundy transition-all"
                      />
                    </div>

                    {subStatus === 'error' && (
                       <div className="text-red-600 text-xs flex items-center justify-center gap-1">
                          <AlertCircle size={12} /> {subMessage}
                       </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={subStatus === 'submitting'}
                      className={`w-full py-3 bg-charran-wood text-white font-bold uppercase tracking-widest hover:bg-charran-burgundy transition-colors duration-300 rounded-sm ${subStatus === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}
                    >
                      {subStatus === 'submitting' ? 'Enviando...' : 'Enviar'}
                    </motion.button>
                  </form>
                )}
              </div>
              
              {/* Decorative bottom bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-charran-wood via-charran-burgundy to-charran-gold"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;