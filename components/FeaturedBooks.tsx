import React from 'react';
import { motion } from 'framer-motion';

interface Book {
  id: number;
  title: string;
  author: string;
  color: string;
  image: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Marianela",
    author: "Benito Pérez Galdós",
    color: "#3E2723",
    image: "https://i.postimg.cc/Ls97Dqt7/PORTADA.jpg"
  },
  {
    id: 2,
    title: "Viaje al centro de la Tierra",
    author: "Julio Verne",
    color: "#570A15",
    image: "https://i.postimg.cc/T1hVd9SK/Portada-simple.jpg"
  },
  {
    id: 3,
    title: "Peter Pan y Wendy",
    author: "James M. Barrie",
    color: "#1a1a1a",
    image: "https://i.postimg.cc/vBcVVv7t/003-Portada-simple.jpg"
  }
];

const FeaturedBooks: React.FC = () => {
  return (
    <section id="catalogo" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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
              Aquí tienes una selección de nuestros libros más recientes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <motion.div
      className="group relative cursor-hover perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative aspect-[2/3] w-full bg-gray-100 shadow-xl overflow-hidden"
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
        
        {/* Overlay content on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charran-burgundy/80 backdrop-blur-sm p-6 text-center">
          <div>
            <p className="text-white font-serif text-2xl mb-2 italic">{book.title}</p>
            <p className="text-white/80 uppercase text-xs tracking-widest mb-6">por {book.author}</p>
            <button className="px-6 py-2 border border-white text-white uppercase text-xs font-bold hover:bg-white hover:text-charran-burgundy transition-colors">
              Ver más en Amazon
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-6 text-center">
        <h3 className="font-serif text-2xl text-charran-wood group-hover:text-charran-burgundy transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm uppercase tracking-wide mt-1">{book.author}</p>
      </div>
    </motion.div>
  );
};

export default FeaturedBooks;