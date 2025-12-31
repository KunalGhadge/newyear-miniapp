import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhaseTicketProps {
  onComplete: () => void;
  playSound: (type: 'pop' | 'success' | 'magic') => void;
}

const PhaseTicket: React.FC<PhaseTicketProps> = ({ onComplete, playSound }) => {
  const handleClaim = () => {
    playSound('magic');
    
    // Gold confetti shower
    const end = Date.now() + 1500;
    const colors = ['#FFD700', '#FDB931', '#FFFFE0'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(onComplete, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 relative z-10 perspective-1000">
      <motion.div
        initial={{ rotateX: 90, opacity: 0, scale: 0.5 }}
        animate={{ rotateX: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 60 }}
        className="relative w-full max-w-sm aspect-[1.9/1] rounded-xl shadow-2xl transform-style-3d group cursor-pointer"
        whileHover={{ rotateX: 10, rotateY: 10, scale: 1.02 }}
      >
        {/* Ticket Body with Gold Foil Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] p-[2px] shadow-[0_20px_50px_rgba(234,179,8,0.3)]">
           <div className="w-full h-full bg-black/80 backdrop-blur-sm rounded-lg border border-yellow-500/30 flex flex-col items-center justify-center relative overflow-hidden">
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-yellow-400/50"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-yellow-400/50"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-yellow-400/50"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-yellow-400/50"></div>

              <div className="flex items-center gap-3 mb-2">
                 <Sparkles className="text-yellow-300 animate-pulse" size={20} />
                 <span className="text-yellow-100/60 text-xs tracking-[0.3em] uppercase">Special Admission</span>
                 <Sparkles className="text-yellow-300 animate-pulse" size={20} />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 font-bold tracking-widest uppercase text-center drop-shadow-sm">
                Golden Ticket
              </h2>
              
              <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-3"></div>
              
              <p className="text-yellow-100 font-serif italic text-lg">"Unlimited Hugs & Love"</p>
              
              <div className="absolute bottom-3 text-[10px] text-yellow-500/50 font-mono tracking-widest">
                 ID: SHARU-LOVES-GAYATRI-2024
              </div>
           </div>
        </div>

        {/* Perforations */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 w-6 h-6 bg-[#050505] rounded-full shadow-inner"></div>
        <div className="absolute right-0 top-1/2 translate-x-1/2 w-6 h-6 bg-[#050505] rounded-full shadow-inner"></div>
      </motion.div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClaim}
        className="mt-16 bg-white text-black px-12 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2 hover:bg-gray-100 transition-colors"
      >
        Claim Ticket <ArrowRight size={20} />
      </motion.button>
    </div>
  );
};

export default PhaseTicket;