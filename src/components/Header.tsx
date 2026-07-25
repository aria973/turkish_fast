import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Wifi, Battery, Signal, Settings2, Brain } from 'lucide-react';
import { triggerHaptic, playBeep } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  iPhoneFrame: boolean;
  setIPhoneFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenSettings: () => void;
  dueCount: number;
  onOpenReview: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  iPhoneFrame,
  setIPhoneFrame,
  onOpenSettings,
  dueCount,
  onOpenReview,
}) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleFrame = () => {
    triggerHaptic('heavy');
    if (soundEnabled) playBeep('flip');
    setIPhoneFrame(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-[#1c1c1e]/85 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 pt-safe">
      {/* iOS status bar */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-100 select-none">
        <span className="w-16 font-mono tracking-tight">{time}</span>
        <div className="bg-black text-white px-3.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>TurkSpeed</span>
        </div>
        <div className="w-16 flex items-center justify-end gap-1.5 text-gray-700 dark:text-gray-300">
          <Signal className="w-3.5 h-3.5 fill-current" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current text-green-500" />
        </div>
      </div>

      {/* Control strip */}
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md ring-1 ring-white/20 shrink-0"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z" />
              <path d="M18.9 3.2l.55 1.26 1.37.13-1.03.92.3 1.34-1.19-.7-1.19.7.3-1.34-1.03-.92 1.37-.13z" />
            </svg>
          </span>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 truncate hidden xs:inline sm:inline">
            Offline · transcript mode
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Smart Review with due badge */}
          <button
            onClick={() => { triggerHaptic('medium'); if (soundEnabled) playBeep('tap'); onOpenReview(); }}
            aria-label={`Open smart review${dueCount > 0 ? `, ${dueCount} cards due` : ''}`}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl font-black text-xs transition-colors tap-target ${
              dueCount > 0
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-[#38383a] text-gray-600 dark:text-gray-300'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Review</span>
            {dueCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow ring-2 ring-white dark:ring-[#1c1c1e]">
                {dueCount > 99 ? '99+' : dueCount}
              </span>
            )}
          </button>

          <button
            onClick={handleToggleFrame}
            aria-label="Toggle iPhone frame preview"
            className={`p-2 rounded-xl transition-colors hidden md:flex items-center justify-center tap-target ${
              iPhoneFrame
                ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
                : 'bg-gray-100 dark:bg-[#38383a] text-gray-700 dark:text-gray-300'
            }`}
          >
            {iPhoneFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          <button
            onClick={() => { triggerHaptic('light'); if (soundEnabled) playBeep('tap'); onOpenSettings(); }}
            aria-label="Open display and accessibility settings"
            className="p-2 rounded-xl bg-gray-100 dark:bg-[#38383a] text-gray-700 dark:text-gray-300 tap-target flex items-center justify-center"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
