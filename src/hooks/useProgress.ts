import { useEffect, useMemo, useState } from 'react';
import { MasteryLevel, ProgressState, SessionType } from '../types';
import { sessionMeta } from '../data/courseData';

const STORAGE_KEY = 'turkspeed-progress-v3';

const todayStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const yesterdayStr = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const defaultState = (): ProgressState => ({
  xp: 0,
  streak: 0,
  lastActiveDate: '',
  dailyDate: todayStr(),
  dailyXp: 0,
  mastery: {},
  completed: [],
});

const loadState = (): ProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as ProgressState;
    const base = defaultState();
    const merged = { ...base, ...parsed };
    // Reset daily XP if it is a new day
    if (merged.dailyDate !== todayStr()) {
      merged.dailyDate = todayStr();
      merged.dailyXp = 0;
    }
    return merged;
  } catch (e) {
    return defaultState();
  }
};

export interface ProgressApi {
  state: ProgressState;
  level: number;
  levelProgress: number; // 0..1
  addXp: (amount: number) => void;
  setMastery: (id: string, level: MasteryLevel) => void;
  completeSession: (partId: string, type: SessionType) => void;
  isSessionDone: (partId: string, type: SessionType) => boolean;
  resetProgress: () => void;
}

export const useProgress = (): ProgressApi => {
  const [state, setState] = useState<ProgressState>(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // storage unavailable — keep in memory only
    }
  }, [state]);

  const addXp = (amount: number) => {
    if (amount <= 0) return;
    setState(prev => {
      const today = todayStr();
      const isFreshDay = prev.dailyDate !== today;
      const wasActiveYesterday = prev.lastActiveDate === yesterdayStr();
      const wasActiveToday = prev.lastActiveDate === today;

      let streak = prev.streak;
      if (!wasActiveToday) {
        streak = wasActiveYesterday ? prev.streak + 1 : 1;
      }

      return {
        ...prev,
        xp: prev.xp + amount,
        dailyDate: today,
        dailyXp: (isFreshDay ? 0 : prev.dailyXp) + amount,
        lastActiveDate: today,
        streak,
      };
    });
  };

  const setMastery = (id: string, level: MasteryLevel) => {
    setState(prev => {
      const current = prev.mastery[id] ?? 0;
      // never demote below current level
      const next = Math.max(current, level) as MasteryLevel;
      if (next === current) return prev;
      return { ...prev, mastery: { ...prev.mastery, [id]: next } };
    });
  };

  const isSessionDone = (partId: string, type: SessionType) =>
    state.completed.includes(`${partId}:${type}`);

  const completeSession = (partId: string, type: SessionType) => {
    setState(prev => {
      const key = `${partId}:${type}`;
      if (prev.completed.includes(key)) return prev;
      return { ...prev, completed: [...prev.completed, key] };
    });
    addXp(sessionMeta[type].xpBonus);
  };

  const resetProgress = () => {
    setState(defaultState());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  const { level, levelProgress } = useMemo(() => {
    const lvl = Math.floor(state.xp / 120) + 1;
    const prog = (state.xp % 120) / 120;
    return { level: lvl, levelProgress: prog };
  }, [state.xp]);

  return { state, level, levelProgress, addXp, setMastery, completeSession, isSessionDone, resetProgress };
};
