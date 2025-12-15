import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-24 bg-charran-wood text-charran-white overflow-hidden relative">
       {/* Texture overlay could go here */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-charran-burgundy opacity-5 skew-x-12 transform translate-x-20"></div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                   <span className="text-charran-gold uppercase tracking-widest text-sm font-bold mb-4 block">
                      Nuestra Esencia
                   </span>
                   <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
                      El poder de la lectura <br/>
                      <span className="text-white italic">para aprender</span>
                   </h2>
                </motion.div>
                
                <div className="space-y-6 text-lg font-light text-gray-300 leading-relaxed">
                   <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2, duration: 0.8 }}
                   >
                      En Editorial Charrán creemos que la lectura es una de las herramientas más poderosas para aprender un idioma. Por eso adaptamos grandes obras de la literatura a diferentes niveles del MCER, ofreciendo textos paralelos que permiten disfrutar de historias universales mientras se adquiere vocabulario, se mejora la comprensión y se gana confianza al leer en español.
                   </motion.p>
                   <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.4, duration: 0.8 }}
                   >
                      Nuestra misión es acercar los clásicos a estudiantes de todos los niveles, proporcionando materiales claros, accesibles y motivadores que hagan del aprendizaje una experiencia más natural y agradable.
                   </motion.p>
                </div>
             </div>

             <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                   <motion.div 
                      className="space-y-4 mt-12"
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                   >
                      <img src="https://i.postimg.cc/T3FThMZy/river-tern-2415401-960-720.jpg" alt="Charrán Bird" className="w-full h-64 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
                      <img src="https://cdn.pixabay.com/photo/2019/09/10/14/10/letters-4466230_960_720.jpg" alt="Vintage Letters" className="w-full h-48 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
                   </motion.div>
                   <motion.div 
                      className="space-y-4"
                      initial={{ y: -50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                   >
                      <img src="https://cdn.pixabay.com/photo/2017/07/08/19/20/ebook-2485304_1280.jpg" alt="Digital Reading" className="w-full h-48 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
                      <img src="https://i.postimg.cc/vmZ589w5/book-3998252-1280.jpg" alt="Open Book Heart" className="w-full h-80 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
                   </motion.div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default AboutSection;