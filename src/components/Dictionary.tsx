import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  DICTIONARY, searchLexicon, LEXICON_STATS, ALL_CATEGORIES, DictEntry, ALL_EXAMPLES
} from '../data/lexicon';
import { conjugate, splitVerb, Tense } from '../utils/morphology';
import { triggerHaptic, playBeep } from '../utils/audio';
import { Search, X, BookOpenText, Sparkles, Layers3, ChevronRight, Shuffle, Star } from 'lucide-react';

interface DictionaryProps {
  soundEnabled: boolean;
  onLearn?: (id: string) => void;
}

const TYPE_STYLE: Record<string, { label: string; cls: string }> = {
  verb: { label: 'VERB', cls: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300' },
  noun: { label: 'NOUN', cls: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
  adjective: { label: 'ADJ', cls: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' },
  connector: { label: 'LINK', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
  phrase: { label: 'PHRASE', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' },
};

const TENSES: { key: Tense; label: string; hint: string }[] = [
  { key: 'present', label: 'Present', hint: '-iyor · doing now' },
  { key: 'past', label: 'Past', hint: '-di · definitely did' },
  { key: 'future', label: 'Future', hint: '-ecek · will do' },
  { key: 'aorist', label: 'Aorist', hint: '-ir · habitually does' },
  { key: 'necessitative', label: 'Must', hint: '-meli · has to do' },
  { key: 'ability', label: 'Can', hint: '-ebilir · is able to' },
];

// ---------- Detail bottom sheet ----------
const DetailSheet: React.FC<{
  entry: DictEntry;
  onClose: () => void;
  soundEnabled: boolean;
  onLearn?: (id: string) => void;
}> = ({ entry, onClose, soundEnabled, onLearn }) => {
  const [tense, setTense] = useState<Tense>('present');
  const [negative, setNegative] = useState(false);

  const isVerb = entry.type === 'verb';
  const { head, infinitive: inf, conjugable: canConjugate } = splitVerb(entry.turkish);
  const conjugable = isVerb && canConjugate;

  const rows = useMemo(
    () => (conjugable ? conjugate(inf, entry.english, tense, negative) : []),
    [conjugable, inf, entry.english, tense, negative]
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-t-[28px] shadow-2xl max-h-[88vh] flex flex-col animate-sheetUp pb-safe">
        {/* grabber */}
        <div className="pt-2.5 pb-1 flex justify-center shrink-0">
          <span className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="px-5 pb-3 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md tracking-wider ${TYPE_STYLE[entry.type].cls}`}>
              {TYPE_STYLE[entry.type].label} · {entry.category.toUpperCase()}
            </span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1.5 leading-tight break-words">
              {entry.turkish}
            </h2>
            <p className="text-sm font-bold text-red-600 dark:text-red-400 mt-0.5">{entry.english}</p>
            <p className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 mt-1.5 bg-amber-50 dark:bg-amber-950/40 inline-block px-2 py-1 rounded-lg">
              📖 {entry.transcript}
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-200 dark:bg-[#38383a] rounded-full text-gray-600 dark:text-gray-300 shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6 space-y-4">
          {/* Conjugation lab */}
          {conjugable && (
            <section className="bg-white dark:bg-[#2c2c2e] rounded-3xl p-4 border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" /> Conjugation Lab
                </h3>
                <button
                  onClick={() => { triggerHaptic('light'); setNegative(n => !n); }}
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full border transition-colors ${
                    negative
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-gray-100 dark:bg-[#38383a] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {negative ? 'NEGATIVE ON' : 'NEGATIVE OFF'}
                </button>
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
                {TENSES.map(t => (
                  <button
                    key={t.key}
                    onClick={() => { triggerHaptic('light'); if (soundEnabled) playBeep('tap'); setTense(t.key); }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold shrink-0 transition-all ${
                      tense === t.key
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-gray-100 dark:bg-[#38383a] text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-bold text-gray-400">{TENSES.find(t => t.key === tense)?.hint}</p>

              <div className="space-y-1.5">
                {rows.map(r => (
                  <div key={r.person} className="flex items-center gap-2 bg-gray-50 dark:bg-[#38383a] rounded-xl px-3 py-2">
                    <span className="text-[10px] font-black text-gray-400 w-10 shrink-0 uppercase">{r.pronoun}</span>
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white flex-1 min-w-0 break-words">
                      {head ? head + ' ' : ''}{r.form}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 text-right shrink-0 max-w-[38%] truncate">
                      {r.english}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Generated forms */}
          {entry.forms.length > 0 && (
            <section className="bg-white dark:bg-[#2c2c2e] rounded-3xl p-4 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5 mb-2.5">
                <Layers3 className="w-3.5 h-3.5 text-blue-500" /> Word Forms ({entry.forms.length})
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {entry.forms.map((f, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-[#38383a] rounded-xl px-2.5 py-1.5">
                    <p className="text-[9px] font-bold text-gray-400 uppercase truncate">{f.label}</p>
                    <p className="text-xs font-extrabold text-gray-900 dark:text-white truncate">{f.form}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Examples */}
          {entry.examples.length > 0 && (
            <section className="bg-white dark:bg-[#2c2c2e] rounded-3xl p-4 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5 mb-2.5">
                <BookOpenText className="w-3.5 h-3.5 text-emerald-500" /> Examples ({entry.examples.length})
              </h3>
              <div className="space-y-2">
                {entry.examples.map(ex => (
                  <div key={ex.id} className="bg-gray-50 dark:bg-[#38383a] rounded-2xl p-3">
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white">{ex.turkish}</p>
                    <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 mt-0.5">{ex.english}</p>
                    <p className="text-[10px] font-mono text-amber-700 dark:text-amber-400 mt-1">📖 {ex.transcript}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {onLearn && (
            <button
              onClick={() => { triggerHaptic('success'); if (soundEnabled) playBeep('success'); onLearn(entry.id); onClose(); }}
              className="w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-extrabold text-xs shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4 fill-white" /> Mark as learned
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Main dictionary ----------
export const Dictionary: React.FC<DictionaryProps> = ({ soundEnabled, onLearn }) => {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selected, setSelected] = useState<DictEntry | null>(null);
  const [limit, setLimit] = useState(40);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 180);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => { setLimit(40); }, [debounced, category, typeFilter]);

  const results = useMemo(() => {
    let base: DictEntry[] = debounced.trim()
      ? searchLexicon(debounced, 400)
      : DICTIONARY;

    if (category !== 'all') base = base.filter(e => e.category === category);
    if (typeFilter !== 'all') base = base.filter(e => e.type === typeFilter);

    if (!debounced.trim()) {
      base = [...base].sort((a, b) => (b.frequency || 0) - (a.frequency || 0));
    }
    return base;
  }, [debounced, category, typeFilter]);

  const shown = results.slice(0, limit);

  const randomWord = () => {
    triggerHaptic('medium');
    if (soundEnabled) playBeep('flip');
    const pool = results.length ? results : DICTIONARY;
    setSelected(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Large iOS title */}
      <div className="px-1 pt-1">
        <h1 className="text-[32px] leading-tight font-black tracking-tight text-gray-900 dark:text-white">Sözlük</h1>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 -mt-0.5">
          Offline Turkish dictionary & conjugation engine
        </p>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { n: LEXICON_STATS.uniqueForms.toLocaleString(), l: 'Words' },
          { n: LEXICON_STATS.verbs, l: 'Verbs' },
          { n: LEXICON_STATS.examples.toLocaleString(), l: 'Examples' },
          { n: LEXICON_STATS.headwords.toLocaleString(), l: 'Entries' },
        ].map(s => (
          <div key={s.l} className="bg-white dark:bg-[#2c2c2e] rounded-2xl py-2 text-center border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-black text-red-600 dark:text-red-400 leading-none">{s.n}</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{s.l}</p>
          </div>
        ))}
      </div>

      {/* iOS search field */}
      <div className="sticky top-[86px] z-30 py-1 bg-[#f2f2f7]/90 dark:bg-[#1c1c1e]/90 backdrop-blur-md -mx-1 px-1">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Turkish or English…"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className="w-full bg-gray-200/70 dark:bg-[#2c2c2e] rounded-2xl py-2.5 pl-10 pr-20 text-sm font-semibold text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {query && (
              <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="p-1.5 bg-gray-300 dark:bg-[#48484a] rounded-full">
                <X className="w-3 h-3 text-gray-700 dark:text-gray-200" />
              </button>
            )}
            <button onClick={randomWord} className="p-1.5 bg-red-600 rounded-full shadow" title="Random word">
              <Shuffle className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* Type segmented control */}
        <div className="flex gap-1 mt-2 bg-gray-200/70 dark:bg-[#2c2c2e] p-1 rounded-xl">
          {[
            { id: 'all', l: 'All' },
            { id: 'verb', l: 'Verbs' },
            { id: 'noun', l: 'Nouns' },
            { id: 'adjective', l: 'Adj' },
            { id: 'phrase', l: 'Phrases' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { triggerHaptic('light'); setTypeFilter(t.id); }}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-extrabold transition-all ${
                typeFilter === t.id
                  ? 'bg-white dark:bg-[#48484a] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
        <button
          onClick={() => { triggerHaptic('light'); setCategory('all'); }}
          className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shrink-0 border transition-all ${
            category === 'all'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent'
              : 'bg-white dark:bg-[#2c2c2e] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800'
          }`}
        >
          All topics
        </button>
        {ALL_CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => { triggerHaptic('light'); setCategory(c); }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shrink-0 border capitalize transition-all ${
              category === c
                ? 'bg-red-600 text-white border-red-600 shadow'
                : 'bg-white dark:bg-[#2c2c2e] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-[11px] font-bold text-gray-400 px-1">
        {results.length.toLocaleString()} result{results.length === 1 ? '' : 's'}
        {debounced ? ` for “${debounced}”` : ''}
      </p>

      {/* Results list — iOS grouped table */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
        {shown.map(entry => (
          <button
            key={entry.id}
            onClick={() => { triggerHaptic('light'); if (soundEnabled) playBeep('tap'); setSelected(entry); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-gray-100 dark:active:bg-[#38383a] transition-colors"
          >
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded shrink-0 ${TYPE_STYLE[entry.type].cls}`}>
              {TYPE_STYLE[entry.type].label}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-extrabold text-gray-900 dark:text-white truncate">{entry.turkish}</span>
              <span className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 truncate">{entry.english}</span>
            </span>
            {entry.examples.length > 0 && (
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded shrink-0">
                {entry.examples.length} ex
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
          </button>
        ))}

        {shown.length === 0 && (
          <div className="px-4 py-10 text-center">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">No matches</p>
            <p className="text-[11px] text-gray-500 mt-1">Try another spelling, or clear the filters.</p>
          </div>
        )}
      </div>

      {results.length > shown.length && (
        <button
          onClick={() => { triggerHaptic('light'); setLimit(l => l + 60); }}
          className="w-full py-3 bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-800 rounded-2xl text-xs font-extrabold text-red-600 active:scale-[0.99] transition-transform"
        >
          Load {Math.min(60, results.length - shown.length)} more ({(results.length - shown.length).toLocaleString()} left)
        </button>
      )}

      <p className="text-center text-[10px] font-semibold text-gray-400 pt-1">
        {LEXICON_STATS.generatedForms.toLocaleString()} inflected forms · {ALL_EXAMPLES.length.toLocaleString()} generated examples · 100% offline
      </p>

      {selected && (
        <DetailSheet entry={selected} onClose={() => setSelected(null)} soundEnabled={soundEnabled} onLearn={onLearn} />
      )}
    </div>
  );
};
