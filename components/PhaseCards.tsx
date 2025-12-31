import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Gift, Star } from 'lucide-react';
import { CARD_ITEMS } from '../constants';
import confetti from 'canvas-confetti';

interface PhaseCardsProps {
  onComplete: () => void;
  playSound: (type: 'pop' | 'success' | 'swipe') => void;
}

const PhaseCards: React.FC<PhaseCardsProps> = ({ onComplete, playSound }) => {
  const [cards, setCards] = useState(CARD_ITEMS);
  const [showGift, setShowGift] = useState(false);

  const removeCard = (id: number) => {
    playSound('swipe');
    setCards((prev) => prev.filter((item) => item.id !== id));
    if (cards.length <= 1) {
      setTimeout(() => setShowGift(true), 600);
    }
  };

  const handleDragEnd = (info: PanInfo, id: number) => {
    const threshold = 100;
    if (info.offset.x > threshold || info.offset.x < -threshold) {
      removeCard(id);
    }
  };

  const handleGiftClick = () => {
    playSound('success');
    
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    function fire(particleRatio: number, opts: any) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    setTimeout(onComplete, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-10 px-4 overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-12 text-center w-full z-20"
      >
        <h2 className="text-4xl font-cute text-white mb-2 drop-shadow-md">Why I Adore You</h2>
        <p className="text-rose-200/80 font-pen text-xl tracking-wide">Swipe cards to see magic</p>
      </motion.div>

      <div className="relative w-full max-w-xs aspect-[3/4] flex items-center justify-center mt-4">
        <AnimatePresence>
          {cards.map((card, index) => {
            const isTop = index === cards.length - 1;
            return (
              <motion.div
                key={card.id}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.05}
                onDragEnd={(_, info) => isTop && handleDragEnd(info, card.id)}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ 
                  scale: 1 - (cards.length - 1 - index) * 0.05, 
                  y: (cards.length - 1 - index) * 15,
                  rotate: (cards.length - 1 - index) * (index % 2 === 0 ? 2 : -2),
                  opacity: 1 - (cards.length - 1 - index) * 0.1,
                  zIndex: index
                }}
                exit={{ x: Math.random() > 0.5 ? 500 : -500, rotate: 45, opacity: 0 }}
                whileTap={isTop ? { cursor: "grabbing" } : {}}
                className={`absolute w-full h-full rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border-4 border-white/50 backdrop-blur-md cursor-grab ${card.color} text-slate-800`}
                style={{ transformOrigin: "bottom center" }}
              >
                <div className="absolute top-4 right-4 opacity-40 text-white">
                    <Star size={32} fill="currentColor" />
                </div>
                <span className="text-8xl mb-8 drop-shadow-lg filter">{card.emoji}</span>
                <p className="text-3xl font-pen font-bold text-center leading-relaxed drop-shadow-sm text-slate-800">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="h-24 mt-8 flex items-center justify-center relative w-full">
          <AnimatePresence>
            {showGift && (
              <motion.button
                initial={{ scale: 0, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGiftClick}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-[0_0_30px_rgba(225,29,72,0.6)] flex items-center gap-3 overflow-hidden font-cute text-xl"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Gift size={28} className="animate-bounce" />
                <span className="tracking-wide">OPEN SURPRISE</span>
              </motion.button>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
};

export default PhaseCards;