import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Fingerprint, Heart } from 'lucide-react';
import { APP_CONFIG } from '../constants';

interface PhaseIntroProps {
  onComplete: () => void;
  playSound: (type: 'pop' | 'success' | 'magic') => void;
}

const PhaseIntro: React.FC<PhaseIntroProps> = ({ onComplete, playSound }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const controls = useAnimation();
  const completedRef = useRef(false);

  // Monitor progress changes to trigger completion reliably
  useEffect(() => {
    if (progress >= 100 && !completedRef.current) {
      completedRef.current = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      playSound('success');
      
      // Short delay for visual feedback before switching
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [progress, onComplete, playSound]);

  const startFilling = useCallback(() => {
    if (completedRef.current) return;

    setIsHolding(true);
    controls.start({ scale: 1.1 });
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2; // Fill speed
      });
    }, 16);
  }, [controls]);

  const stopFilling = useCallback(() => {
    // If we are already done or just hit 100, do NOT drain
    if (completedRef.current || progress >= 100) return;

    setIsHolding(false);
    controls.start({ scale: 1 });
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 5; // Drain speed
      });
    }, 16);
  }, [controls, progress]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-20 px-6 text-center select-none">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 relative"
      >
        <div className="absolute -inset-10 bg-rose-500/10 blur-2xl rounded-full transform-gpu" />
        <h1 className="font-cute text-5xl md:text-6xl text-rose-100 mb-4 relative z-10 drop-shadow-lg will-change-transform">
          For {APP_CONFIG.receiverName}
        </h1>
        <p className="font-pen text-3xl text-rose-200/90 relative z-10 will-change-transform">
          From {APP_CONFIG.senderName} ❤️
        </p>
      </motion.div>

      <div className="relative w-40 h-40 flex items-center justify-center rounded-full">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-rose-600/20 rounded-full blur-xl transform-gpu"
        />

        <div 
          className="relative w-full h-full flex items-center justify-center cursor-pointer touch-none rounded-full overflow-hidden transform-gpu"
          onPointerDown={startFilling}
          onPointerUp={stopFilling}
          onPointerLeave={stopFilling}
          onTouchStart={(e) => { e.preventDefault(); startFilling(); }}
          onTouchEnd={stopFilling}
          onContextMenu={(e) => e.preventDefault()}
          style={{ WebkitTapHighlightColor: 'transparent', borderRadius: '50%' }}
        >
          <svg className="absolute w-full h-full transform -rotate-90 drop-shadow-2xl rounded-full will-change-transform">
            <circle
              cx="80"
              cy="80"
              r="74"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              fill="rgba(0,0,0,0.3)"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="74"
              stroke="#fb7185"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray="465"
              strokeDashoffset={465 - (465 * progress) / 100}
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]"
              style={{ willChange: 'stroke-dashoffset' } as any}
            />
          </svg>

          <motion.div animate={controls} className="text-rose-300 relative z-10">
            {isHolding || completedRef.current ? (
              <Heart size={64} fill="#fb7185" className="animate-pulse" />
            ) : (
              <Fingerprint size={64} strokeWidth={1.5} />
            )}
          </motion.div>
        </div>
      </div>

      <motion.div className="mt-12 h-8">
        <p className={`font-cute tracking-widest transition-colors duration-300 ${isHolding || completedRef.current ? 'text-rose-300' : 'text-white/40'}`}>
          {completedRef.current ? 'ACCESS GRANTED' : (isHolding ? 'SCANNING LOVE...' : 'HOLD TO BEGIN')}
        </p>
      </motion.div>
    </div>
  );
};

export default PhaseIntro;