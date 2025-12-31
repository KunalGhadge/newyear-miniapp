import React, { useMemo } from 'react';

const Background = React.memo(() => {
  // Generate static data for particles once to prevent re-calculations during renders
  const hearts = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 20, // 20-35s slow float
    size: Math.random() * 20 + 10,
    delay: -(Math.random() * 20), // Start at random times
    drift: (Math.random() - 0.5) * 150
  })), []);

  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
    size: Math.random() * 3 + 1
  })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505] transform-gpu">
        <style>{`
          @keyframes float-up {
            0% { transform: translate3d(0, 110vh, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.2; }
            90% { opacity: 0.2; }
            100% { transform: translate3d(var(--drift), -10vh, 0) rotate(360deg); opacity: 0; }
          }
          @keyframes pulse-glow {
            0%, 100% { transform: scale(1); opacity: 0.15; }
            50% { transform: scale(1.1); opacity: 0.25; }
          }
          @keyframes twinkle {
            0%, 100% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.5); opacity: 0.4; }
          }
          .animate-float { animation: float-up linear infinite; will-change: transform, opacity; }
          .animate-pulse-slow { animation: pulse-glow 8s ease-in-out infinite; will-change: transform, opacity; }
          .animate-pulse-slower { animation: pulse-glow 12s ease-in-out infinite; will-change: transform, opacity; }
          .animate-twinkle { animation: twinkle ease-in-out infinite; will-change: transform, opacity; }
        `}</style>

      {/* Deep Romantic Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#2d0b14] via-[#100205] to-[#000000]"></div>
      
      {/* Ambient Light Orbs - Optimized with hardware acceleration */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-rose-900/20 blur-[60px] rounded-full animate-pulse-slow transform-gpu translate-z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-pink-900/10 blur-[80px] rounded-full animate-pulse-slower transform-gpu translate-z-0" style={{ animationDelay: '2s' }} />

      {/* Floating Hearts - CSS Only */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-rose-500/10 animate-float top-0"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            '--drift': `${h.drift}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          } as React.CSSProperties}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Tiny Particles - CSS Only */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white/20 rounded-full animate-twinkle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      
      {/* Static Noise Overlay - Lightweight CSS pattern instead of heavy SVG filter */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </div>
  );
});

export default Background;