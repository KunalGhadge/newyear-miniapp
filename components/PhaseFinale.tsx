import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { APP_CONFIG } from '../constants';

interface PhaseFinaleProps {
  playSound: (type: 'firework') => void;
}

const PhaseFinale: React.FC<PhaseFinaleProps> = ({ playSound }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fireRandomFirework = () => {
     playSound('firework');
     const duration = 1500;
     const animationEnd = Date.now() + duration;
     const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

     const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

     const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
           return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
     }, 250);
  };

  useEffect(() => {
     // Initial Burst
     fireRandomFirework();
     const timer = setInterval(() => {
         fireRandomFirework();
     }, 3000);
     return () => clearInterval(timer);
  }, []);

  return (
    <div 
        className="flex flex-col items-center justify-center h-full w-full p-6 relative z-10 select-none cursor-pointer"
        onClick={fireRandomFirework}
        ref={containerRef}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center relative"
      >
         <h2 className="font-cute text-3xl text-white/80 mb-4">Let's make this year amazing</h2>
         <h1 className="font-serif text-[8rem] leading-none font-bold text-gold drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
             {APP_CONFIG.year}
         </h1>
         <div className="font-cursive text-5xl text-rose-300 mt-4 animate-pulse">
             Happy New Year!
         </div>
      </motion.div>
      
      <div className="absolute bottom-12 text-center text-white/40 font-cute text-sm">
         Tap anywhere for fireworks ✨
      </div>
    </div>
  );
};

export default PhaseFinale;