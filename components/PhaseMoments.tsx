import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Heart } from 'lucide-react';
import { MOMENT_ITEMS } from '../constants';

interface PhaseMomentsProps {
  onComplete: () => void;
  playSound: (type: 'pop' | 'success' | 'click') => void;
}

const PhaseMoments: React.FC<PhaseMomentsProps> = ({ onComplete, playSound }) => {
  return (
    <div className="flex flex-col h-full w-full relative z-10 overflow-hidden bg-black/40">
      <div className="flex-1 overflow-y-auto p-6 pb-32 custom-scrollbar">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 pt-4"
        >
          <div className="inline-block p-2 rounded-full bg-rose-500/10 mb-2 border border-rose-500/30">
            <Heart size={20} className="text-rose-400" fill="currentColor" />
          </div>
          <h2 className="text-4xl font-serif text-white drop-shadow-lg">Our Moments</h2>
          <p className="text-white/60 text-sm mt-2 font-light tracking-wide">Snapshots of a beautiful journey</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 max-w-md mx-auto">
          {MOMENT_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 100, opacity: 0, rotate: index % 2 === 0 ? -5 : 5 }}
              whileInView={{ y: 0, opacity: 1, rotate: index % 2 === 0 ? -2 : 2 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-white/5 blur-xl transform scale-90 group-hover:scale-105 transition-transform"></div>
              <div className="bg-white p-4 pb-12 shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:rotate-0 hover:z-10 relative">
                <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-4 filter sepia-[0.2]">
                   <img 
                      src={item.url} 
                      alt={item.caption} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                   />
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center">
                   <p className="font-hand text-3xl text-gray-800 -rotate-2">{item.caption}</p>
                </div>
                {/* Tape Effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm transform -rotate-1 shadow-sm border border-white/40"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => {
            playSound('click');
            onComplete();
          }}
          className="group bg-rose-600 hover:bg-rose-500 text-white px-10 py-4 rounded-full flex items-center gap-3 font-semibold text-lg shadow-[0_0_25px_rgba(225,29,72,0.5)] transition-all"
        >
          Open Greeting Card <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
};

export default PhaseMoments;