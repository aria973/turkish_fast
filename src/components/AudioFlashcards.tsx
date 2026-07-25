import React, { useState } from 'react';
import { allVocabulary } from '../data/vocabulary';
import { hooksById } from '../data/memoryHooks';
import { triggerHaptic, playBeep } from '../utils/audio';
import { RefreshCcw, Check, X, Bookmark, Zap, ArrowRight, ArrowLeft, ScrollText } from 'lucide-react';

interface FlashcardsProps {
  soundEnabled: boolean;
  showTranscripts?: boolean;
  onGotIt?: (id: string) => void;
}

export const AudioFlashcards: React.FC<FlashcardsProps> = ({ soundEnabled, showTranscripts = true, onGotIt }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const filteredDeck = allVocabulary.filter(item => selectedCat === 'all' || item.category === selectedCat);
  const currentCard = filteredDeck[currentIndex] || filteredDeck[0];
  const cardHook = currentCard ? hooksById[currentCard.id] : undefined;

  const handleFlip = () => {
    triggerHaptic('light');
    if (soundEnabled) playBeep('flip');
    setIsFlipped(prev => !prev);
  };

  const handleNext = (mastered: boolean) => {
    triggerHaptic(mastered ? 'success' : 'medium');
    if (soundEnabled) playBeep(mastered ? 'success' : 'tap');

    if (mastered && currentCard && !masteredIds.includes(currentCard.id)) {
      setMasteredIds(prev => [...prev, currentCard.id]);
      if (onGotIt) onGotIt(currentCard.id);
    }

    setIsFlipped(false);
    if (currentIndex < filteredDeck.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    triggerHaptic('light');
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    } else {
      setCurrentIndex(filteredDeck.length - 1);
    }
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-3xl p-5 shadow-xl border border-red-500">
        <div className="flex items-center justify-between">
          <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" /> Touch Drills
          </span>
          <span className="text-xs font-semibold bg-black/20 px-2.5 py-1 rounded-full">
            {masteredIds.length} / {allVocabulary.length} Mastered
          </span>
        </div>
        <h1 className="text-xl font-extrabold mt-2 tracking-tight">
          Flashcards Deck
        </h1>
        <p className="text-xs text-white/90 mt-1 leading-relaxed">
          Tap the card to flip between English and Turkish with the read-aloud transcript. Read it out loud yourself — that is the exercise!
        </p>

        {/* Category Picker Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar mt-3 pt-3 border-t border-white/20">
          {[
            { id: 'all', label: '🌟 All Deck' },
            { id: 'transit', label: '🚌 Transit' },
            { id: 'university', label: '🎓 University' },
            { id: 'kimlik', label: '🏛️ Kimlik & Gov' },
            { id: 'money', label: '💵 Money' },
            { id: 'food', label: '🫖 Food' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => { triggerHaptic('medium'); setSelectedCat(cat.id); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
                selectedCat === cat.id ? 'bg-white text-red-600 shadow' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard */}
      {currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 px-2">
            <span>Card {currentIndex + 1} of {filteredDeck.length}</span>
            <span className="uppercase text-red-500 font-extrabold flex items-center gap-1">
              <Bookmark className="w-3 h-3 fill-red-500" /> {currentCard.category}
            </span>
          </div>

          <div
            onClick={handleFlip}
            className="w-full min-h-[280px] bg-white dark:bg-[#2c2c2e] p-6 rounded-[32px] shadow-xl border border-gray-200 dark:border-gray-800 cursor-pointer flex flex-col justify-between transition-transform active:scale-[0.97] relative overflow-hidden select-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                {isFlipped ? '🇹🇷 TURKISH + TRANSCRIPT' : '🇬🇧 ENGLISH (TAP TO FLIP)'}
              </span>
              <RefreshCcw className="w-4 h-4 text-gray-400" />
            </div>

            <div className="my-auto py-6 text-center space-y-3">
              {!isFlipped ? (
                <div className="animate-fadeIn">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                    "{currentCard.english}"
                  </h2>
                  <p className="text-xs text-red-500 font-semibold mt-4">
                    Tap to reveal the Turkish answer ↻
                  </p>
                </div>
              ) : (
                <div className="animate-fadeIn space-y-3">
                  <h2 className="tr-text text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 leading-snug">
                    {currentCard.turkish}
                  </h2>
                  {showTranscripts && (
                    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl px-3 py-2.5 mx-auto max-w-sm">
                      <p className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center justify-center gap-1 mb-1">
                        <ScrollText className="w-3.5 h-3.5" /> Read it out loud
                      </p>
                      <p className="transcript text-sm text-amber-900 dark:text-amber-200 font-bold">
                        {currentCard.pronunciation}
                      </p>
                    </div>
                  )}
                  {cardHook && (
                    <div className="bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/60 rounded-2xl px-3 py-2.5 mx-auto max-w-sm text-left">
                      <p className="text-[11px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300 mb-1">
                        🧠 Memory hook
                      </p>
                      <p className="text-xs font-extrabold text-gray-900 dark:text-white">{cardHook.soundsLike}</p>
                      <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed mt-0.5">{cardHook.image}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-center pt-3 border-t border-gray-100 dark:border-gray-800">
              {currentCard.grammarTip ? (
                <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                  💡 <strong>Tip:</strong> {currentCard.grammarTip}
                </p>
              ) : (
                <p className="text-[11px] text-gray-400">
                  Tap anywhere on the card to toggle side
                </p>
              )}
            </div>
          </div>

          {/* Controls bar */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => handleNext(false)}
              className="py-3.5 px-3 bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold text-xs rounded-2xl border border-rose-300 dark:border-rose-800 shadow hover:bg-rose-200 flex flex-col items-center justify-center gap-1 active:scale-95"
            >
              <X className="w-5 h-5 text-rose-600" />
              <span>Needs Review</span>
            </button>

            <button
              onClick={handleFlip}
              className="py-3.5 px-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-extrabold text-xs rounded-2xl shadow flex flex-col items-center justify-center gap-1 hover:bg-gray-300 active:scale-95"
            >
              <RefreshCcw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={() => handleNext(true)}
              className="py-3.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl shadow-md flex flex-col items-center justify-center gap-1 active:scale-95"
            >
              <Check className="w-5 h-5 text-white stroke-[3]" />
              <span>Got It! ⭐</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 px-1">
            <button
              onClick={handlePrev}
              className="text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1 hover:text-red-500"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Card
            </button>
            <button
              onClick={() => handleNext(false)}
              className="text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1 hover:text-red-500"
            >
              Next Card <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-sm font-bold text-gray-500">
          No flashcards in this deck yet! Try selecting "All Deck".
        </div>
      )}
    </div>
  );
};
