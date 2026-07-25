// ============================================================
// Turkish Morphology Engine
// Implements authentic vowel harmony, consonant assimilation,
// softening, buffer letters, full verb conjugation and noun cases.
// This lets the app generate THOUSANDS of grammatically correct
// Turkish word forms and example sentences from base lexemes.
// ============================================================

const BACK = 'aıou';
const VOWELS = 'aeıioöuü';
const VOICELESS = 'fstkçşhp';

export const lastVowel = (word: string): string => {
  for (let i = word.length - 1; i >= 0; i--) {
    if (VOWELS.includes(word[i])) return word[i];
  }
  return 'a';
};

export const isBack = (word: string): boolean => BACK.includes(lastVowel(word));

/** 2-way harmony: returns 'a' or 'e' */
export const harmony2 = (word: string): string => (isBack(word) ? 'a' : 'e');

/** 4-way harmony: returns ı / i / u / ü */
export const harmony4 = (word: string): string => {
  const v = lastVowel(word);
  if (v === 'a' || v === 'ı') return 'ı';
  if (v === 'e' || v === 'i') return 'i';
  if (v === 'o' || v === 'u') return 'u';
  return 'ü';
};

const endsWithVowel = (word: string): boolean => VOWELS.includes(word[word.length - 1]);

const isVoicelessFinal = (word: string): boolean => VOICELESS.includes(word[word.length - 1]);

/** d → t assimilation after voiceless consonants */
const dOrT = (stem: string): string => (isVoicelessFinal(stem) ? 't' : 'd');

/** Final consonant softening before a vowel-initial suffix: p→b ç→c t→d k→ğ */
export const soften = (word: string): string => {
  const map: Record<string, string> = { p: 'b', ç: 'c', t: 'd', k: 'ğ' };
  const last = word[word.length - 1];
  // Single-syllable words and proper loanwords usually resist softening,
  // but the common multisyllabic pattern is applied here.
  const vowelCount = [...word].filter(c => VOWELS.includes(c)).length;
  if (map[last] && vowelCount > 1) {
    if (last === 'k' && word.endsWith('nk')) return word;
    return word.slice(0, -1) + map[last];
  }
  return word;
};

/** Strip the -mek / -mak infinitive ending to get the verb stem */
export const verbStem = (infinitive: string): string =>
  infinitive.replace(/(mek|mak)$/, '');

/**
 * Split a lexicon verb entry into its non-conjugating head and the
 * conjugable infinitive, ignoring parenthetical clarifiers.
 * "randevu almak"   -> { head: 'randevu', infinitive: 'almak' }
 * "seçmek (ders)"   -> { head: '',        infinitive: 'seçmek' }
 * "kalkmak (araç)"  -> { head: '',        infinitive: 'kalkmak' }
 */
export const splitVerb = (raw: string): { head: string; infinitive: string; conjugable: boolean } => {
  const cleaned = raw.replace(/\(.*?\)/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = cleaned.split(' ').filter(Boolean);
  const infinitive = parts.length ? parts[parts.length - 1] : '';
  const head = parts.slice(0, -1).join(' ');
  return { head, infinitive, conjugable: /(mek|mak)$/.test(infinitive) };
};

// ---------- Irregular aorist verbs (take -ir instead of -ar) ----------
const AORIST_IR_EXCEPTIONS = new Set([
  'al', 'bil', 'bul', 'dur', 'gel', 'gör', 'kal', 'ol', 'öl', 'san', 'var', 'ver', 'vur'
]);

// Verbs whose stem shortens before a vowel-initial suffix (ye→yi, de→di)
const SHORT_STEMS: Record<string, string> = { ye: 'yi', de: 'di' };

/**
 * Monosyllabic stems ending in t that voice to d before a vowel-initial suffix.
 * gitmek → gidiyor / gider / gidecek,  etmek → ediyorum / eder / edecek
 */
const VOICING_STEMS: Record<string, string> = {
  git: 'gid', et: 'ed', tat: 'tad', güt: 'güd',
};

/** Apply t→d voicing when the next suffix begins with a vowel */
const voiceBeforeVowel = (stem: string): string => VOICING_STEMS[stem] || stem;

const countSyllables = (word: string): number => [...word].filter(c => VOWELS.includes(c)).length;

// ============================================================
// VERB CONJUGATION
// ============================================================

export type Person = 1 | 2 | 3 | 4 | 5 | 6; // ben, sen, o, biz, siz, onlar

export const PRONOUNS: Record<Person, string> = {
  1: 'ben', 2: 'sen', 3: 'o', 4: 'biz', 5: 'siz', 6: 'onlar'
};

export const PRONOUNS_EN: Record<Person, string> = {
  1: 'I', 2: 'you', 3: 'he/she', 4: 'we', 5: 'you (pl)', 6: 'they'
};

/** Type-1 personal endings (present, future, aorist, necessitative) */
const personalType1 = (stem: string, person: Person): string => {
  const h = harmony4(stem);
  switch (person) {
    case 1: return h + 'm';
    case 2: return 's' + h + 'n';
    case 3: return '';
    case 4: return h + 'z';
    case 5: return 's' + h + 'n' + h + 'z';
    case 6: return 'lar'.replace('a', harmony2(stem));
  }
};

/** Type-2 personal endings (definite past, conditional) */
const personalType2 = (stem: string, person: Person): string => {
  const h = harmony4(stem);
  switch (person) {
    case 1: return 'm';
    case 2: return 'n';
    case 3: return '';
    case 4: return 'k';
    case 5: return 'n' + h + 'z';
    case 6: return 'lar'.replace('a', harmony2(stem));
  }
};

/** Present continuous stem: gel → geliyor, başla → başlıyor, oku → okuyor */
export const presentContinuousStem = (infinitive: string, negative = false): string => {
  let stem = verbStem(infinitive);

  if (negative) {
    // negative marker -me/-ma collapses into -mi/-mı/-mu/-mü before -yor
    const neg = 'm' + harmony4(stem);
    return stem + neg + 'yor';
  }

  if (SHORT_STEMS[stem]) return SHORT_STEMS[stem] + 'yor';

  stem = voiceBeforeVowel(stem);
  if (endsWithVowel(stem)) stem = stem.slice(0, -1);
  return stem + harmony4(stem) + 'yor';
};

/** Aorist stem: yap → yapar, gel → gelir, bekle → bekler, çalış → çalışır */
export const aoristStem = (infinitive: string): string => {
  const raw = verbStem(infinitive);
  if (endsWithVowel(raw)) return raw + 'r';
  const stem = voiceBeforeVowel(raw);
  if (AORIST_IR_EXCEPTIONS.has(raw)) return stem + harmony4(stem) + 'r';
  if (countSyllables(raw) === 1) return stem + harmony2(stem) + 'r';
  return stem + harmony4(stem) + 'r';
};

/** Definite past: geldi, yaptı, okudu, gördü */
export const pastStem = (infinitive: string, negative = false): string => {
  let stem = verbStem(infinitive);
  if (negative) stem = stem + 'm' + harmony2(stem);
  return stem + dOrT(stem) + harmony4(stem);
};

/** Future: gelecek, yapacak, bekleyecek */
export const futureStem = (infinitive: string, negative = false): string => {
  let stem = verbStem(infinitive);
  if (negative) {
    stem = stem + 'm' + harmony2(stem);
  } else {
    // ye → yiyecek, de → diyecek, git → gidecek, et → edecek
    stem = SHORT_STEMS[stem] || voiceBeforeVowel(stem);
  }
  const a = harmony2(stem);
  const buffer = endsWithVowel(stem) ? 'y' : '';
  return stem + buffer + a + 'c' + a + 'k';
};

/** Necessitative (must/should): gelmeli, yapmalı */
export const necessitativeStem = (infinitive: string, negative = false): string => {
  let stem = verbStem(infinitive);
  if (negative) stem = stem + 'm' + harmony2(stem);
  const a = harmony2(stem);
  return stem + 'm' + a + 'l' + (a === 'a' ? 'ı' : 'i');
};

/** Ability (can): gelebil, yapabil — negative: gelemez pattern handled separately */
export const abilityStem = (infinitive: string): string => {
  const raw = verbStem(infinitive);
  const stem = SHORT_STEMS[raw] || voiceBeforeVowel(raw);
  const a = harmony2(stem);
  const buffer = endsWithVowel(stem) ? 'y' : '';
  return stem + buffer + a + 'bil';
};

export type Tense =
  | 'present'      // -iyor
  | 'aorist'       // -ir (habitual)
  | 'past'         // -di
  | 'future'       // -ecek
  | 'necessitative'// -meli
  | 'ability';     // -ebilir

export interface ConjugationRow {
  person: Person;
  pronoun: string;
  pronounEn: string;
  form: string;
  english: string;
}

const futurePersonal = (base: string, person: Person): string => {
  // gelecek + im → geleceğim (k softens to ğ before vowel)
  const soft = base.slice(0, -1) + 'ğ';
  const h = harmony4(base);
  switch (person) {
    case 1: return soft + h + 'm';
    case 2: return base + 's' + h + 'n';
    case 3: return base;
    case 4: return soft + h + 'z';
    case 5: return base + 's' + h + 'n' + h + 'z';
    case 6: return base + 'l' + harmony2(base) + 'r';
  }
};

export const conjugate = (
  infinitive: string,
  englishBase: string,
  tense: Tense,
  negative = false
): ConjugationRow[] => {
  const persons: Person[] = [1, 2, 3, 4, 5, 6];
  const verbEn = englishBase.replace(/^to\s+/, '');

  return persons.map((person): ConjugationRow => {
    let form = '';
    let english = '';
    const subj = PRONOUNS_EN[person];
    const s3 = person === 3 ? 's' : '';
    const isPlural = person !== 3;

    switch (tense) {
      case 'present': {
        const base = presentContinuousStem(infinitive, negative);
        form = base + personalType1(base, person);
        english = `${subj} ${isPlural ? 'are' : 'is'} ${negative ? 'not ' : ''}${verbEn}ing`;
        break;
      }
      case 'aorist': {
        if (negative) {
          const stem = verbStem(infinitive);
          const a = harmony2(stem);
          // ben gelmem / sen gelmezsin / o gelmez ...
          if (person === 1) form = stem + 'm' + a + 'm';
          else if (person === 4) form = stem + 'm' + a + 'y' + (a === 'a' ? 'ı' : 'i') + 'z';
          else {
            const neg = stem + 'm' + a + 'z';
            form = neg + personalType1(neg, person);
          }
        } else {
          const base = aoristStem(infinitive);
          form = base + personalType1(base, person);
        }
        english = `${subj} ${negative ? "do" + s3 + " not " : ''}${verbEn}${!negative && person === 3 ? 's' : ''}`;
        break;
      }
      case 'past': {
        const base = pastStem(infinitive, negative);
        form = base + personalType2(base, person);
        english = `${subj} ${negative ? 'did not ' + verbEn : verbEn + (verbEn.endsWith('e') ? 'd' : 'ed')}`;
        break;
      }
      case 'future': {
        const base = futureStem(infinitive, negative);
        form = futurePersonal(base, person);
        english = `${subj} will ${negative ? 'not ' : ''}${verbEn}`;
        break;
      }
      case 'necessitative': {
        const base = necessitativeStem(infinitive, negative);
        form = base + personalType1(base, person);
        english = `${subj} ${negative ? 'should not ' : 'must '}${verbEn}`;
        break;
      }
      case 'ability': {
        if (negative) {
          const stem = verbStem(infinitive);
          const a = harmony2(stem);
          const buffer = endsWithVowel(stem) ? 'y' : '';
          const neg = stem + buffer + a + 'm' + a + 'z';
          form = person === 1
            ? stem + buffer + a + 'm' + a + 'm'
            : neg + personalType1(neg, person);
        } else {
          const base = abilityStem(infinitive) + harmony4(infinitive) + 'r';
          form = base + personalType1(base, person);
        }
        english = `${subj} can${negative ? 'not' : ''} ${verbEn}`;
        break;
      }
    }

    return {
      person,
      pronoun: PRONOUNS[person],
      pronounEn: PRONOUNS_EN[person],
      form,
      english,
    };
  });
};

/** Polite imperative: gelin, yapın, bekleyin */
export const politeImperative = (infinitive: string): string => {
  const raw = verbStem(infinitive);
  const stem = voiceBeforeVowel(raw);
  const h = harmony4(stem);
  const buffer = endsWithVowel(stem) ? 'y' : '';
  return stem + buffer + h + 'n';
};

/** Question form of a conjugated 3rd person: geliyor mu? */
export const questionParticle = (word: string): string => 'm' + harmony4(word);

// ============================================================
// NOUN CASES & POSSESSIVES
// ============================================================

export type NounCase = 'nominative' | 'accusative' | 'dative' | 'locative' | 'ablative' | 'genitive' | 'plural' | 'with' | 'without';

export const applyCase = (noun: string, kase: NounCase): string => {
  const h4 = harmony4(noun);
  const h2 = harmony2(noun);
  const vowelFinal = endsWithVowel(noun);
  const softened = soften(noun);

  switch (kase) {
    case 'nominative':
      return noun;
    case 'plural':
      return noun + 'l' + h2 + 'r';
    case 'accusative':
      return vowelFinal ? noun + 'y' + h4 : softened + h4;
    case 'dative':
      return vowelFinal ? noun + 'y' + h2 : softened + h2;
    case 'locative':
      return noun + dOrT(noun) + h2;
    case 'ablative':
      return noun + dOrT(noun) + h2 + 'n';
    case 'genitive':
      return vowelFinal ? noun + 'n' + h4 + 'n' : softened + h4 + 'n';
    case 'with':
      return noun + (vowelFinal ? 'y' : '') + 'l' + h2;
    case 'without':
      return noun + 's' + h4 + 'z';
  }
};

export const CASE_LABELS: Record<NounCase, { label: string; meaning: string; example: string }> = {
  nominative: { label: 'Nominative', meaning: 'the thing itself (subject)', example: 'ev = house' },
  plural: { label: 'Plural -ler/-lar', meaning: 'more than one', example: 'evler = houses' },
  accusative: { label: 'Accusative -i', meaning: 'the specific object', example: 'evi = the house (obj)' },
  dative: { label: 'Dative -e', meaning: 'to / towards', example: 'eve = to the house' },
  locative: { label: 'Locative -de', meaning: 'in / at / on', example: 'evde = at the house' },
  ablative: { label: 'Ablative -den', meaning: 'from / out of', example: 'evden = from the house' },
  genitive: { label: 'Genitive -in', meaning: 'of / belonging to', example: 'evin = of the house' },
  with: { label: 'Instrumental -le', meaning: 'with / by means of', example: 'evle = with the house' },
  without: { label: 'Privative -siz', meaning: 'without', example: 'evsiz = homeless' },
};

/** Possessive forms: benim evim, senin evin ... */
export const possessive = (noun: string, person: Person): string => {
  const h4 = harmony4(noun);
  const vowelFinal = endsWithVowel(noun);
  const softened = soften(noun);
  switch (person) {
    case 1: return (vowelFinal ? noun : softened) + h4 + 'm';
    case 2: return (vowelFinal ? noun : softened) + h4 + 'n';
    case 3: return vowelFinal ? noun + 's' + h4 : softened + h4;
    case 4: return (vowelFinal ? noun : softened) + h4 + 'm' + h4 + 'z';
    case 5: return (vowelFinal ? noun : softened) + h4 + 'n' + h4 + 'z';
    case 6: return applyCase(noun, 'plural') + harmony4(noun === '' ? 'a' : applyCase(noun, 'plural')) + '';
  }
};

export const POSSESSIVE_PREFIX: Record<Person, string> = {
  1: 'benim', 2: 'senin', 3: 'onun', 4: 'bizim', 5: 'sizin', 6: 'onların'
};

// ============================================================
// PHONETIC TRANSCRIPT GENERATOR
// Produces English-readable syllable transcripts for any Turkish word
// ============================================================

const PHONETIC_MAP: Record<string, string> = {
  a: 'ah', e: 'eh', ı: 'uh', i: 'ee', o: 'oh', ö: 'ur', u: 'oo', ü: 'ew',
  c: 'j', ç: 'ch', ş: 'sh', ğ: '', j: 'zh', y: 'y', r: 'r', v: 'v',
};

/** Split a Turkish word into syllables (V / CV / CVC pattern) */
export const syllabify = (word: string): string[] => {
  const w = word.toLowerCase();
  const syllables: string[] = [];
  let current = '';
  let sawVowel = false;

  for (let i = 0; i < w.length; i++) {
    const ch = w[i];
    const isVowel = VOWELS.includes(ch);

    if (isVowel) {
      if (sawVowel) {
        syllables.push(current);
        current = ch;
      } else {
        current += ch;
        sawVowel = true;
      }
    } else {
      if (sawVowel) {
        // consonant after vowel: keep it if next char is a consonant or end
        const next = w[i + 1];
        if (next && VOWELS.includes(next)) {
          syllables.push(current);
          current = ch;
          sawVowel = false;
        } else {
          current += ch;
        }
      } else {
        current += ch;
      }
    }
  }
  if (current) syllables.push(current);
  return syllables.filter(Boolean);
};

/** Convert a Turkish word into an English-readable pronunciation transcript */
export const transcribe = (phrase: string): string =>
  phrase
    .split(/\s+/)
    .map(word => {
      const clean = word.replace(/[^a-zA-ZçğıİöşüÇĞÖŞÜ]/g, '');
      if (!clean) return word;
      const punctuation = word.slice(clean.length);
      const sylls = syllabify(clean.toLowerCase());
      const stressIndex = sylls.length - 1; // Turkish stress is usually final
      const rendered = sylls.map((syl, i) => {
        let out = '';
        for (const ch of syl) {
          out += PHONETIC_MAP[ch] !== undefined ? PHONETIC_MAP[ch] : ch;
        }
        return i === stressIndex && sylls.length > 1 ? out.toUpperCase() : out;
      });
      return rendered.join('-') + punctuation;
    })
    .join(' ');
