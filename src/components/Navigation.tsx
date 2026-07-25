import React, { useState } from 'react';
import { TabType } from '../types';
import { Compass, Mic, MessageSquare, Receipt, Sparkles, Layers, BookA, Grid2x2, X } from 'lucide-react';
import { triggerHaptic, playBeep } from '../utils/audio';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  soundEnabled: boolean;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  desc?: string;
}

const PRIMARY: NavItem[] = [
  { id: 'roadmap', label: 'Course', icon: <Compass className="w-[22px] h-[22px]" /> },
  { id: 'dictionary', label: 'Sözlük', icon: <BookA className="w-[22px] h-[22px]" />, badge: '3K+' },
  { id: 'translator', label: 'Translate', icon: <Mic className="w-[22px] h-[22px]" /> },
  { id: 'flashcards', label: 'Cards', icon: <Layers className="w-[22px] h-[22px]" /> },
];

const MORE_ITEMS: NavItem[] = [
  { id: 'conversations', label: 'Dialogues', icon: <MessageSquare className="w-5 h-5" />, desc: 'Real-life scripts + survivor roleplay' },
  { id: 'receipt', label: 'Fiş & Cash', icon: <Receipt className="w-5 h-5" />, desc: 'Read receipts, pay, count change' },
  { id: 'grammar', label: 'Grammar Hacks', icon: <Sparkles className="w-5 h-5" />, desc: 'Suffix LEGO, magic words, titles' },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, soundEnabled }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = MORE_ITEMS.some(m => m.id === activeTab);

  const handleSelect = (id: TabType) => {
    if (activeTab !== id) {
      triggerHaptic('medium');
      if (soundEnabled) playBeep('tap');
      setActiveTab(id);
    }
    setMoreOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* More sheet */}
      {moreOpen && (
        <div className="fixed inset-0 z-[75] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={() => setMoreOpen(false)} />
          <div className="relative w-full max-w-md bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-t-[28px] shadow-2xl animate-sheetUp pb-safe">
            <div className="pt-2.5 pb-1 flex justify-center">
              <span className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="px-5 pt-1 pb-3 flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">More Tools</h3>
              <button onClick={() => setMoreOpen(false)} className="p-2 bg-gray-200 dark:bg-[#38383a] rounded-full">
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="px-4 pb-6 space-y-2">
              {MORE_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                    activeTab === item.id
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'bg-white dark:bg-[#2c2c2e] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <span className={`p-2.5 rounded-xl shrink-0 ${activeTab === item.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-[#38383a] text-red-600'}`}>
                    {item.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold">{item.label}</span>
                    <span className={`block text-[11px] font-semibold truncate ${activeTab === item.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* iOS tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-[60] bg-white/85 dark:bg-[#1c1c1e]/85 backdrop-blur-2xl border-t border-gray-200/80 dark:border-gray-800/80 pb-safe">
        <div className="max-w-md mx-auto px-1 flex items-stretch justify-around">
          {PRIMARY.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-1.5 transition-all duration-200 active:scale-90 ${
                  isActive ? 'text-red-600 dark:text-red-500' : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <span className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-3 bg-red-600 text-white text-[8px] font-black px-1 py-px rounded-full shadow">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className={`text-[10px] tracking-tight ${isActive ? 'font-black' : 'font-semibold'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => { triggerHaptic('medium'); if (soundEnabled) playBeep('tap'); setMoreOpen(true); }}
            className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-1.5 transition-all active:scale-90 ${
              moreActive ? 'text-red-600 dark:text-red-500' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <Grid2x2 className="w-[22px] h-[22px]" />
            <span className={`text-[10px] tracking-tight ${moreActive ? 'font-black' : 'font-semibold'}`}>More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
