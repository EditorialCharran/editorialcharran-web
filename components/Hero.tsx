import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <motion.div 
           style={{ y: y1, rotate: 15 }} 
           className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-gray-100 rounded-full opacity-50 blur-3xl" 
         />
         <motion.div 
           style={{ y: y2, rotate: -10 }} 
           className="absolute top-[20%] -right-[5%] w-[40vw] h-[40vw] bg-red-50 rounded-full opacity-40 blur-3xl" 
         />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-charran-burgundy font-bold tracking-widest uppercase text-sm mb-4 block">
              Expertos en textos paralelos
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-charran-wood mb-6">
              Textos clásicos <br/>
              adaptados <br/>
              <span className="italic text-charran-burgundy">por niveles</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-light">
              En Editorial Charrán podrás encontrar libros de la literatura hispana y mundial, resumidos y adaptados cuidadosamente al nivel del estudiante.
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-5 relative hidden md:block h-[600px] perspective-1000">
           {/* Book Image Representation */}
           <motion.div
              style={{ y: y2 }}
              className="absolute inset-0 flex items-center justify-center"
           >
              <motion.img 
                src="https://i.postimg.cc/RhKSxPPG/Pruebalibro.png"
                alt="Libro Destacado Editorial Charrán"
                initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -20,
                  rotate: -2,
                  filter: "drop-shadow(0 30px 40px rgba(44, 26, 18, 0.4))"
                }}
                className="w-auto h-full max-h-[550px] object-contain drop-shadow-2xl cursor-hover transition-all duration-500"
              />
           </motion.div>
        </div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charran-wood/50"
      >
        <span className="text-xs uppercase tracking-widest">Descubre</span>
        <ArrowDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;