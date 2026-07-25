import React, { useState } from 'react';
import { TabType, PartDef, SessionType, MasteryLevel } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { CourseMap } from './components/CourseMap';
import { Dictionary } from './components/Dictionary';
import { SessionPlayer } from './components/SessionPlayer';
import { VoiceTranslator } from './components/VoiceTranslator';
import { ConversationsHub } from './components/ConversationsHub';
import { ReceiptReader } from './components/ReceiptReader';
import { GrammarAndTips } from './components/GrammarAndTips';
import { AudioFlashcards } from './components/AudioFlashcards';
import { SmartReview } from './components/SmartReview';
import { SettingsSheet } from './components/SettingsSheet';
import { useProgress } from './hooks/useProgress';
import { useSRS } from './hooks/useSRS';
import { useSettings } from './hooks/useSettings';

interface ActiveSession {
  part: PartDef;
  type: SessionType;
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('roadmap');
  const [iPhoneFrame, setIPhoneFrame] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const progress = useProgress();
  const srs = useSRS();
  const settings = useSettings();
  const soundEnabled = settings.soundEnabled;

  const handleSessionComplete = (
    xp: number,
    updates: { id: string; level: MasteryLevel }[],
    passed: boolean
  ) => {
    if (passed && activeSession) {
      progress.completeSession(activeSession.part.id, activeSession.type);
    }
    if (xp > 0 && passed) {
      progress.addXp(xp);
    }
    updates.forEach(u => {
      progress.setMastery(u.id, u.level);
      // Everything touched in a session enters the spaced-repetition schedule
      srs.schedule(u.id);
      if (u.level >= 2) srs.grade(u.id, true);
    });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'roadmap':
        return (
          <CourseMap
            progress={progress}
            srs={srs}
            soundEnabled={soundEnabled}
            onOpenSession={(part, type) => setActiveSession({ part, type })}
            onOpenReview={() => setReviewOpen(true)}
          />
        );
      case 'dictionary':
        return (
          <Dictionary
            soundEnabled={soundEnabled}
            onLearn={(id) => { progress.setMastery(id, 2); progress.addXp(2); srs.schedule(id); }}
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
            showTranscripts={settings.showTranscripts}
            onGotIt={(id) => { progress.setMastery(id, 2); srs.schedule(id); }}
          />
        );
      default:
        return null;
    }
  };

  const mainContent = (
    <div className="min-h-screen bg-[#f2f2f7] dark:bg-[#1c1c1e] text-[#1c1c1e] dark:text-gray-100 flex flex-col relative w-full overflow-x-hidden selection:bg-red-500 selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold"
      >
        Skip to main content
      </a>

      <Header
        soundEnabled={soundEnabled}
        iPhoneFrame={iPhoneFrame}
        setIPhoneFrame={setIPhoneFrame}
        onOpenSettings={() => setSettingsOpen(true)}
        dueCount={srs.dueCount}
        onOpenReview={() => setReviewOpen(true)}
      />

      <main id="main-content" className="flex-1 w-full relative">
        {renderActiveTab()}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} soundEnabled={soundEnabled} />

      {activeSession && (
        <SessionPlayer
          part={activeSession.part}
          type={activeSession.type}
          soundEnabled={soundEnabled}
          showTranscripts={settings.showTranscripts}
          onExit={() => setActiveSession(null)}
          onComplete={handleSessionComplete}
        />
      )}

      {reviewOpen && (
        <SmartReview
          srs={srs}
          soundEnabled={soundEnabled}
          showTranscripts={settings.showTranscripts}
          onExit={() => setReviewOpen(false)}
          onXp={(amount) => progress.addXp(amount)}
        />
      )}

      {settingsOpen && (
        <SettingsSheet
          settings={settings}
          onClose={() => setSettingsOpen(false)}
          srsInfo={{ tracked: srs.trackedCount, strong: srs.strongCount, onReset: srs.resetSRS }}
        />
      )}
    </div>
  );

  if (iPhoneFrame) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-gray-900 to-black p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="mb-4 text-center text-white space-y-1">
          <span className="bg-red-600/90 text-white font-extrabold px-3 py-1 rounded-full text-xs tracking-wide shadow-md inline-flex items-center gap-1.5">
            📱 iPhone 16 Pro Preview
          </span>
          <p className="text-xs text-gray-400 font-medium">
            Tap the phone icon in the header to return to the full responsive view.
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
