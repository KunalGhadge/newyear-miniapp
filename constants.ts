import { CardItem, MomentItem, QuestionItem } from './types';

// CENTRAL CONFIG - Change these values to customize the app
export const APP_CONFIG = {
  senderName: "Sharonraj",
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

// Updated with direct Postimages links provided by the user
export const MOMENT_ITEMS: MomentItem[] = [
  { 
    id: 1, 
    url: "https://i.postimg.cc/wjPkznfR/Whats-App-Image-2025-12-31-at-11-11-53-PM.jpg", 
    caption: "My Angel" 
  },
  { 
    id: 2, 
    url: "https://i.postimg.cc/4yJ6wGyd/Whats-App-Image-2025-12-31-at-11-11-53-PM-(2).jpg", 
    caption: "Infinite Love" 
  },
  { 
    id: 3, 
    url: "https://i.postimg.cc/DZcsSN6F/Whats-App-Image-2025-12-31-at-11-11-53-PM-(1).jpg", 
    caption: "Sweet Wishes" 
  },
  { 
    id: 4, 
    url: "https://i.postimg.cc/WpXgjQtt/Whats-App-Image-2025-12-31-at-11-11-54-PM.jpg", 
    caption: "My Future" 
  },
];

export const LETTER_CONTENT = `Hii, sweetuuu. 

Pata nhi kese Madam Ji se sweeeetuuu ban gaye aap. Ye 2 saal hamne sath bitaye kabhi laga hi nahi ki aap koi dusre ho, aaj jhagdte to dusre pal wapas wahi baato me kho jate he. 

Aaj bhi yaad he mujhe, kese mile the ham.. Wada kiya tha ki hamesha apke sath rahunga or protect karunga, bestfriend banaya tha na apne mujhe? 

Halaki protect aaj bhi kar rha hu lekin bestfriend banke nhi boyfriend banke.. Hope jo ham chahte he wo bhi ho jaye jaldi. 

Bas ye jo naya saal he yaha se ab as a boyfriend and girlfriend banke jeena he.

Your Sharonraj
I will always love you`;

export const SOUNDS = {
  bgm: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3", 
  pop: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3",
  success: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2434657193.mp3?filename=success-1-6297.mp3",
  magic: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_0344d99c43.mp3?filename=magic-wand-6224.mp3",
  click: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=pop-39222.mp3",
  swipe: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_34b07d67f7.mp3?filename=whoosh-6316.mp3",
  firework: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_822ca00d66.mp3?filename=fireworks-29629.mp3"
};