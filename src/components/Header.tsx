import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Smartphone, Maximize2, Zap, Wifi, Battery, Signal } from 'lucide-react';
import { triggerHaptic, playBeep } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  iPhoneFrame: boolean;
  setIPhoneFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  setSoundEnabled,
  iPhoneFrame,
  setIPhoneFrame
}) => {
  const [time, setTime] = useState('09:41');
  const [islandMessage, setIslandMessage] = useState('🇹🇷 TurkSpeed iOS • Ready');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    triggerHaptic('light');
    setSoundEnabled(prev => !prev);
    setIslandMessage(!soundEnabled ? '🔔 UI sounds on' : '🔕 UI sounds muted');
    setTimeout(() => setIslandMessage('🇹🇷 TurkSpeed iOS • Ready'), 2500);
  };

  const handleToggleFrame = () => {
    triggerHaptic('heavy');
    if (soundEnabled) playBeep('flip');
    setIPhoneFrame(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-[#1c1c1e]/85 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200 pt-safe">
      {/* Authentic iOS top status bar */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-100 select-none">
        <span className="w-16 font-mono font-bold tracking-tight">{time}</span>
        
        {/* Dynamic Island Simulation */}
        <div className="bg-black text-white px-3.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-md border border-gray-800 transition-all duration-300 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="truncate max-w-[170px]">{islandMessage}</span>
        </div>

        <div className="w-16 flex items-center justify-end space-x-1.5 text-gray-700 dark:text-gray-300">
          <Signal className="w-3.5 h-3.5 fill-current" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current text-green-500" />
        </div>
      </div>

      {/* Control Navigation Strip */}
      <div className="px-3.5 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          {/* App logo — matches the Home Screen icon */}
          <span
            className="w-7 h-7 rounded-[9px] bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md ring-1 ring-white/20 shrink-0"
            title="TurkSpeed — offline PWA"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-white" fill="currentColor" aria-hidden="true">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z" />
              <path d="M18.9 3.2l.55 1.26 1.37.13-1.03.92.3 1.34-1.19-.7-1.19.7.3-1.34-1.03-.92 1.37-.13z" />
            </svg>
          </span>
          <span className="bg-red-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" /> iOS Edition
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-medium text-[11px] hidden sm:inline">
            Read-Aloud Transcript Mode · No fake accents
          </span>
        </div>

        {/* Action Toggle Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Sound / Haptic feedback toggle (UI beeps only, never speech) */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-full transition-colors ${
              soundEnabled
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
            }`}
            title="Toggle interaction sounds & haptics"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* iPhone Frame view Mode toggle for Desktop */}
          <button
            onClick={handleToggleFrame}
            className={`p-1.5 rounded-full transition-colors hidden md:flex items-center justify-center ${
              iPhoneFrame
                ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 border border-red-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
            title="Toggle between realistic iPhone 16 Frame or Responsive View"
          >
            {iPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
