import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../constants';
import confetti from 'canvas-confetti';

interface PhaseQuestionsProps {
  onComplete: () => void;
  playSound: (type: 'pop' | 'success') => void;
}

const PhaseQuestions: React.FC<PhaseQuestionsProps> = ({ onComplete, playSound }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [teaseEmoji, setTeaseEmoji] = useState<string | null>(null);

  const currentQ = QUESTIONS[currentIndex];
  const teases = ["😜", "🙈", "🏃‍♂️", "😂", "👻", "😈"];

  const handleYes = () => {
    playSound('success');
    
    // Heart Confetti
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['heart'],
      colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585']
    };
    
    // @ts-ignore
    confetti({ ...defaults, particleCount: 30, scalar: 2 });
    // @ts-ignore
    confetti({ ...defaults, particleCount: 15, scalar: 3 });

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setNoButtonPos({ x: 0, y: 0 }); 
      setTeaseEmoji(null);
    } else {
      setTimeout(onComplete, 500);
    }
  };

  const moveNoButton = (e?: React.SyntheticEvent) => {
    // Prevent default click behavior to avoid "clicking" the button on mobile/touch
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    playSound('pop');
    
    // Move to a random position
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
    
    // Show random tease emoji
    setTeaseEmoji(teases[Math.floor(Math.random() * teases.length)]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 relative z-10 select-none">
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl max-w-sm w-full text-center relative transform-gpu"
      >
        <h2 className="text-3xl font-cute mb-8 text-white drop-shadow-md">{currentQ.question}</h2>
        
        <div className="flex flex-col gap-4 items-center relative h-32 justify-center">
            {/* YES Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="bg-green-500 hover:bg-green-400 text-white font-cute text-xl py-3 px-12 rounded-full shadow-lg shadow-green-500/30 z-20"
            >
                {currentQ.yesText} 💖
            </motion.button>

            {/* NO Button - Moves on Hover, Touch, and Click */}
            <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton} // Immediate response on touch
                onPointerDown={moveNoButton} // Catch-all for pointer events
                onClick={moveNoButton} // Fallback
                className="bg-rose-500 hover:bg-rose-400 text-white font-cute text-sm py-2 px-6 rounded-full shadow-lg opacity-80 z-10 absolute bottom-0 select-none touch-manipulation transform-gpu"
                style={{ WebkitTapHighlightColor: 'transparent' } as any}
            >
                {currentQ.noText}
            </motion.button>
            
            {/* Teasing Emoji Popup */}
            <AnimatePresence>
                {teaseEmoji && (
                    <motion.div
                        key={Date.now()} // Force re-render
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: 1, y: -40, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-10 text-4xl pointer-events-none z-30"
                    >
                        {teaseEmoji}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PhaseQuestions;