import React from 'react';
import { TabType } from '../types';
import { Compass, Mic, MessageSquare, Receipt, Sparkles, Layers } from 'lucide-react';
import { triggerHaptic, playBeep } from '../utils/audio';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  soundEnabled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, soundEnabled }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'roadmap', label: 'Course', icon: <Compass className="w-5 h-5" />, badge: 'VIP' },
    { id: 'translator', label: 'Translate', icon: <Mic className="w-5 h-5" />, badge: 'Live' },
    { id: 'conversations', label: 'Dialogues', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'receipt', label: 'Fiş & Cash', icon: <Receipt className="w-5 h-5" /> },
    { id: 'grammar', label: 'Grammar', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'flashcards', label: 'Cards', icon: <Layers className="w-5 h-5" /> },
  ];

  const handleSelect = (id: TabType) => {
    if (activeTab !== id) {
      triggerHaptic('medium');
      if (soundEnabled) playBeep('tap');
      setActiveTab(id);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-red-600 dark:text-red-500 scale-105 font-bold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-normal'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[9px] font-black px-1 rounded-full uppercase tracking-tighter shadow">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight truncate max-w-[64px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
