import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-charran-burgundy z-[100] pointer-events-none mix-blend-multiply hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(87, 10, 21, 0.1)' : 'transparent',
        borderColor: isHovering ? 'transparent' : '#570A15'
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      {isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full flex items-center justify-center"
        >
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomCursor;