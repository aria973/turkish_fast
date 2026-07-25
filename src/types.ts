export type TabType = 'roadmap' | 'dictionary' | 'translator' | 'conversations' | 'receipt' | 'grammar' | 'flashcards';

export type VocabCategory =
  | 'transit'
  | 'university'
  | 'kimlik'
  | 'money'
  | 'navigation'
  | 'core'
  | 'greetings'
  | 'food'
  | 'emergency'
  | 'housing'
  | 'services';

export interface VocabItem {
  id: string;
  turkish: string;
  english: string;
  pronunciation: string;
  category: VocabCategory;
  grammarTip?: string;
  exampleSentence?: string;
  exampleEnglish?: string;
  essential?: boolean;
}

export type MasteryLevel = 0 | 1 | 2 | 3; // 0 new, 1 learning, 2 familiar, 3 mastered

export interface ProgressState {
  xp: number;
  streak: number;
  lastActiveDate: string;
  dailyDate: string;
  dailyXp: number;
  mastery: Record<string, MasteryLevel>;
  completed: string[]; // `${partId}:${sessionType}`
}

export type SessionType = 'learn' | 'quiz' | 'listen' | 'boss';

export interface PartDef {
  id: string;
  order: number;
  title: string;
  turkishTitle: string;
  subtitle: string;
  dayTag: string;
  emoji: string;
  color: string;
  itemIds: string[];
}

export interface DayLesson {
  day: 1 | 2 | 3;
  title: string;
  subtitle: string;
  timeEstimate: string;
  focus: string[];
  vocabulary: VocabItem[];
  survivalRules: {
    rule: string;
    explanation: string;
    example: string;
  }[];
  challenge: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DialogueLine {
  speaker: string;
  role: 'user' | 'official' | 'driver' | 'cashier' | 'staff' | 'stranger';
  turkish: string;
  english: string;
  pronunciation: string;
  grammarNote?: string;
}

export interface DialogueCategory {
  id: string;
  title: string;
  turkishTitle: string;
  icon: string;
  description: string;
  badge: string;
  color: string;
  dialogues: {
    id: string;
    title: string;
    scenario: string;
    lines: DialogueLine[];
    keyPhrases: { turkish: string; english: string; why: string }[];
  }[];
}

export interface ReceiptField {
  id: string;
  turkishTerm: string;
  literalEnglish: string;
  meaning: string;
  value: string;
  category: 'header' | 'item' | 'tax' | 'total' | 'payment' | 'footer';
  cashierDialogue?: string;
}

export interface TranslationResult {
  sourceText: string;
  sourceLang: 'en' | 'tr';
  translatedText: string;
  pronunciation: string;
  grammarBreakdown?: {
    root: string;
    suffixes: { part: string; meaning: string }[];
  };
  possibleResponses?: {
    turkish: string;
    english: string;
    howToReply: string;
  }[];
  contextTip?: string;
}

export interface GrammarTip {
  id: string;
  title: string;
  turkishHook: string;
  simpleExplanation: string;
  exampleTable: { turkish: string; english: string; formula: string }[];
  secretHack: string;
}

export interface MagicWord {
  word: string;
  literal: string;
  whenToUse: string;
  lifeSaverRating: number;
  example: string;
}
