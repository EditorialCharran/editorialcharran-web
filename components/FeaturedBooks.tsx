import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Bell } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  color: string;
  image: string;
  category: 'A2' | 'B1' | 'B2' | 'YE';
  amazonUrl: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Marianela",
    author: "Benito Pérez Galdós",
    color: "#3E2723",
    image: "https://i.postimg.cc/Ls97Dqt7/PORTADA.jpg",
    category: 'A2',
    amazonUrl: "https://mybook.to/marianela"
  },
  {
    id: 2,
    title: "Viaje al centro de la Tierra",
    author: "Julio Verne",
    color: "#570A15",
    image: "https://i.postimg.cc/yNvkKX35/Portada-simple.jpg",
    category: 'B1',
    amazonUrl: "https://mybook.to/viajealcentrodelatierr"
  },
  {
    id: 3,
    title: "Peter Pan y Wendy",
    author: "James M. Barrie",
    color: "#1a1a1a",
    image: "https://i.postimg.cc/DyksB6r0/003-Portada-simple.jpg",
    category: 'A2',
    amazonUrl: "https://mybook.to/peterpanyw"
  },
  {
    id: 4,
    title: "Sherlock Holmes - El sabueso de los Baskerville",
    author: "Arthur Conan Doyle",
    color: "#2C1A12",
    image: "https://i.postimg.cc/FKzHL1cF/004-Portada-simple.jpg",
    category: 'B1',
    amazonUrl: "https://mybook.to/elsabueso"
  },
  {
    id: 5,
    title: "Frankenstein o El moderno Prometeo",
    author: "Mary Shelley",
    color: "#1a1a1a",
    image: "https://i.postimg.cc/tgcCtyt2/005-Portada-simple.jpg",
    category: 'B2',
    amazonUrl: "https://mybook.to/frankensteinmshelley"
  },
  {
    id: 6,
    title: "La Odisea",
    author: "Homero / Charles Lamb",
    color: "#2C1A12",
    image: "https://i.postimg.cc/PxHnqW8Y/006-Portada-simple.jpg",
    category: 'A2',
    amazonUrl: "https://mybook.to/laodiseaA"
  },
  {
    id: 7,
    title: "La Odisea - Young Edition",
    author: "Homero / Charles Lamb",
    color: "#C5A059",
    image: "https://i.postimg.cc/MKqrZ6H1/A-001-Portada-simple.jpg",
    category: 'YE',
    amazonUrl: "https://mybook.to/laodiseaYE"
  },
  {
    id: 8,
    title: "Viaje al centro de la Tierra - Young Edition",
    author: "Julio Verne",
    color: "#C5A059",
    image: "https://i.postimg.cc/5NgK6hFc/A-002-Portada-simple.jpg",
    category: 'YE',
    amazonUrl: "https://mybook.to/viajeedjoven"
  }
];

type FilterType = 'Todos' | 'A2' | 'B1' | 'B2' | 'YE';

const FeaturedBooks: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');

  const filteredBooks = activeFilter === 'Todos' 
    ? books 
    : books.filter(book => book.category === activeFilter);

  return (
    <section id="catalogo" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col xl:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl text-charran-wood mb-4"
            >
              Novedades Editoriales
            </motion.h2>
            <div className="h-1 w-24 bg-charran-burgundy mb-6"></div>
            <p className="text-gray-600 font-light text-lg">
              Explora nuestras adaptaciones clásicas filtradas por nivel de dificultad.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 p-1 bg-gray-50 rounded-lg border border-gray-100 overflow-x-auto max-w-full">
            {(['Todos', 'A2', 'B1', 'B2', 'YE'] as FilterType[]).map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 md:px-8 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-md relative whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'text-white' 
                    : 'text-charran-wood hover:text-charran-burgundy'
                }`}
              >
                <span className="relative z-10">{filter}</span>
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-charran-burgundy rounded-md shadow-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]"
        >
          <AnimatePresence mode='popLayout'>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Upcoming Releases Section */}
        <div className="mt-24">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative bg-charran-wood rounded-2xl p-8 md:p-12 overflow-hidden shadow-2xl"
           >
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-charran-burgundy/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                 <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                       <Clock className="text-charran-gold" size={24} />
                       <span className="text-charran-gold font-bold uppercase tracking-widest text-sm">Muy Pronto</span>
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">Próximos Lanzamientos</h3>
                    <p className="text-gray-300 font-light text-lg mb-8 leading-relaxed">
                       Estamos trabajando en nuevas adaptaciones. Contacta con nosotros y te avisaremos cuando estos títulos estén disponibles.
                    </p>
                    <a 
                       href="#contacto"
                       className="inline-flex items-center gap-2 px-8 py-3 bg-charran-burgundy text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-charran-burgundy transition-colors rounded-sm"
                    >
                       <Bell size={16} />
                       Avísame del lanzamiento
                    </a>
                 </div>

                 <div className="flex-1 w-full">
                    <div className="grid gap-4">
                       <div className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <h4 className="font-serif text-xl text-white mb-1">Peter Pan y Wendy</h4>
                          <span className="text-charran-gold text-xs font-bold uppercase tracking-widest">Young Edition</span>
                       </div>
                       <div className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <h4 className="font-serif text-xl text-white mb-1">Las aventuras de Sherlock Holmes</h4>
                          <span className="text-charran-gold text-xs font-bold uppercase tracking-widest">Nivel A2/B1</span>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative cursor-hover perspective-1000"
    >
      <motion.div
        className="relative aspect-[2/3] w-full bg-gray-100 shadow-xl overflow-hidden rounded-sm"
        whileHover={{ 
          y: -15, 
          rotateY: -5, 
          rotateX: 5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
        
        {/* Category Badge on Image */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-charran-white/90 backdrop-blur-sm text-charran-burgundy text-[10px] font-bold tracking-widest uppercase shadow-sm">
            Nivel {book.category}
          </span>
        </div>
        
        {/* Overlay content on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charran-burgundy/80 backdrop-blur-sm p-6 text-center">
          <div>
            <p className="text-white font-serif text-xl mb-2 italic leading-tight">{book.title}</p>
            <p className="text-white/80 uppercase text-[10px] tracking-widest mb-6">por {book.author}</p>
            
            {book.amazonUrl ? (
              <a 
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 border border-white text-white uppercase text-[10px] font-bold hover:bg-white hover:text-charran-burgundy transition-colors"
              >
                Ver más en Amazon
              </a>
            ) : (
              <span className="inline-block px-4 py-2 border border-white/50 text-white/80 uppercase text-[10px] font-bold cursor-default">
                Próximamente
              </span>
            )}
          </div>
        </div>
      </motion.div>
      
      <div className="mt-6 text-center px-2">
        <h3 className="font-serif text-xl text-charran-wood group-hover:text-charran-burgundy transition-colors duration-300 leading-tight">
          {book.title}
        </h3>
        <p className="text-gray-500 text-[10px] uppercase tracking-wide mt-2">{book.author}</p>
      </div>
    </motion.div>
  );
};

export default FeaturedBooks;