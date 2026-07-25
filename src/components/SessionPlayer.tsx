import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PartDef, SessionType, VocabItem, MasteryLevel } from '../types';
import { sessionMeta, getPartItems, courseParts } from '../data/courseData';
import { triggerHaptic, playBeep } from '../utils/audio';
import { X, Heart, Check, ArrowRight, RotateCcw, Sparkles, Trophy, BookOpenText, ScrollText, Brain } from 'lucide-react';
import { hooksById } from '../data/memoryHooks';
import confetti from 'canvas-confetti';

type Step =
  | { kind: 'learn'; item: VocabItem }
  | { kind: 'quiz'; item: VocabItem; options: string[] }
  | { kind: 'listen'; item: VocabItem; options: string[] } // now a READ step: Turkish text → pick English meaning
  | { kind: 'build'; item: VocabItem; tiles: string[] };

interface SessionPlayerProps {
  part: PartDef;
  type: SessionType;
  soundEnabled: boolean;
  showTranscripts: boolean;
  onExit: () => void;
  onComplete: (xp: number, updates: { id: string; level: MasteryLevel }[], passed: boolean) => void;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildOptions = (item: VocabItem, pool: VocabItem[], field: 'turkish' | 'english'): string[] => {
  const distractors = shuffle(pool.filter(p => p.id !== item.id && p[field] !== item[field]))
    .slice(0, 3)
    .map(p => p[field]);
  return shuffle([item[field], ...distractors]);
};

export const SessionPlayer: React.FC<SessionPlayerProps> = ({
  part, type, soundEnabled, showTranscripts, onExit, onComplete
}) => {
  const meta = sessionMeta[type];
  const items = useMemo(() => getPartItems(part), [part]);
  const pool = useMemo(() => getPartItems({ ...part, itemIds: courseParts.flatMap(p => p.itemIds) }), [part]);

  const steps = useMemo<Step[]>(() => {
    if (type === 'learn') return items.map(item => ({ kind: 'learn', item }));
    if (type === 'quiz') return items.map(item => ({ kind: 'quiz', item, options: buildOptions(item, pool, 'turkish') }));
    if (type === 'listen') return items.map(item => ({ kind: 'listen', item, options: buildOptions(item, pool, 'english') }));
    // boss: alternate read/quiz + word builder finale
    const mixed: Step[] = items.map((item, i) =>
      i % 2 === 0
        ? { kind: 'listen', item, options: buildOptions(item, pool, 'english') }
        : { kind: 'quiz', item, options: buildOptions(item, pool, 'turkish') }
    );
    const buildItem = shuffle(items).find(i => i.turkish.replace(/[^a-zA-ZçğıİöşüÇĞÖŞÜ]/g, '').length <= 30) || items[0];
    const cleanWord = buildItem.turkish.replace(/[^a-zA-ZçğıİöşüÇĞÖŞÜ]/g, '');
    mixed.push({ kind: 'build', item: buildItem, tiles: shuffle(cleanWord.split('')) });
    return mixed;
  }, [type, items, pool]);

  const [idx, setIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [placed, setPlaced] = useState<number[]>([]);
  const [buildWrong, setBuildWrong] = useState(false);
  const [finished, setFinished] = useState<null | { passed: boolean }>(null);
  const updatesRef = useRef<{ id: string; level: MasteryLevel }[]>([]);
  const completedRef = useRef(false);

  const step = steps[idx];
  const hasLives = type !== 'learn';
  const hook = step ? hooksById[step.item.id] : undefined;

  const pushUpdate = (id: string, level: MasteryLevel) => {
    const existing = updatesRef.current.find(u => u.id === id);
    if (existing) existing.level = Math.max(existing.level, level) as MasteryLevel;
    else updatesRef.current.push({ id, level });
  };

  const advance = () => {
    triggerHaptic('light');
    if (soundEnabled) playBeep('tap');
    setSelected(null);
    setRevealed(false);
    setPlaced([]);
    setBuildWrong(false);
    if (idx + 1 >= steps.length) {
      const passed = !hasLives || lives > 0;
      setFinished({ passed });
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete(xp, updatesRef.current, passed);
        if (passed) {
          try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } }); } catch (e) { /* ignore */ }
        }
      }
    } else {
      setIdx(i => i + 1);
    }
  };

  const handleLearnGrade = (gotIt: boolean) => {
    triggerHaptic(gotIt ? 'success' : 'light');
    if (soundEnabled) playBeep(gotIt ? 'success' : 'tap');
    if (gotIt) {
      setXp(x => x + 4);
      pushUpdate(step.item.id, 2);
    } else {
      setXp(x => x + 2);
      pushUpdate(step.item.id, 1);
    }
    advance();
  };

  const handleOptionSelect = (optIdx: number) => {
    if (selected !== null || !step || step.kind === 'learn' || step.kind === 'build') return;
    const isCorrect = step.options[optIdx] === (step.kind === 'quiz' ? step.item.turkish : step.item.english);
    setSelected(optIdx);
    if (isCorrect) {
      triggerHaptic('success');
      if (soundEnabled) playBeep('success');
      setXp(x => x + 4);
      setCorrectCount(c => c + 1);
      pushUpdate(step.item.id, 2);
    } else {
      triggerHaptic('error');
      if (soundEnabled) playBeep('wrong');
      setLives(l => l - 1);
      pushUpdate(step.item.id, 1);
    }
  };

  // ---- word builder helpers ----
  const targetWord = step && step.kind === 'build' ? step.item.turkish.replace(/[^a-zA-ZçğıİöşüÇĞÖŞÜ]/g, '') : '';
  const currentGuess = placed.map(i => (step as { tiles?: string[] }).tiles?.[i] ?? '').join('');

  const handleTileTap = (tileIdx: number) => {
    if (!step || step.kind !== 'build') return;
    triggerHaptic('light');
    if (soundEnabled) playBeep('tap');
    if (placed.includes(tileIdx)) {
      setPlaced(p => p.filter(x => x !== tileIdx));
    } else if (placed.length < targetWord.length) {
      setPlaced(p => [...p, tileIdx]);
    }
  };

  const handleBuildCheck = () => {
    if (!step || step.kind !== 'build') return;
    if (currentGuess === targetWord) {
      triggerHaptic('success');
      if (soundEnabled) playBeep('success');
      setXp(x => x + 10);
      setCorrectCount(c => c + 1);
      pushUpdate(step.item.id, 3);
      advance();
    } else {
      triggerHaptic('error');
      if (soundEnabled) playBeep('wrong');
      setBuildWrong(true);
      setLives(l => l - 1);
      window.setTimeout(() => setBuildWrong(false), 600);
      if (lives - 1 <= 0) {
        setFinished({ passed: false });
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete(xp, updatesRef.current, false);
        }
      }
    }
  };

  // early fail when lives hit 0 on quiz/read
  useEffect(() => {
    if (hasLives && lives <= 0 && !finished && selected !== null) {
      const t = window.setTimeout(() => {
        setFinished({ passed: false });
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete(xp, updatesRef.current, false);
        }
      }, 1600);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lives, selected, finished]);

  // ============ RESULT SCREEN ============
  if (finished) {
    const totalAnswerSteps = steps.filter(s => s.kind !== 'learn').length;
    const accuracy = totalAnswerSteps > 0 ? Math.round((correctCount / totalAnswerSteps) * 100) : 100;
    return (
      <div className="fixed inset-0 z-[70] bg-[#f2f2f7] dark:bg-[#1c1c1e] flex flex-col items-center justify-center px-6 text-center">
        <div className={`text-6xl mb-4 ${finished.passed ? 'animate-bounce' : ''}`}>{finished.passed ? '🎉' : '💔'}</div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {finished.passed ? 'Session Complete!' : 'Out of Hearts!'}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-semibold">
          {part.emoji} {part.title} · {meta.name} session
        </p>

        {finished.passed ? (
          <div className="grid grid-cols-3 gap-2 mt-6 w-full max-w-xs">
            <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-3 shadow-sm border border-gray-200 dark:border-gray-800">
              <Trophy className="w-5 h-5 text-amber-500 mx-auto" />
              <p className="text-lg font-black text-gray-900 dark:text-white mt-1">+{xp}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase">XP earned</p>
            </div>
            <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-3 shadow-sm border border-gray-200 dark:border-gray-800">
              <Sparkles className="w-5 h-5 text-red-500 mx-auto" />
              <p className="text-lg font-black text-gray-900 dark:text-white mt-1">{accuracy}%</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase">Accuracy</p>
            </div>
            <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-3 shadow-sm border border-gray-200 dark:border-gray-800">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mx-auto" />
              <p className="text-lg font-black text-gray-900 dark:text-white mt-1">{lives}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase">Hearts left</p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 max-w-xs leading-relaxed">
            No worries — mistakes are how Turkish sticks! Replay the <strong>Learn</strong> cards first, then try again.
          </p>
        )}

        <button
          onClick={onExit}
          className={`mt-8 w-full max-w-xs py-3.5 rounded-2xl font-extrabold text-sm text-white shadow-lg active:scale-95 transition-transform ${
            finished.passed ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          {finished.passed ? 'Continue →' : 'Back to Course'}
        </button>
      </div>
    );
  }

  // ============ ACTIVE SESSION ============
  return (
    <div className="fixed inset-0 z-[70] bg-[#f2f2f7] dark:bg-[#1c1c1e] flex flex-col max-w-md mx-auto w-full">
      {/* Top bar */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#2c2c2e]/80 backdrop-blur-md">
        <button onClick={onExit} className="p-2 bg-gray-100 dark:bg-[#38383a] rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200">
          <X className="w-4 h-4" />
        </button>
        <div className="flex-1 h-3 bg-gray-200 dark:bg-[#38383a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full transition-all duration-500"
            style={{ width: `${(idx / steps.length) * 100}%` }}
          />
        </div>
        {hasLives && (
          <div className="flex items-center gap-0.5">
            {[0, 1, 2].map(i => (
              <Heart key={i} className={`w-4 h-4 ${i < lives ? 'text-rose-500 fill-rose-500' : 'text-gray-300 dark:text-gray-700'}`} />
            ))}
          </div>
        )}
        <span className="text-xs font-black text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg">
          +{xp} XP
        </span>
      </div>

      {/* Session label */}
      <div className="px-5 pt-4 flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {meta.icon} {meta.name} · {part.title}
        </span>
        <span className="text-[11px] font-bold text-gray-400">{idx + 1}/{steps.length}</span>
      </div>

      {/* ============ STEP CONTENT ============ */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
        {step.kind === 'learn' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-center text-xs font-bold text-gray-500">Tap the card to reveal the Turkish + read-aloud transcript 📖</p>
            <div
              onClick={() => { if (!revealed) { setRevealed(true); triggerHaptic('medium'); if (soundEnabled) playBeep('flip'); } }}
              className={`min-h-[300px] rounded-[32px] p-6 shadow-xl border flex flex-col justify-between cursor-pointer transition-all active:scale-[0.98] select-none ${
                revealed
                  ? 'bg-gradient-to-br from-red-600 to-rose-800 border-red-500 text-white'
                  : 'bg-white dark:bg-[#2c2c2e] border-gray-200 dark:border-gray-800'
              }`}
            >
              <span className={`self-start text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                revealed ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-[#38383a] text-gray-400'
              }`}>
                {revealed ? '🇹🇷 Turkish' : '🇬🇧 English'}
              </span>
              <div className="text-center space-y-3 my-4">
                {!revealed ? (
                  <>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">"{step.item.english}"</h2>
                    <p className="text-xs text-red-500 font-bold animate-pulse">tap to flip ↻</p>
                  </>
                ) : (
                  <>
                    <h2 className="tr-text text-[26px] font-black leading-snug">{step.item.turkish}</h2>
                    <p className="text-base text-white/90 font-semibold">"{step.item.english}"</p>
                    {showTranscripts && (
                      <div className="bg-black/30 rounded-2xl px-3 py-2.5 mx-auto max-w-sm">
                        <p className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1 mb-1">
                          <ScrollText className="w-3.5 h-3.5" /> Say it out loud
                        </p>
                        <p className="transcript text-sm text-amber-100 font-bold">{step.item.pronunciation}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              {revealed && step.item.grammarTip && (
                <div className="bg-black/25 rounded-2xl p-3 text-xs leading-relaxed text-white/95 font-medium">
                  💡 {step.item.grammarTip}
                </div>
              )}
            </div>

            {/* Memory hook — keyword mnemonic + gesture + elaborative prompt */}
            {revealed && hook && (
              <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/30 rounded-3xl p-4 border border-violet-200 dark:border-violet-900/60 animate-fadeIn space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-violet-800 dark:text-violet-300 flex items-center gap-1.5">
                  <Brain className="w-4 h-4" /> Memory hook · picture this
                </h3>
                <p className="text-sm font-extrabold text-gray-900 dark:text-white">{hook.soundsLike}</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{hook.image}</p>
                {hook.gesture && (
                  <p className="text-xs font-bold text-violet-700 dark:text-violet-300 bg-white/70 dark:bg-black/25 rounded-xl px-2.5 py-1.5">
                    🤲 Do this now: {hook.gesture}
                  </p>
                )}
                {hook.whyPrompt && (
                  <p className="text-xs font-bold text-fuchsia-800 dark:text-fuchsia-300 bg-white/70 dark:bg-black/25 rounded-xl px-2.5 py-1.5">
                    ❓ Answer in your head: {hook.whyPrompt}
                  </p>
                )}
              </div>
            )}

            {revealed && (
              <div className="grid grid-cols-2 gap-3 animate-fadeIn">
                <button
                  onClick={() => handleLearnGrade(false)}
                  className="py-3.5 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-extrabold text-xs border border-amber-300 dark:border-amber-800 active:scale-95 transition-transform"
                >
                  🌱 Still learning (+2 XP)
                </button>
                <button
                  onClick={() => handleLearnGrade(true)}
                  className="py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-md active:scale-95 transition-transform"
                >
                  ⭐ Got it! (+4 XP)
                </button>
              </div>
            )}
          </div>
        )}

        {(step.kind === 'quiz' || step.kind === 'listen') && (
          <div className="space-y-4 animate-fadeIn">
            {step.kind === 'listen' ? (
              <div className="text-center space-y-3 py-2">
                <p className="text-xs font-bold text-gray-500 flex items-center justify-center gap-1">
                  <BookOpenText className="w-4 h-4 text-red-500" /> Read the Turkish — what does it mean?
                </p>
                <div className="bg-white dark:bg-[#2c2c2e] rounded-3xl border-2 border-red-200 dark:border-red-900/60 p-5 shadow-sm space-y-2">
                  <h2 className="tr-text text-[22px] font-black text-gray-900 dark:text-white leading-snug">{step.item.turkish}</h2>
                  {showTranscripts && (
                    <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl px-3 py-2">
                      <p className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5">Transcript</p>
                      <p className="transcript text-sm text-amber-900 dark:text-amber-200 font-bold">{step.item.pronunciation}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2 py-2">
                <p className="text-xs font-bold text-gray-500">How do you say…</p>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">"{step.item.english}"</h2>
              </div>
            )}

            <div className="space-y-2.5">
              {step.options.map((opt, i) => {
                const correctOpt = step.kind === 'quiz' ? step.item.turkish : step.item.english;
                const isCorrectOpt = opt === correctOpt;
                const isPicked = selected === i;
                let style = 'bg-white dark:bg-[#2c2c2e] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-red-400';
                if (selected !== null) {
                  if (isCorrectOpt) style = 'bg-green-100 dark:bg-green-950/60 border-green-500 text-green-900 dark:text-green-300 font-black ring-2 ring-green-400';
                  else if (isPicked) style = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300 animate-shake';
                  else style = 'bg-white dark:bg-[#2c2c2e] border-gray-200 dark:border-gray-800 text-gray-400 opacity-60';
                }
                return (
                  <button
                    key={i}
                    disabled={selected !== null}
                    onClick={() => handleOptionSelect(i)}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-base font-bold transition-all active:scale-[0.98] tap-target ${style}`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="tr-text">{opt}</span>
                      {selected !== null && isCorrectOpt && <Check className="w-5 h-5 text-green-600 shrink-0" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="space-y-3 animate-fadeIn">
                <div className={`p-3 rounded-2xl text-xs font-semibold border ${
                  step.options[selected] === (step.kind === 'quiz' ? step.item.turkish : step.item.english)
                    ? 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                }`}>
                  {step.options[selected] === (step.kind === 'quiz' ? step.item.turkish : step.item.english)
                    ? '✅ Harika! (Great!) +4 XP'
                    : `❌ Correct answer: ${step.kind === 'quiz' ? step.item.turkish : step.item.english}`}
                  <span className="block text-[11px] opacity-80 mt-0.5 font-mono">📖 {step.item.pronunciation}</span>
                </div>
                <button
                  onClick={advance}
                  className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {step.kind === 'build' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center space-y-2 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-full">👑 Boss finale · +10 XP</span>
              <p className="text-xs font-bold text-gray-500">Build the Turkish word from tiles for:</p>
              <h2 className="text-lg font-black text-gray-900 dark:text-white">"{step.item.english}"</h2>
              <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl px-3 py-2 mx-auto max-w-xs">
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-0.5">Hint transcript</p>
                <p className="text-[11px] text-amber-900 dark:text-amber-200 font-mono font-bold leading-relaxed">{step.item.pronunciation}</p>
              </div>
            </div>

            {/* Answer slots */}
            <div className={`flex flex-wrap justify-center gap-1.5 min-h-[52px] p-3 rounded-2xl border-2 border-dashed ${
              buildWrong ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30 animate-shake' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2c2c2e]'
            }`}>
              {targetWord.split('').map((_, i) => {
                const tileIdx = placed[i];
                const letter = tileIdx !== undefined ? step.tiles[tileIdx] : '';
                return (
                  <span
                    key={i}
                    onClick={() => tileIdx !== undefined && handleTileTap(tileIdx)}
                    className={`w-8 h-10 flex items-center justify-center rounded-lg text-base font-black ${
                      letter
                        ? 'bg-red-600 text-white shadow cursor-pointer'
                        : 'bg-gray-100 dark:bg-[#38383a] text-gray-300'
                    }`}
                  >
                    {letter || '·'}
                  </span>
                );
              })}
            </div>

            {/* Tile bank */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {step.tiles.map((letter, i) => {
                const used = placed.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleTileTap(i)}
                    disabled={used}
                    className={`w-9 h-11 rounded-xl text-base font-black border-b-4 transition-all active:scale-90 ${
                      used
                        ? 'bg-gray-100 dark:bg-[#38383a] text-gray-300 dark:text-gray-600 border-transparent'
                        : 'bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 shadow hover:border-red-400'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setPlaced([]); triggerHaptic('light'); }}
                className="py-3 rounded-2xl bg-gray-200 dark:bg-[#38383a] text-gray-700 dark:text-gray-300 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear
              </button>
              <button
                onClick={handleBuildCheck}
                disabled={placed.length !== targetWord.length}
                className="py-3 rounded-2xl bg-red-600 text-white font-extrabold text-xs shadow-md disabled:opacity-40 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Check className="w-4 h-4" /> Check
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
