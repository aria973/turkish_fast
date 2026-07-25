import { useCallback, useEffect, useMemo, useState } from 'react';

// ============================================================
// Spaced Repetition Scheduler (expanding-interval, SM-2 inspired)
// Intervals follow the forgetting-curve research: short first gap,
// then expanding gaps. A failure resets to the start.
// ============================================================

/** minutes between reviews for each box level */
export const BOX_INTERVALS_MIN = [
  10,        // box 0 → 10 minutes
  60 * 24,   // box 1 → 1 day
  60 * 24 * 3,   // box 2 → 3 days
  60 * 24 * 7,   // box 3 → 7 days
  60 * 24 * 21,  // box 4 → 21 days
  60 * 24 * 60,  // box 5 → 60 days (effectively retired)
];

export const BOX_LABELS = ['10 min', '1 day', '3 days', '7 days', '21 days', '60 days'];

export interface SRSCard {
  id: string;
  box: number;      // 0..5
  due: number;      // epoch ms
  lapses: number;
  reps: number;
  lastSeen: number;
}

const STORAGE_KEY = 'turkspeed-srs-v1';

type SRSMap = Record<string, SRSCard>;

const load = (): SRSMap => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SRSMap) : {};
  } catch {
    return {};
  }
};

export interface SRSApi {
  cards: SRSMap;
  /** ids that are due right now (oldest due first) */
  dueIds: string[];
  dueCount: number;
  /** total cards being tracked */
  trackedCount: number;
  /** cards that have reached box >= 3 */
  strongCount: number;
  grade: (id: string, correct: boolean) => void;
  schedule: (id: string) => void;
  nextDueLabel: string | null;
  resetSRS: () => void;
}

export const useSRS = (): SRSApi => {
  const [cards, setCards] = useState<SRSMap>(load);
  const [now, setNow] = useState(() => Date.now());

  // re-evaluate due cards every 30s so the badge stays live
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch {
      /* storage full or unavailable */
    }
  }, [cards]);

  /** Start tracking a card if it is new (called when first learned) */
  const schedule = useCallback((id: string) => {
    setCards(prev => {
      if (prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          id,
          box: 0,
          due: Date.now() + BOX_INTERVALS_MIN[0] * 60000,
          lapses: 0,
          reps: 1,
          lastSeen: Date.now(),
        },
      };
    });
  }, []);

  /** Grade a review: correct promotes a box, wrong resets to box 0 */
  const grade = useCallback((id: string, correct: boolean) => {
    setCards(prev => {
      const existing = prev[id];
      const current = existing ?? { id, box: 0, due: 0, lapses: 0, reps: 0, lastSeen: 0 };
      const nextBox = correct
        ? Math.min(current.box + 1, BOX_INTERVALS_MIN.length - 1)
        : 0;
      return {
        ...prev,
        [id]: {
          id,
          box: nextBox,
          due: Date.now() + BOX_INTERVALS_MIN[nextBox] * 60000,
          lapses: current.lapses + (correct ? 0 : 1),
          reps: current.reps + 1,
          lastSeen: Date.now(),
        },
      };
    });
  }, []);

  const resetSRS = useCallback(() => {
    setCards({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const dueIds = useMemo(
    () =>
      Object.values(cards)
        .filter(c => c.due <= now)
        .sort((a, b) => a.due - b.due)
        .map(c => c.id),
    [cards, now]
  );

  const nextDueLabel = useMemo(() => {
    const upcoming = Object.values(cards)
      .filter(c => c.due > now)
      .sort((a, b) => a.due - b.due)[0];
    if (!upcoming) return null;
    const mins = Math.round((upcoming.due - now) / 60000);
    if (mins < 60) return `${mins} min`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `${hours} h`;
    return `${Math.round(hours / 24)} d`;
  }, [cards, now]);

  const strongCount = useMemo(
    () => Object.values(cards).filter(c => c.box >= 3).length,
    [cards]
  );

  return {
    cards,
    dueIds,
    dueCount: dueIds.length,
    trackedCount: Object.keys(cards).length,
    strongCount,
    grade,
    schedule,
    nextDueLabel,
    resetSRS,
  };
};
