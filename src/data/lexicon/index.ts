import { VERBS, VERB_CATEGORIES, VerbEntry } from './verbs';
import { WORDS, WORD_CATEGORIES, WordEntry } from './words';
import {
  conjugate, applyCase, possessive, politeImperative, transcribe, splitVerb,
  Tense, NounCase, POSSESSIVE_PREFIX, verbStem
} from '../../utils/morphology';
import { allVocabulary } from '../vocabulary';

export type { VerbEntry, WordEntry };
export { VERBS, WORDS, VERB_CATEGORIES, WORD_CATEGORIES };

// ============================================================
// EXAMPLE SENTENCE GENERATION
// Builds natural, grammatically correct Turkish examples
// from every verb across multiple tenses and polarities.
// ============================================================

export interface ExampleSentence {
  id: string;
  turkish: string;
  english: string;
  transcript: string;
  tense: Tense | 'imperative';
  negative: boolean;
  sourceId: string;
  category: string;
}

const TENSE_PLAN: { tense: Tense; person: number; negative: boolean }[] = [
  { tense: 'present', person: 1, negative: false },
  { tense: 'present', person: 3, negative: false },
  { tense: 'present', person: 1, negative: true },
  { tense: 'past', person: 1, negative: false },
  { tense: 'past', person: 5, negative: false },
  { tense: 'future', person: 1, negative: false },
  { tense: 'future', person: 4, negative: false },
  { tense: 'aorist', person: 3, negative: false },
  { tense: 'necessitative', person: 1, negative: false },
  { tense: 'ability', person: 1, negative: false },
];

const TENSE_LABEL: Record<string, string> = {
  present: 'Present continuous',
  past: 'Definite past',
  future: 'Future',
  aorist: 'Aorist (habitual)',
  necessitative: 'Necessitative (must)',
  ability: 'Ability (can)',
  imperative: 'Polite imperative',
};

/** Generate ~10 example sentences per verb → 2,300+ total examples */
const buildVerbExamples = (): ExampleSentence[] => {
  const out: ExampleSentence[] = [];

  VERBS.forEach(verb => {
    // Multi-word verbs (e.g. "randevu almak") conjugate only their last part
    const { head, infinitive: inf, conjugable } = splitVerb(verb.infinitive);
    if (!conjugable) return;

    TENSE_PLAN.forEach((plan, i) => {
      const rows = conjugate(inf, verb.english, plan.tense, plan.negative);
      const row = rows[plan.person - 1];
      if (!row) return;

      const turkish = `${row.pronoun.charAt(0).toUpperCase() + row.pronoun.slice(1)} ${head ? head + ' ' : ''}${row.form}.`;
      const english = `${row.english.charAt(0).toUpperCase() + row.english.slice(1)}${head ? ' (' + verb.english.replace(/^to\s+/, '') + ')' : ''}.`;

      out.push({
        id: `ex-${verb.id}-${i}`,
        turkish,
        english,
        transcript: transcribe(turkish),
        tense: plan.tense,
        negative: plan.negative,
        sourceId: verb.id,
        category: verb.category,
      });
    });

    // Polite imperative example
    const imp = politeImperative(inf);
    const impTr = `Lütfen ${head ? head + ' ' : ''}${imp}.`;
    out.push({
      id: `ex-${verb.id}-imp`,
      turkish: impTr,
      english: `Please ${verb.english.replace(/^to\s+/, '')}.`,
      transcript: transcribe(impTr),
      tense: 'imperative',
      negative: false,
      sourceId: verb.id,
      category: verb.category,
    });
  });

  return out;
};

/** Case-pattern examples built from concrete nouns */
const CASE_TEMPLATES: { kase: NounCase; tr: (w: string) => string; en: (e: string) => string }[] = [
  { kase: 'locative', tr: w => `${w} neredeyim?`, en: e => `Where am I in the ${e}?` },
  { kase: 'dative', tr: w => `${w} gidiyorum.`, en: e => `I am going to the ${e}.` },
  { kase: 'ablative', tr: w => `${w} geliyorum.`, en: e => `I am coming from the ${e}.` },
  { kase: 'accusative', tr: w => `${w} arıyorum.`, en: e => `I am looking for the ${e}.` },
  { kase: 'with', tr: w => `${w} gidelim.`, en: e => `Let's go by/with the ${e}.` },
];

const buildNounExamples = (): ExampleSentence[] => {
  const out: ExampleSentence[] = [];
  const nouns = WORDS.filter(w => w.pos === 'noun' && !w.turkish.includes(' '));

  nouns.forEach((noun, idx) => {
    // rotate templates so we get variety without exploding the count
    const tpl = CASE_TEMPLATES[idx % CASE_TEMPLATES.length];
    const inflected = applyCase(noun.turkish, tpl.kase);
    const turkish = tpl.tr(inflected.charAt(0).toUpperCase() + inflected.slice(1));
    out.push({
      id: `exn-${noun.id}`,
      turkish,
      english: tpl.en(noun.english),
      transcript: transcribe(turkish),
      tense: 'present',
      negative: false,
      sourceId: noun.id,
      category: noun.category,
    });
  });

  return out;
};

export const VERB_EXAMPLES = buildVerbExamples();
export const NOUN_EXAMPLES = buildNounExamples();
export const ALL_EXAMPLES: ExampleSentence[] = [...VERB_EXAMPLES, ...NOUN_EXAMPLES];

// ============================================================
// UNIFIED DICTIONARY ENTRIES
// ============================================================

export interface DictEntry {
  id: string;
  turkish: string;
  english: string;
  category: string;
  type: 'verb' | 'noun' | 'adjective' | 'connector' | 'phrase';
  transcript: string;
  frequency?: number;
  /** all generated inflected forms for this lexeme */
  forms: { label: string; form: string }[];
  examples: ExampleSentence[];
}

const buildVerbEntries = (): DictEntry[] =>
  VERBS.map(v => {
    const { head, infinitive: inf, conjugable: valid } = splitVerb(v.infinitive);

    const forms: { label: string; form: string }[] = [];
    if (valid) {
      (['present', 'past', 'future', 'aorist', 'necessitative', 'ability'] as Tense[]).forEach(t => {
        const rows = conjugate(inf, v.english, t, false);
        forms.push({ label: `${TENSE_LABEL[t]} (ben)`, form: `${head ? head + ' ' : ''}${rows[0].form}` });
        forms.push({ label: `${TENSE_LABEL[t]} (o)`, form: `${head ? head + ' ' : ''}${rows[2].form}` });
      });
      const neg = conjugate(inf, v.english, 'present', true);
      forms.push({ label: 'Negative present (ben)', form: `${head ? head + ' ' : ''}${neg[0].form}` });
      forms.push({ label: 'Polite imperative', form: `${head ? head + ' ' : ''}${politeImperative(inf)}` });
      forms.push({ label: 'Verb stem', form: verbStem(inf) });
    }

    return {
      id: v.id,
      turkish: v.infinitive,
      english: v.english,
      category: v.category,
      type: 'verb' as const,
      transcript: transcribe(v.infinitive),
      frequency: v.frequency,
      forms,
      examples: VERB_EXAMPLES.filter(e => e.sourceId === v.id),
    };
  });

const CASE_ORDER: NounCase[] = ['plural', 'accusative', 'dative', 'locative', 'ablative', 'genitive', 'with', 'without'];
const CASE_SHORT: Record<NounCase, string> = {
  nominative: 'Base', plural: 'Plural', accusative: 'Accusative (-i)', dative: 'Dative (-e)',
  locative: 'Locative (-de)', ablative: 'Ablative (-den)', genitive: 'Genitive (-in)',
  with: 'With (-le)', without: 'Without (-siz)',
};

const buildWordEntries = (): DictEntry[] =>
  WORDS.map(w => {
    const forms: { label: string; form: string }[] = [];
    const simple = !w.turkish.includes(' ');
    if (simple && w.pos === 'noun') {
      CASE_ORDER.forEach(k => forms.push({ label: CASE_SHORT[k], form: applyCase(w.turkish, k) }));
      forms.push({ label: 'My … (benim)', form: `${POSSESSIVE_PREFIX[1]} ${possessive(w.turkish, 1)}` });
      forms.push({ label: 'Your … (senin)', form: `${POSSESSIVE_PREFIX[2]} ${possessive(w.turkish, 2)}` });
      forms.push({ label: 'His/Her … (onun)', form: `${POSSESSIVE_PREFIX[3]} ${possessive(w.turkish, 3)}` });
      forms.push({ label: 'Our … (bizim)', form: `${POSSESSIVE_PREFIX[4]} ${possessive(w.turkish, 4)}` });
    }
    return {
      id: w.id,
      turkish: w.turkish,
      english: w.english,
      category: w.category,
      type: w.pos,
      transcript: transcribe(w.turkish),
      forms,
      examples: NOUN_EXAMPLES.filter(e => e.sourceId === w.id),
    };
  });

const buildPhraseEntries = (): DictEntry[] =>
  allVocabulary.map(p => ({
    id: p.id,
    turkish: p.turkish,
    english: p.english,
    category: p.category,
    type: 'phrase' as const,
    transcript: p.pronunciation,
    forms: [],
    examples: [],
  }));

export const DICTIONARY: DictEntry[] = [
  ...buildVerbEntries(),
  ...buildWordEntries(),
  ...buildPhraseEntries(),
];

// ============================================================
// STATS  (counts every unique Turkish word form in the app)
// ============================================================

const collectUniqueForms = (): Set<string> => {
  const set = new Set<string>();
  const add = (text: string) =>
    text
      .toLowerCase()
      .split(/[\s.,!?;:()"']+/)
      .map(t => t.trim())
      .filter(t => t.length > 1)
      .forEach(t => set.add(t));

  DICTIONARY.forEach(d => {
    add(d.turkish);
    d.forms.forEach(f => add(f.form));
  });
  ALL_EXAMPLES.forEach(e => add(e.turkish));
  return set;
};

export const UNIQUE_WORD_FORMS = collectUniqueForms();

export const LEXICON_STATS = {
  headwords: DICTIONARY.length,
  verbs: VERBS.length,
  nouns: WORDS.filter(w => w.pos === 'noun').length,
  adjectives: WORDS.filter(w => w.pos === 'adjective').length,
  phrases: allVocabulary.length,
  examples: ALL_EXAMPLES.length,
  uniqueForms: UNIQUE_WORD_FORMS.size,
  generatedForms: DICTIONARY.reduce((s, d) => s + d.forms.length, 0),
};

// ============================================================
// SEARCH
// ============================================================

const normalize = (s: string): string =>
  s.toLowerCase()
    .replace(/ı/g, 'i').replace(/İ/g, 'i')
    .replace(/ş/g, 's').replace(/ç/g, 'c')
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o');

export const searchLexicon = (query: string, limit = 60): DictEntry[] => {
  const q = normalize(query.trim());
  if (!q) return [];

  const scored: { entry: DictEntry; score: number }[] = [];

  for (const entry of DICTIONARY) {
    const tr = normalize(entry.turkish);
    const en = normalize(entry.english);
    let score = 0;

    if (tr === q || en === q) score = 100;
    else if (tr.startsWith(q)) score = 80;
    else if (en.startsWith(q)) score = 70;
    else if (tr.includes(q)) score = 55;
    else if (en.includes(q)) score = 50;
    else if (entry.forms.some(f => normalize(f.form).startsWith(q))) score = 40;
    else if (entry.forms.some(f => normalize(f.form).includes(q))) score = 30;

    if (score > 0) {
      score += (entry.frequency || 0) * 2;
      if (entry.type === 'verb') score += 3;
      scored.push({ entry, score });
    }
    if (scored.length > 700) break;
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map(s => s.entry);
};

export const ALL_CATEGORIES = Array.from(
  new Set(DICTIONARY.map(d => d.category))
).sort();
