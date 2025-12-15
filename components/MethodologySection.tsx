import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Heart, BarChart3, Feather, Sprout, Check } from 'lucide-react';

const advantages = [
  {
    id: 1,
    title: "Comprensión Inmediata",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Cada fragmento en español aparece acompañado de su versión en inglés.",
    details: [
      "Entiende sin usar diccionario",
      "Avanza a tu propio ritmo",
      "Reduce la frustración"
    ]
  },
  {
    id: 2,
    title: "Vocabulario en Contexto",
    icon: <Brain className="w-8 h-8" />,
    description: "Las palabras nuevas se aprenden dentro de una historia real, no en listas aisladas.",
    details: [
      "Asociación emocional",
      "Mayor retención",
      "Patrones naturales"
    ]
  },
  {
    id: 3,
    title: "Historias que Motivan",
    icon: <Heart className="w-8 h-8" />,
    description: "Clásicos seleccionados por su valor narrativo en lugar de frases artificiales.",
    details: [
      "Lectura interesante",
      "Contenido inspirador",
      "Cercano a la realidad"
    ]
  },
  {
    id: 4,
    title: "Adaptaciones por Niveles",
    icon: <BarChart3 className="w-8 h-8" />,
    description: "Cada obra se adapta según el nivel del lector (MCER).",
    details: [
      "A2: Estructuras básicas",
      "B1: Tiempos variados",
      "B2: Riqueza expresiva"
    ]
  },
  {
    id: 5,
    title: "Resúmenes Fieles",
    icon: <Feather className="w-8 h-8" />,
    description: "No simplificamos en exceso; mantenemos la esencia de cada obra.",
    details: [
      "Tono original",
      "Ritmo narrativo",
      "Intención del autor"
    ]
  },
  {
    id: 6,
    title: "Aprendizaje Natural",
    icon: <Sprout className="w-8 h-8" />,
    description: "Combina exposición repetida, comprensión y refuerzo visual.",
    details: [
      "Comprensión lectora",
      "Gramática implícita",
      "Mayor fluidez"
    ]
  }
];

const MethodologySection: React.FC = () => {
  return (
    <section className="py-24 bg-charran-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-charran-burgundy blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-charran-wood blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-charran-burgundy font-bold uppercase tracking-widest text-sm block mb-4"
          >
            Aprender un idioma leyendo grandes historias
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl text-charran-wood mb-8 leading-tight"
          >
            Por qué aprender con <br/>
            <span className="italic text-charran-burgundy">textos paralelos</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Seleccionamos obras clásicas y las transformamos en versiones accesibles para estudiantes desde el nivel <strong>A2 hasta B2</strong>, siguiendo cuidadosamente las directrices del Marco Común Europeo de Referencia (MCER).
          </motion.p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {advantages.map((item, index) => (
            <MethodCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Essence Conclusion */}
        <div className="max-w-3xl mx-auto text-center relative py-12 border-t border-charran-wood/10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-charran-wood italic leading-relaxed"
          >
            "Elegimos obras universales. Las adaptamos con rigor pedagógico. Y te ofrecemos una lectura que te ayuda a aprender español mientras disfrutas de la literatura."
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm uppercase tracking-widest text-charran-burgundy font-bold"
          >
            Porque creemos que leer bien es aprender mejor
          </motion.p>
        </div>

      </div>
    </section>
  );
};

const MethodCard: React.FC<{ item: typeof advantages[0], index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover="hover"
      className="group relative bg-white border border-gray-200 p-8 h-full rounded-sm overflow-hidden cursor-hover shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Background slide effect */}
      <motion.div 
        variants={{
          hover: { height: "100%" }
        }}
        initial={{ height: "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full bg-charran-wood z-0"
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 text-charran-burgundy group-hover:text-charran-gold transition-colors duration-300 bg-gray-50 group-hover:bg-white/10 w-16 h-16 rounded-full flex items-center justify-center">
          {item.icon}
        </div>
        
        <h3 className="font-serif text-xl font-bold text-charran-wood group-hover:text-white mb-3 transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-gray-600 font-light group-hover:text-gray-200 mb-6 transition-colors duration-300 text-sm leading-relaxed">
          {item.description}
        </p>

        <motion.ul 
          className="mt-auto space-y-2 border-t border-gray-100 group-hover:border-white/20 pt-4"
        >
          {item.details.map((detail, i) => (
            <motion.li 
              key={i}
              className="text-xs font-bold uppercase tracking-wide text-gray-400 group-hover:text-charran-gold flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-charran-burgundy group-hover:bg-white"></span>
              {detail}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default MethodologySection;