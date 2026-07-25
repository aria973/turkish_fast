import React, { useState } from 'react';
import { TabType, PartDef, SessionType, MasteryLevel } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { CourseMap } from './components/CourseMap';
import { SessionPlayer } from './components/SessionPlayer';
import { VoiceTranslator } from './components/VoiceTranslator';
import { ConversationsHub } from './components/ConversationsHub';
import { ReceiptReader } from './components/ReceiptReader';
import { GrammarAndTips } from './components/GrammarAndTips';
import { AudioFlashcards } from './components/AudioFlashcards';
import { useProgress } from './hooks/useProgress';

interface ActiveSession {
  part: PartDef;
  type: SessionType;
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('roadmap');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [iPhoneFrame, setIPhoneFrame] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);

  const progress = useProgress();

  const handleSessionComplete = (xp: number, updates: { id: string; level: MasteryLevel }[], passed: boolean) => {
    if (passed && activeSession) {
      progress.completeSession(activeSession.part.id, activeSession.type);
    }
    if (xp > 0 && passed) {
      progress.addXp(xp);
    }
    updates.forEach(u => progress.setMastery(u.id, u.level));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'roadmap':
        return (
          <CourseMap
            progress={progress}
            soundEnabled={soundEnabled}
            onOpenSession={(part, type) => setActiveSession({ part, type })}
          />
        );
      case 'translator':
        return <VoiceTranslator soundEnabled={soundEnabled} />;
      case 'conversations':
        return <ConversationsHub soundEnabled={soundEnabled} />;
      case 'receipt':
        return <ReceiptReader soundEnabled={soundEnabled} />;
      case 'grammar':
        return <GrammarAndTips soundEnabled={soundEnabled} />;
      case 'flashcards':
        return (
          <AudioFlashcards
            soundEnabled={soundEnabled}
            onGotIt={(id) => progress.setMastery(id, 2)}
          />
        );
      default:
        return null;
    }
  };

  const mainContent = (
    <div className="min-h-screen bg-[#f2f2f7] dark:bg-[#1c1c1e] text-[#1c1c1e] dark:text-gray-100 flex flex-col relative w-full overflow-x-hidden selection:bg-red-500 selection:text-white transition-colors duration-200">
      <Header
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        iPhoneFrame={iPhoneFrame}
        setIPhoneFrame={setIPhoneFrame}
      />

      <main className="flex-1 w-full relative">
        {renderActiveTab()}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} soundEnabled={soundEnabled} />

      {activeSession && (
        <SessionPlayer
          part={activeSession.part}
          type={activeSession.type}
          soundEnabled={soundEnabled}
          onExit={() => setActiveSession(null)}
          onComplete={handleSessionComplete}
        />
      )}
    </div>
  );

  if (iPhoneFrame) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-gray-900 to-black p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="mb-4 text-center text-white space-y-1">
          <span className="bg-red-600/90 text-white font-extrabold px-3 py-1 rounded-full text-xs tracking-wide shadow-md inline-flex items-center gap-1.5">
            📱 iPhone 16 Pro Titanium Simulation Active
          </span>
          <p className="text-xs text-gray-400 font-medium">
            Click the smartphone icon in the header above to switch to full standard responsive web view.
          </p>
        </div>

        <div className="w-[412px] h-[860px] bg-[#222327] rounded-[58px] p-[14px] shadow-2xl border-4 border-[#3e3e42] relative ring-1 ring-white/10 overflow-hidden flex flex-col">
          <div className="absolute left-0 top-[180px] -ml-2 w-1.5 h-12 bg-[#3e3e42] rounded-l-md" />
          <div className="absolute left-0 top-[240px] -ml-2 w-1.5 h-12 bg-[#3e3e42] rounded-l-md" />
          <div className="absolute right-0 top-[200px] -mr-2 w-1.5 h-16 bg-[#3e3e42] rounded-r-md" />

          <div className="w-full h-full rounded-[46px] overflow-y-auto overflow-x-hidden no-scrollbar bg-[#f2f2f7] dark:bg-[#1c1c1e] relative flex flex-col">
            {mainContent}
          </div>

          <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full pointer-events-none z-[80]" />
        </div>
      </div>
    );
  }

  return mainContent;
};

export default App;
