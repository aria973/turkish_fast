import { PartDef, SessionType, VocabItem } from '../types';
import { allVocabulary } from './vocabulary';

export const courseParts: PartDef[] = [
  {
    id: 'part-1',
    order: 1,
    title: 'Core Survival & Greetings',
    turkishTitle: 'Temel Hayatta Kalma',
    subtitle: 'The politeness codes that unlock every Turkish door.',
    dayTag: 'Day 1',
    emoji: '👋',
    color: 'from-red-500 to-rose-600',
    itemIds: ['core-1', 'core-2', 'core-3', 'grt-1', 'grt-2', 'grt-3', 'grt-4'],
  },
  {
    id: 'part-2',
    order: 2,
    title: 'Streets & Navigation',
    turkishTitle: 'Sokakta Yön Bulma',
    subtitle: 'Ask directions, find pharmacies and hospitals fast.',
    dayTag: 'Day 1',
    emoji: '🧭',
    color: 'from-cyan-500 to-blue-600',
    itemIds: ['nav-1', 'nav-2', 'nav-3', 'emg-2', 'grt-5', 'grt-6'],
  },
  {
    id: 'part-3',
    order: 3,
    title: 'Transit Mastery',
    turkishTitle: 'Ulaşım Ustalığı',
    subtitle: 'Dolmuş ceremonies, taxis, metros and Istanbulkart.',
    dayTag: 'Day 2',
    emoji: '🚌',
    color: 'from-amber-500 to-orange-600',
    itemIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6'],
  },
  {
    id: 'part-4',
    order: 4,
    title: 'Money, Cash & Receipts',
    turkishTitle: 'Para ve Fiş Okuma',
    subtitle: 'Pay like a local, read the fiş, defend your change.',
    dayTag: 'Day 2',
    emoji: '💵',
    color: 'from-emerald-500 to-teal-600',
    itemIds: ['mon-1', 'mon-2', 'mon-3', 'mon-4', 'mon-5', 'mon-6'],
  },
  {
    id: 'part-5',
    order: 5,
    title: 'Food & Café Talk',
    turkishTitle: 'Yemek ve Kafe',
    subtitle: 'Order çay, compliment the chef, split the bill.',
    dayTag: 'Day 2 • Evening',
    emoji: '🫖',
    color: 'from-rose-500 to-pink-600',
    itemIds: ['food-1', 'food-2', 'food-3', 'food-4', 'food-5', 'food-6'],
  },
  {
    id: 'part-6',
    order: 6,
    title: 'University Enrollment',
    turkishTitle: 'Üniversite Kaydı',
    subtitle: 'Öğrenci İşleri, certificates, advisors and dorms.',
    dayTag: 'Day 3',
    emoji: '🎓',
    color: 'from-indigo-500 to-violet-600',
    itemIds: ['uni-1', 'uni-2', 'uni-3', 'uni-4', 'uni-5', 'uni-6'],
  },
  {
    id: 'part-7',
    order: 7,
    title: 'Kimlik & Göç İdaresi',
    turkishTitle: 'İkamet ve Bürokrasi',
    subtitle: 'Residence permits, fingerprints and document defense.',
    dayTag: 'Day 3',
    emoji: '🏛️',
    color: 'from-red-600 to-red-800',
    itemIds: ['kim-1', 'kim-2', 'kim-3', 'kim-4', 'kim-5', 'kim-6'],
  },
  {
    id: 'part-8',
    order: 8,
    title: 'Emergency SOS',
    turkishTitle: 'Acil Durum',
    subtitle: 'Hospital, ambulance, police and allergy phrases.',
    dayTag: 'Bonus',
    emoji: '🚨',
    color: 'from-orange-600 to-red-700',
    itemIds: ['emg-1', 'emg-2', 'emg-3', 'emg-4', 'emg-5', 'emg-6'],
  },
  {
    id: 'part-9',
    order: 9,
    title: 'Life Admin: SIM, Bank, Rent',
    turkishTitle: 'Günlük İşler',
    subtitle: 'SIM cards, bank accounts, PTT and renting a flat.',
    dayTag: 'Bonus',
    emoji: '📱',
    color: 'from-slate-500 to-slate-700',
    itemIds: ['svc-1', 'svc-2', 'svc-3', 'svc-4', 'svc-5', 'hou-1', 'hou-2', 'hou-3', 'hou-4', 'hou-5'],
  },
];

export const sessionMeta: Record<SessionType, {
  name: string;
  icon: string;
  xpBonus: number;
  desc: string;
}> = {
  learn: { name: 'Learn', icon: '📖', xpBonus: 10, desc: 'Flip cards & self-grade' },
  quiz: { name: 'Quiz', icon: '🎯', xpBonus: 20, desc: 'Pick the right Turkish' },
  listen: { name: 'Read', icon: '👀', xpBonus: 20, desc: 'Read Turkish, match the meaning' },
  boss: { name: 'Boss', icon: '👑', xpBonus: 30, desc: 'Mixed challenge + word builder' },
};

export const sessionOrder: SessionType[] = ['learn', 'quiz', 'listen', 'boss'];

export const getPartItems = (part: PartDef): VocabItem[] =>
  part.itemIds
    .map(id => allVocabulary.find(v => v.id === id))
    .filter((v): v is VocabItem => Boolean(v));

export const DAILY_GOAL_XP = 60;

export const threeDayTrack = [
  { day: 'Day 1', label: 'Survival & Streets', parts: 'Parts 1–2', focus: 'Politeness codes + navigation' },
  { day: 'Day 2', label: 'Transit, Money & Food', parts: 'Parts 3–5', focus: 'Dolmuş, receipts, ordering' },
  { day: 'Day 3', label: 'University & Kimlik', parts: 'Parts 6–7', focus: 'Enrollment + Göç İdaresi' },
];
