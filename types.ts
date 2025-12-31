export enum AppPhase {
  INTRO = 'INTRO',
  CARDS = 'CARDS',
  TICKET = 'TICKET',
  MOMENTS = 'MOMENTS',
  QUESTIONS = 'QUESTIONS',
  LETTER = 'LETTER',
  FINALE = 'FINALE',
}

export interface CardItem {
  id: number;
  text: string;
  emoji: string;
  color: string;
}

export interface MomentItem {
  id: number;
  url: string;
  caption: string;
}

export interface QuestionItem {
  id: number;
  question: string;
  yesText: string;
  noText: string;
}