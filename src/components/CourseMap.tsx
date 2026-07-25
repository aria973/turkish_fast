import React from 'react';
import { courseParts, getPartItems, sessionMeta, sessionOrder, threeDayTrack, DAILY_GOAL_XP } from '../data/courseData';
import { ProgressApi } from '../hooks/useProgress';
import { SessionType, PartDef, MasteryLevel } from '../types';
import { Flame, Trophy, Star, Lock, Check, Zap, RotateCcw, BookA, Sparkles } from 'lucide-react';
import { triggerHaptic, playBeep } from '../utils/audio';
import { DICTIONARY, LEXICON_STATS } from '../data/lexicon';

interface CourseMapProps {
  progress: ProgressApi;
  soundEnabled: boolean;
  onOpenSession: (part: PartDef, type: SessionType) => void;
}

const masteryLevelName = (lvl: number): string =>
  lvl === 0 ? 'New' : lvl === 1 ? 'Learning' : lvl === 2 ? 'Familiar' : 'Mastered';

export const ProgressRing: React.FC<{
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
}> = ({ progress, size = 44, stroke = 4, color = '#dc2626', track = '#e5e7eb', children }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = circumference * (1 - clamped);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
};

export const CourseMap: React.FC<CourseMapProps> = ({ progress, soundEnabled, onOpenSession }) => {
  const { state, level, levelProgress, isSessionDone, resetProgress } = progress;

  const totalItems = courseParts.reduce((sum, p) => sum + getPartItems(p).length, 0);
  const knownItems = courseParts.reduce((sum, p) => {
    return sum + getPartItems(p).filter(i => (state.mastery[i.id] ?? 0) >= 2).length;
  }, 0);
  const masteredItems = courseParts.reduce((sum, p) => {
    return sum + getPartItems(p).filter(i => (state.mastery[i.id] ?? 0) >= 3).length;
  }, 0);

  const dailyProgress = Math.min(1, state.dailyXp / DAILY_GOAL_XP);

  // Deterministic "word of the day" — same word all day, changes at midnight
  const wordOfDay = React.useMemo(() => {
    const pool = DICTIONARY.filter(d => d.examples.length > 0 && (d.frequency ?? 0) >= 4);
    const source = pool.length > 0 ? pool : DICTIONARY;
    const now = new Date();
    const dayNumber = Math.floor(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000
    );
    return source[dayNumber % source.length];
  }, []);

  const handleOpenSession = (part: PartDef, type: SessionType, locked: boolean) => {
    if (locked) {
      triggerHaptic('error');
      return;
    }
    triggerHaptic('medium');
    if (soundEnabled) playBeep('tap');
    onOpenSession(part, type);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      {/* ============ MEMRISE-STYLE STATS HEADER ============ */}
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-rose-700 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Merhaba! 👋</h1>
            <p className="text-[11px] text-white/85 font-semibold mt-0.5">
              Your 3-Day Turkish Sprint · Memrise-style course
            </p>
          </div>
          <button
            onClick={() => { triggerHaptic('heavy'); resetProgress(); }}
            className="p-2 bg-black/20 rounded-xl hover:bg-black/30 transition-colors"
            title="Reset all progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-2.5 flex items-center gap-2">
            <ProgressRing progress={levelProgress} size={40} stroke={4} color="#fbbf24" track="rgba(255,255,255,0.15)">
              <span className="text-[10px] font-black text-amber-300">{level}</span>
            </ProgressRing>
            <div>
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-wide">Level</p>
              <p className="text-xs font-extrabold">{state.xp} XP</p>
            </div>
          </div>

          <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-2.5 flex items-center gap-2">
            <div className={`p-2 rounded-xl ${state.streak > 0 ? 'bg-orange-500/30' : 'bg-white/10'}`}>
              <Flame className={`w-5 h-5 ${state.streak > 0 ? 'text-orange-300 fill-orange-400' : 'text-white/40'}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-wide">Streak</p>
              <p className="text-xs font-extrabold">{state.streak} day{state.streak === 1 ? '' : 's'}</p>
            </div>
          </div>

          <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-2.5 flex items-center gap-2">
            <ProgressRing progress={dailyProgress} size={40} stroke={4} color="#4ade80" track="rgba(255,255,255,0.15)">
              <Zap className="w-3.5 h-3.5 text-green-300 fill-green-300" />
            </ProgressRing>
            <div>
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-wide">Daily</p>
              <p className="text-xs font-extrabold">{state.dailyXp}/{DAILY_GOAL_XP} XP</p>
            </div>
          </div>
        </div>

        {/* Course mastery bar */}
        <div className="mt-4 bg-black/25 rounded-2xl p-3">
          <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
            <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-amber-300" /> Course vocabulary bank</span>
            <span>{knownItems}/{totalItems} known · {masteredItems} mastered ⭐</span>
          </div>
          <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-green-400 rounded-full transition-all duration-700"
              style={{ width: `${(knownItems / Math.max(1, totalItems)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ============ WORD OF THE DAY + LEXICON STATS ============ */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-3xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Word of the Day
          </h2>
          <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full uppercase">
            Offline bank
          </span>
        </div>

        {wordOfDay && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-2xl p-3.5 border border-amber-200 dark:border-amber-900/50">
            <p className="text-lg font-black text-gray-900 dark:text-white leading-tight">{wordOfDay.turkish}</p>
            <p className="text-xs font-bold text-red-600 dark:text-red-400 mt-0.5">{wordOfDay.english}</p>
            <p className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 mt-1.5">📖 {wordOfDay.transcript}</p>
            {wordOfDay.examples[0] && (
              <div className="mt-2.5 pt-2.5 border-t border-amber-200 dark:border-amber-900/50">
                <p className="text-xs font-extrabold text-gray-800 dark:text-gray-100">{wordOfDay.examples[0].turkish}</p>
                <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">{wordOfDay.examples[0].english}</p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-4 gap-1.5">
          {[
            { n: LEXICON_STATS.uniqueForms.toLocaleString(), l: 'Words' },
            { n: LEXICON_STATS.verbs, l: 'Verbs' },
            { n: LEXICON_STATS.examples.toLocaleString(), l: 'Examples' },
            { n: LEXICON_STATS.headwords.toLocaleString(), l: 'Entries' },
          ].map(s => (
            <div key={s.l} className="bg-gray-50 dark:bg-[#38383a] rounded-xl py-2 text-center">
              <p className="text-sm font-black text-gray-900 dark:text-white leading-none">{s.n}</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{s.l}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-semibold text-gray-400 text-center flex items-center justify-center gap-1">
          <BookA className="w-3 h-3" /> Open the <strong className="text-red-600">Sözlük</strong> tab to search it all offline
        </p>
      </div>

      {/* ============ 3-DAY FAST TRACK ============ */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-3xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
        <h2 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2.5">
          🗓️ 3-Day Fast Track Plan
        </h2>
        <div className="space-y-1.5">
          {threeDayTrack.map((d, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-gray-50 dark:bg-[#38383a] rounded-xl p-2.5">
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{d.day}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{d.label} <span className="text-gray-400 font-semibold">· {d.parts}</span></p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{d.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ PARTS LIST (MEMRISE UNITS) ============ */}
      <div className="space-y-3">
        {courseParts.map(part => {
          const items = getPartItems(part);
          const knownCount = items.filter(i => (state.mastery[i.id] ?? 0) >= 2).length;
          const partProgress = knownCount / Math.max(1, items.length);
          const avgMastery = items.reduce((s, i) => s + (state.mastery[i.id] ?? 0), 0) / Math.max(1, items.length);

          return (
            <div key={part.id} className="bg-white dark:bg-[#2c2c2e] rounded-3xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${part.color} flex items-center justify-center text-xl shadow-md shrink-0`}>
                  {part.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-red-600 bg-red-50 dark:bg-red-950/50 px-1.5 py-0.5 rounded">
                      {part.dayTag}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Part {part.order}</span>
                  </div>
                  <h3 className="text-sm font-black text-gray-900 dark:text-white truncate">{part.title}</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{part.subtitle}</p>
                </div>
                <ProgressRing progress={partProgress} size={46} stroke={4.5} color="#dc2626" track="#f3f4f6">
                  <span className="text-[10px] font-black text-red-600">{Math.round(partProgress * 100)}%</span>
                </ProgressRing>
              </div>

              {/* Word stage strip */}
              <div className="flex items-center gap-1.5">
                {items.map(item => {
                  const lvl = (state.mastery[item.id] ?? 0) as MasteryLevel;
                  const colors = ['bg-gray-200 dark:bg-gray-700', 'bg-amber-300', 'bg-emerald-400', 'bg-red-500'];
                  return (
                    <div
                      key={item.id}
                      title={`${item.english} — ${masteryLevelName(lvl)}`}
                      className={`h-1.5 flex-1 rounded-full ${colors[lvl]} transition-colors duration-500`}
                    />
                  );
                })}
                <span className="text-[9px] font-bold text-gray-400 ml-1 whitespace-nowrap">
                  {knownCount}/{items.length} words
                </span>
              </div>

              {/* Session nodes */}
              <div className="grid grid-cols-4 gap-2">
                {sessionOrder.map((type, idx) => {
                  const done = isSessionDone(part.id, type);
                  const prevDone = idx === 0 || isSessionDone(part.id, sessionOrder[idx - 1]);
                  const locked = !prevDone && !done;
                  const isCurrent = !done && !locked;
                  const meta = sessionMeta[type];

                  return (
                    <button
                      key={type}
                      onClick={() => handleOpenSession(part, type, locked)}
                      disabled={locked}
                      className={`relative rounded-2xl p-2.5 flex flex-col items-center gap-1 transition-all border ${
                        done
                          ? 'bg-green-50 dark:bg-green-950/40 border-green-300 dark:border-green-800 text-green-700 dark:text-green-400'
                          : isCurrent
                          ? `bg-gradient-to-br ${part.color} text-white border-transparent shadow-md hover:scale-[1.03] active:scale-95`
                          : 'bg-gray-100 dark:bg-[#38383a] border-gray-200 dark:border-gray-700 text-gray-400'
                      }`}
                    >
                      <span className="text-lg leading-none">
                        {locked ? <Lock className="w-4 h-4 mx-auto" /> : meta.icon}
                      </span>
                      <span className="text-[10px] font-extrabold">{meta.name}</span>
                      <span className={`text-[8px] font-bold ${done ? 'text-green-600/70' : 'opacity-80'}`}>
                        {done ? '✓ done' : `+${meta.xpBonus} XP`}
                      </span>
                      {done && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center shadow">
                          <Check className="w-3 h-3" strokeWidth={3.5} />
                        </span>
                      )}
                      {isCurrent && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-[10px] text-gray-400 font-semibold text-center">
                Word stage avg: <span className="text-amber-600 dark:text-amber-400 font-black">{masteryLevelName(Math.round(avgMastery))}</span>
                {' '}· Turkish: <span className="italic">{part.turkishTitle}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* PWA Install Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-4 shadow-lg border border-gray-700 flex items-center gap-3.5">
        <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shrink-0">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor" aria-hidden="true">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z" />
            <path d="M18.9 3.2l.55 1.26 1.37.13-1.03.92.3 1.34-1.19-.7-1.19.7.3-1.34-1.03-.92 1.37-.13z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black flex items-center gap-1.5">
            📲 Save TurkSpeed to your Home Screen
            <span className="text-[9px] bg-green-500/20 text-green-300 border border-green-600 px-1.5 py-0.5 rounded-full font-extrabold uppercase">Offline PWA</span>
          </p>
          <p className="text-[11px] text-gray-300 font-medium mt-0.5 leading-snug">
            On iPhone Safari: tap <strong>Share ⬆️</strong> → <strong>Add to Home Screen</strong>. The full course then works 100% offline with its own app icon — no browser bar, no internet needed.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-3.5 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-3 flex-wrap">
        <span className="text-[10px] font-bold text-gray-500 uppercase">Word stages:</span>
        {[
          { c: 'bg-gray-300', l: 'New' },
          { c: 'bg-amber-300', l: 'Learning' },
          { c: 'bg-emerald-400', l: 'Familiar' },
          { c: 'bg-red-500', l: 'Mastered' },
        ].map(s => (
          <span key={s.l} className="flex items-center gap-1 text-[10px] font-bold text-gray-600 dark:text-gray-300">
            <span className={`w-2.5 h-2.5 rounded-full ${s.c}`} /> {s.l}
          </span>
        ))}
        <span className="flex items-center gap-1 text-[10px] font-bold text-gray-600 dark:text-gray-300">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> +4 XP per correct answer
        </span>
      </div>
    </div>
  );
};
