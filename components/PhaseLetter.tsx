import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { LETTER_CONTENT, APP_CONFIG } from '../constants';
import confetti from 'canvas-confetti';

interface PhaseLetterProps {
  onComplete: () => void;
  playSound: (type: 'pop' | 'success' | 'magic') => void;
}

const PhaseLetter: React.FC<PhaseLetterProps> = ({ onComplete, playSound }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    playSound('magic');
    setIsOpen(true);
    
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFE4E1', '#FF0000', '#8B0000']
    };
    
    confetti({ ...defaults, particleCount: 50, scalar: 2, shapes: ['heart'] } as any);
    confetti({ ...defaults, particleCount: 25, scalar: 3, shapes: ['heart'] } as any);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative z-10 select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", duration: 1.2 }}
            onClick={handleOpen}
            className="cursor-pointer group relative"
          >
             {/* SVG Envelope for perfect geometry */}
            <div className="w-80 h-60 relative drop-shadow-2xl transition-transform duration-300 group-hover:scale-105">
               {/* Base */}
               <svg viewBox="0 0 320 240" className="absolute inset-0 w-full h-full filter drop-shadow-lg">
                  <path d="M0,0 L160,120 L320,0 L320,240 L0,240 Z" fill="#fecdd3" /> {/* rose-200 */}
                  <path d="M0,0 L160,120 L0,240 Z" fill="#fda4af" /> {/* rose-300 side shadow */}
                  <path d="M320,0 L160,120 L320,240 Z" fill="#fda4af" /> {/* rose-300 side shadow */}
                  <path d="M0,240 L160,120 L320,240 Z" fill="#fb7185" /> {/* rose-400 bottom flap */}
               </svg>
               
               {/* Flap - Animates Open */}
               <motion.div 
                  className="absolute top-0 left-0 w-full h-1/2 origin-top z-20"
                  whileHover={{ rotateX: 180, zIndex: 0 }}
                  transition={{ duration: 0.5 }}
               >
                   <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
                      <path d="M0,0 L160,120 L320,0 Z" fill="#f43f5e" className="group-hover:fill-rose-500 transition-colors" /> {/* rose-600 top flap */}
                   </svg>
                   {/* Seal */}
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-700 rounded-full flex items-center justify-center border-2 border-red-300 shadow-md">
                       <Heart size={20} fill="white" className="text-white" />
                   </div>
               </motion.div>

               <div className="absolute bottom-4 w-full text-center text-rose-900 font-serif font-bold tracking-widest opacity-80">
                   {APP_CONFIG.receiverName}
               </div>
            </div>

            <div className="absolute -bottom-16 w-full text-center font-cute text-white/80 animate-bounce">
                Tap to Open
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-lg h-[80vh] bg-[#fdfbf7] rounded-lg shadow-2xl relative overflow-hidden flex flex-col"
          >
             {/* Paper Texture */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
            
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-rose-400 via-rose-600 to-rose-400 z-10"></div>

            <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
              <div className="mb-6 text-center">
                 <h2 className="font-cursive text-5xl text-rose-800 mb-2">My Dearest {APP_CONFIG.receiverName}</h2>
                 <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full"></div>
              </div>
              
              <div className="font-pen text-2xl leading-relaxed text-gray-800 whitespace-pre-wrap">
                {LETTER_CONTENT}
              </div>
              
              <div className="mt-8 mb-16 text-center opacity-50">
                   <div className="text-sm font-cute text-rose-400">Scroll to read more</div>
                   <ArrowRight className="mx-auto mt-2 rotate-90" size={20} />
              </div>
            </div>

            {/* Next Button Sticky Bottom */}
            <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-rose-100 z-20 flex justify-center">
                <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={onComplete}
                   className="bg-rose-600 text-white font-cute text-lg py-3 px-8 rounded-full shadow-lg hover:bg-rose-500 transition-colors flex items-center gap-2"
                >
                    One Last Surprise <ArrowRight size={18} />
                </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhaseLetter;