import { CardItem, MomentItem, QuestionItem } from './types';

// CENTRAL CONFIG - Change these values to customize the app
export const APP_CONFIG = {
  senderName: "Sharu",
  receiverName: "Gayatri",
  year: "2026",
  ticketId: "SHARU-LOVES-GAYATRI-FOREVER",
};

export const QUESTIONS: QuestionItem[] = [
  { id: 1, question: "Are you ready to see what's inside?", yesText: "Yes!", noText: "No" },
  { id: 2, question: "Do you think I'm annoying sometimes?", yesText: "Maybe a little...", noText: "Never!" },
  { id: 3, question: "But you still like me, right?", yesText: "Obviously!", noText: "Nope" },
  { id: 4, question: "Promise to keep smiling?", yesText: "I Promise", noText: "Can't" },
];

export const CARD_ITEMS: CardItem[] = [
  { id: 1, text: "Your smile is my daily dose of sunshine.", emoji: "☀️", color: "bg-gradient-to-br from-orange-100 to-amber-200" },
  { id: 2, text: "You make even boring days feel special.", emoji: "✨", color: "bg-gradient-to-br from-rose-100 to-pink-200" },
  { id: 3, text: "I love the way you look at the world.", emoji: "🌏", color: "bg-gradient-to-br from-blue-100 to-sky-200" },
  { id: 4, text: "You are my favorite distraction.", emoji: "💭", color: "bg-gradient-to-br from-violet-100 to-purple-200" },
  { id: 5, text: "Just being near you makes me happy.", emoji: "🥰", color: "bg-gradient-to-br from-emerald-100 to-green-200" },
];

export const MOMENT_ITEMS: MomentItem[] = [
  { id: 1, url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&q=80", caption: "Our Dreams" },
  { id: 2, url: "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=500&q=80", caption: "Infinite Hope" },
  { id: 3, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80", caption: "Love Letters" },
  { id: 4, url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80", caption: "Future Us" },
];

export const LETTER_CONTENT = `My Dearest ${APP_CONFIG.receiverName},

As I sit down to write this, my heart is overflowing with emotions that words can barely capture. From the moment you walked into my life, everything changed in the most beautiful way possible.

You are not just my love; you are my best friend, my confidant, and my greatest supporter. Every day with you feels like a new adventure, a new reason to smile.

I wanted to make this little experience to show you just a fraction of how much you mean to me. Thank you for being you. Thank you for choosing me.

Here's to us, to our memories, and to a future filled with endless love and laughter.

Forever yours,
${APP_CONFIG.senderName} ❤️`;

export const SOUNDS = {
  bgm: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3", 
  pop: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3",
  success: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2434657193.mp3?filename=success-1-6297.mp3",
  magic: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_0344d99c43.mp3?filename=magic-wand-6224.mp3",
  click: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3",
  swipe: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_34b07d67f7.mp3?filename=whoosh-6316.mp3",
  firework: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_822ca00d66.mp3?filename=fireworks-29629.mp3"
};