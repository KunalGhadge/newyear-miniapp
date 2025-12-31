import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { AppPhase } from './types';
import { SOUNDS } from './constants';
import Background from './components/Background';
import PhaseIntro from './components/PhaseIntro';
import PhaseCards from './components/PhaseCards';
import PhaseTicket from './components/PhaseTicket';
import PhaseMoments from './components/PhaseMoments';
import PhaseQuestions from './components/PhaseQuestions';
import PhaseLetter from './components/PhaseLetter';
import PhaseFinale from './components/PhaseFinale';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INTRO);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio
    audioRef.current = new Audio(SOUNDS.bgm);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle visibility change (pause on tab switch/minimize)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      if (document.hidden) {
        audioRef.current.pause();
      } else {
        // Only resume if not locally muted
        if (!isMuted) {
          audioRef.current.play().catch(() => {
            // Auto-play might be blocked if no interaction yet, which is fine
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMuted]);

  const playSound = (type: string) => {
    if (isMuted) return;
    
    // Play BGM on first interaction
    if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
    }

    let src = '';
    // @ts-ignore
    src = SOUNDS[type] || SOUNDS.pop;
    
    const sfx = new Audio(src);
    sfx.volume = 0.6;
    sfx.play().catch(() => {}); 
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const handlePhaseComplete = (nextPhase: AppPhase) => {
    setPhase(nextPhase);
  };

  return (
    <div className="relative w-full h-[100dvh] text-white overflow-hidden bg-[#050505] selection:bg-rose-500 selection:text-white">
      <Background />

      <button 
        onClick={toggleMute}
        className="absolute top-4 right-4 z-50 p-3 bg-white/5 backdrop-blur-md rounded-full text-white/60 hover:text-white hover:bg-white/10 transition border border-white/10"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <AnimatePresence mode="wait">
        {phase === AppPhase.INTRO && (
          <motion.div 
            key="intro"
            className="w-full h-full absolute inset-0"
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
          >
            <PhaseIntro 
              onComplete={() => handlePhaseComplete(AppPhase.CARDS)} 
              playSound={playSound} 
            />
          </motion.div>
        )}

        {phase === AppPhase.CARDS && (
          <motion.div 
            key="cards"
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: -window.innerWidth, opacity: 0, rotate: -5 }}
            transition={{ duration: 0.8 }}
          >
            <PhaseCards 
              onComplete={() => handlePhaseComplete(AppPhase.TICKET)} 
              playSound={playSound}
            />
          </motion.div>
        )}

        {phase === AppPhase.TICKET && (
          <motion.div 
            key="ticket"
            className="w-full h-full absolute inset-0"
            initial={{ x: window.innerWidth, opacity: 0, rotate: 5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, filter: 'brightness(2)' }}
            transition={{ duration: 0.8 }}
          >
            <PhaseTicket 
              onComplete={() => handlePhaseComplete(AppPhase.MOMENTS)} 
              playSound={playSound}
            />
          </motion.div>
        )}

        {phase === AppPhase.MOMENTS && (
          <motion.div 
            key="moments"
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <PhaseMoments 
              onComplete={() => handlePhaseComplete(AppPhase.QUESTIONS)} 
              playSound={playSound}
            />
          </motion.div>
        )}

        {phase === AppPhase.QUESTIONS && (
          <motion.div 
            key="questions"
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <PhaseQuestions 
              onComplete={() => handlePhaseComplete(AppPhase.LETTER)} 
              playSound={playSound}
            />
          </motion.div>
        )}

        {phase === AppPhase.LETTER && (
          <motion.div 
            key="letter"
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, type: "spring", damping: 20 }}
          >
            <PhaseLetter 
                onComplete={() => handlePhaseComplete(AppPhase.FINALE)} 
                playSound={playSound} 
            />
          </motion.div>
        )}

        {phase === AppPhase.FINALE && (
          <motion.div 
            key="finale"
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <PhaseFinale playSound={playSound} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;