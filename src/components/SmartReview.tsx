import React, { useMemo, useState } from 'react';
import { allVocabulary } from '../data/vocabulary';
import { hooksById } from '../data/memoryHooks';
import { SRSApi, BOX_LABELS } from '../hooks/useSRS';
import { triggerHaptic, playBeep } from '../utils/audio';
import { X, Brain, Check, RotateCcw, Eye, Sparkles, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartReviewProps {
  srs: SRSApi;
  soundEnabled: boolean;
  showTranscripts: boolean;
  onExit: () => void;
  onXp: (amount: number) => void;
}

export const SmartReview: React.FC<SmartReviewProps> = ({
  srs, soundEnabled, showTranscripts, onExit, onXp
}) => {
  const queue = useMemo(
    () => srs.dueIds.map(id => allVocabulary.find(v => v.id === id)).filter(Boolean).slice(0, 20),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ) as typeof allVocabulary;

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(queue.length === 0);

  const card = queue[idx];
  const hook = card ? hooksById[card.id] : undefined;
  const srsCard = card ? srs.cards[card.id] : undefined;

  const handleGrade = (isCorrect: boolean) => {
    if (!card) return;
    triggerHaptic(isCorrect ? 'success' : 'error');
    if (soundEnabled) playBeep(isCorrect ? 'success' : 'wrong');
    srs.grade(card.id, isCorrect);
    if (isCorrect) {
      setCorrect(c => c + 1);
      onXp(3);
    }
    setRevealed(false);
    if (idx + 1 >= queue.length) {
      setDone(true);
      if (isCorrect || correct > 0) {
        try { confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 } }); } catch { /* ignore */ }
      }
    } else {
      setIdx(i => i + 1);
    }
  };

  // ---------- Empty / finished ----------
  if (done || !card) {
    const total = queue.length;
    return (
      <div className="fixed inset-0 z-[80] bg-[#f2f2f7] dark:bg-[#1c1c1e] flex flex-col items-center justify-center px-6 text-center pb-safe pt-safe">
        <div className="text-6xl mb-4">{total === 0 ? '🧠' : '🎉'}</div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          {total === 0 ? 'Nothing due yet' : 'Review complete!'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-xs leading-relaxed font-medium">
          {total === 0 ? (
            <>Your brain is still holding everything. Learn new phrases in the Course tab — they enter the review schedule automatically.
            {srs.nextDueLabel && <> Next batch due in <strong>{srs.nextDueLabel}</strong>.</>}</>
          ) : (
            <>You recalled <strong>{correct} of {total}</strong>. Correct cards moved to a longer interval; missed cards return in 10 minutes.</>
          )}
        </p>

        {total > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-xs">
            <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-3 border border-gray-200 dark:border-gray-800">
              <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto" />
              <p className="text-xl font-black text-gray-900 dark:text-white mt-1">+{correct * 3}</p>
              <p className="text-[11px] font-bold text-gray-500 uppercase">XP</p>
            </div>
            <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-3 border border-gray-200 dark:border-gray-800">
              <Brain className="w-5 h-5 text-red-500 mx-auto" />
              <p className="text-xl font-black text-gray-900 dark:text-white mt-1">{srs.strongCount}</p>
              <p className="text-[11px] font-bold text-gray-500 uppercase">Strong</p>
            </div>
          </div>
        )}

        <button
          onClick={onExit}
          className="mt-8 w-full max-w-xs py-4 rounded-2xl font-black text-base text-white bg-red-600 shadow-lg active:scale-95 transition-transform tap-target"
        >
          Done
        </button>
      </div>
    );
  }

  // ---------- Active review ----------
  return (
    <div className="fixed inset-0 z-[80] bg-[#f2f2f7] dark:bg-[#1c1c1e] flex flex-col max-w-md mx-auto w-full pt-safe">
      <div className="px-4 pt-3 pb-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-[#2c2c2e]/85 backdrop-blur-md">
        <button
          onClick={onExit}
          aria-label="Close review"
          className="p-2.5 bg-gray-100 dark:bg-[#38383a] rounded-xl text-gray-700 dark:text-gray-200 tap-target flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="h-3 bg-gray-200 dark:bg-[#38383a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-red-600 rounded-full transition-all duration-500"
              style={{ width: `${(idx / queue.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-black text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/60 px-2.5 py-1 rounded-lg whitespace-nowrap">
          {idx + 1}/{queue.length}
        </span>
      </div>

      <div className="px-5 pt-4 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
          <Brain className="w-4 h-4" /> Smart Review · Active Recall
        </span>
        {srsCard && (
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            Box {srsCard.box + 1} · {BOX_LABELS[srsCard.box]}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-4">
        {/* Prompt */}
        <div className="bg-white dark:bg-[#2c2c2e] rounded-[28px] p-6 border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400">
            Say it in Turkish — out loud
          </p>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-snug">
            "{card.english}"
          </h2>

          {!revealed ? (
            <button
              onClick={() => { setRevealed(true); triggerHaptic('medium'); if (soundEnabled) playBeep('flip'); }}
              className="mt-2 w-full py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform tap-target"
            >
              <Eye className="w-5 h-5" /> Reveal answer
            </button>
          ) : (
            <div className="animate-fadeIn space-y-3 pt-1">
              <p className="tr-text text-2xl font-black text-red-600 dark:text-red-400 leading-snug">
                {card.turkish}
              </p>
              {showTranscripts && (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl px-3 py-2.5">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                    Read aloud
                  </p>
                  <p className="transcript text-sm font-bold text-amber-900 dark:text-amber-200">
                    {card.pronunciation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Memory hook shown only after the retrieval attempt */}
        {revealed && hook && (
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/30 rounded-3xl p-4 border border-violet-200 dark:border-violet-900/60 animate-fadeIn space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Memory hook
            </h3>
            <p className="text-sm font-extrabold text-gray-900 dark:text-white">{hook.soundsLike}</p>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{hook.image}</p>
            {hook.gesture && (
              <p className="text-xs font-bold text-violet-700 dark:text-violet-300">🤲 {hook.gesture}</p>
            )}
          </div>
        )}

        {/* Confidence grading */}
        {revealed && (
          <div className="space-y-2 animate-fadeIn">
            <p className="text-center text-xs font-bold text-gray-500 dark:text-gray-400">
              Be honest — accurate grading is what makes the schedule work.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleGrade(false)}
                className="py-4 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-black text-sm border-2 border-rose-300 dark:border-rose-800 flex flex-col items-center gap-1 active:scale-95 transition-transform tap-target"
              >
                <RotateCcw className="w-5 h-5" />
                Missed it
                <span className="text-[10px] font-bold opacity-70">back to 10 min</span>
              </button>
              <button
                onClick={() => handleGrade(true)}
                className="py-4 rounded-2xl bg-emerald-600 text-white font-black text-sm shadow-md flex flex-col items-center gap-1 active:scale-95 transition-transform tap-target"
              >
                <Check className="w-5 h-5" strokeWidth={3} />
                Recalled it
                <span className="text-[10px] font-bold opacity-80">+3 XP · longer gap</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
