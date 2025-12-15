import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ShoppingCart, X, Check, Mail } from 'lucide-react';

const ContactFooter: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const formDataToSend = new FormData(formElement);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        // Limpiar formulario y mostrar modal de éxito
        setFormData({ nombre: '', email: '', message: '' });
        setShowModal(true);
      } else {
        console.error("Error en el envío", data);
      }
    } catch (error) {
      console.error("Error de conexión", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contacto" className="bg-charran-white pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-charran-wood rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">
           {/* Contact Info */}
           <div className="p-12 md:p-16 flex flex-col justify-between bg-charran-wood text-charran-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-charran-burgundy rounded-bl-full opacity-20"></div>
              
              <div>
                <h2 className="font-serif text-4xl mb-6">Hablemos</h2>
                <p className="text-gray-300 font-light mb-8">
                  ¿Eres autor? ¿Lector? ¿Distribuidor? Nos encantaría escuchar tu historia.
                </p>
                
                <div className="space-y-4">
                   <p className="flex items-center gap-4 text-sm tracking-wide">
                      <span className="w-2 h-2 bg-charran-burgundy rounded-full"></span>
                      contacto@editorialcharran.com
                   </p>
                </div>
              </div>

              <div className="mt-12">
                 <motion.a 
                    href="https://amazon.es" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, backgroundColor: '#f9f9f9', color: '#570A15' }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-4 px-8 py-5 bg-charran-burgundy text-white font-bold uppercase tracking-widest rounded-sm border border-transparent shadow-lg transition-colors cursor-pointer group"
                 >
                    <ShoppingCart className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-lg">Ver en Amazon</span>
                 </motion.a>
              </div>
           </div>

           {/* Form */}
           <div className="p-12 md:p-16 bg-white">
              <form 
                className="space-y-6"
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
              >
                 {/* Web3Forms Access Key */}
                 <input type="hidden" name="access_key" value="8389036c-1921-430f-a6b4-665249ca2646" />
                 
                 {/* Spam Protection (Honeypot) - optional but recommended by Web3Forms usually, keeping simple as requested */}
                 <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                 <InputGroup 
                   label="Nombre" 
                   placeholder="Tu nombre completo" 
                   name="nombre"
                   value={formData.nombre}
                   onChange={handleInputChange}
                 />
                 <InputGroup 
                   label="Email" 
                   placeholder="tucorreo@ejemplo.com" 
                   type="email" 
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                 />
                 <div className="relative z-0 w-full mb-6 group">
                    <textarea 
                      name="message" 
                      id="message" 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-charran-burgundy peer resize-none" 
                      placeholder=" " 
                      required 
                    />
                    <label 
                      htmlFor="message" 
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-charran-burgundy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Mensaje
                    </label>
                 </div>
                 
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   disabled={isSubmitting}
                   className={`w-full py-4 bg-charran-wood text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-charran-burgundy transition-colors duration-300 ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
                   type="submit"
                 >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'} 
                    {!isSubmitting && <Send size={16} />}
                 </motion.button>
              </form>
           </div>
        </div>

        <div className="mt-16 text-center">
           <h1 className="font-serif text-[12vw] md:text-[150px] leading-none text-gray-100 select-none pointer-events-none">
              CHARRÁN
           </h1>
           <div className="flex justify-between items-center text-xs text-gray-400 mt-4 uppercase tracking-widest border-t pt-4">
              <p>&copy; 2024 Editorial Charrán</p>
              <div className="flex gap-6">
                 <a href="#" className="hover:text-charran-wood transition-colors">Privacidad</a>
                 <a href="#" className="hover:text-charran-wood transition-colors">Términos</a>
              </div>
           </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-charran-wood/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Decorative Header */}
              <div className="h-2 w-full bg-charran-burgundy"></div>
              
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-charran-burgundy transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-10 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                     <Mail size={32} />
                  </div>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight text-charran-wood mb-4">
                  ¡Mensaje Enviado!
                </h3>

                <p className="text-gray-600 mb-8 font-light leading-relaxed">
                  Gracias por contactar con Editorial Charrán. Hemos recibido tu mensaje correctamente y te responderemos a la mayor brevedad posible.
                </p>

                <motion.button
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-charran-wood text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-charran-burgundy transition-colors duration-300 rounded-sm"
                >
                  <Check size={18} /> Entendido
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

interface InputGroupProps {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, placeholder, type = "text", name, value, onChange }) => (
  <div className="relative z-0 w-full mb-6 group">
      <input 
        type={type} 
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-charran-burgundy peer" 
        placeholder=" " 
        required 
      />
      <label 
        htmlFor={name} 
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-charran-burgundy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
  </div>
);

export default ContactFooter;