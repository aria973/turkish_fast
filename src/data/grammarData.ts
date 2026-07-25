import { GrammarTip } from '../types';

export const grammarTips: GrammarTip[] = [
  {
    id: 'g-1',
    title: 'The LEGO Structure of Turkish (Agglutination)',
    turkishHook: 'Ev-ler-im-iz-de (In our houses)',
    simpleExplanation: 'Turkish does not put separate prepositions like "in", "to", "my", "from" before words. Instead, words are LEGO base plates where you snap short suffixes onto the tail end in logical sequence: [Root Word] + [Plural] + [Ownership] + [Location].',
    exampleTable: [
      { turkish: 'Ev', english: 'House (Root)', formula: 'Root' },
      { turkish: 'Evler', english: 'Houses', formula: 'Ev + ler (Plural Suffix)' },
      { turkish: 'Evlerim', english: 'My houses', formula: 'Evler + im (My ownership)' },
      { turkish: 'Evlerimizde', english: 'In our houses', formula: 'Evler + imiz (our) + de (in/at)' }
    ],
    secretHack: 'Once you recognize location tags (-de/-da = IN/AT, -den/-dan = FROM, -e/-a = TOWARDS), you can instantly read airport, university, and street signage without a dictionary!'
  },
  {
    id: 'g-2',
    title: 'The "2-Way & 4-Way" Vowel Harmony Cheat Code',
    turkishHook: 'Neden "Evler" ama "Arabalar"? (Why Evler vs Arabalar?)',
    simpleExplanation: 'Turkish is mathematically obsessed with smooth vocal flow and mouth acoustics. Vowels split into two simple families: FRONT (E, İ, Ö, Ü = Soft/Smiling mouth) and BACK (A, I, O, U = Open/Deep mouth). Suffixes automatically match the sound of the word’s final vowel!',
    exampleTable: [
      { turkish: 'Üniversite + de → Üniversitede', english: 'At the university', formula: 'Final vowel "e" is FRONT → Add soft "-de" (In/At)' },
      { turkish: 'Hastane + e → HastaneyE (Buffer y + e)', english: 'To the hospital', formula: 'Front vowel → soft direction suffix "-e"' },
      { turkish: 'Okul + da → Okulda', english: 'At the school', formula: 'Final vowel "u" is BACK → Add deep "-da" (In/At)' },
      { turkish: 'İkametgah + a → İkametgahA', english: 'To the address registry', formula: 'Back vowel "a" → deep direction suffix "-a"' }
    ],
    secretHack: 'Never memorize exhausting grammar charts! Just trust your ear: if a word sounds soft and bright (e, i, ü), plug on an "e" or "i" suffix. If it sounds deep and open (a, o, u), snap on an "a" or "ı" suffix!'
  },
  {
    id: 'g-3',
    title: 'The Magic Politeness Multiplier (-ebil / -abil)',
    turkishHook: 'Al-a-bi-lir mi-yim? (Can I possibly take?)',
    simpleExplanation: 'When talking to university deans, migration officers, or taxi drivers, turning any verb into a polite question requires just inserting "-abil" or "-ebil" (can / may I) right before the ending.',
    exampleTable: [
      { turkish: 'İnemek → İnebilir miyim?', english: 'May I get off? (Dolmuş standard)', formula: 'İn (alight) + ebil (can) + ir (present) + miyim (I question)' },
      { turkish: 'Geçmek → Geçebilir miyim?', english: 'May I pass / go through?', formula: 'Geç (pass) + ebil (can) + miyim?' },
      { turkish: 'Sorabili-r miyim?', english: 'May I ask a question?', formula: 'Sor (ask) + abil (can) + ir miyim?' }
    ],
    secretHack: 'Whenever you need help from a busy official, say "[Verb]-abilir miyim?". It sounds instantly highly cultured, formal, and appreciative!'
  },
  {
    id: 'g-4',
    title: 'Pronunciation Hacks: Soft G (Ğ), C vs Ç, Ş vs S, I vs İ',
    turkishHook: 'Öğretmen, Çamlıca, Şahin, Akıl vs Fikir',
    simpleExplanation: 'Turkish alphabet is 100% phonetic (read exactly as written!), but four letters regularly trip up English speakers. Once you learn these four shortcuts, you will pronounce Turkish names and places with zero accent errors!',
    exampleTable: [
      { turkish: 'Ğ / ğ (Yumuşak G / Soft G)', english: 'SILENT! It extends the vowel before it.', formula: 'Öğrenci (Student) is pronounced "Oh-ren-ji" (hold O slightly longer).' },
      { turkish: 'C / c vs Ç / ç', english: 'C = English "J" in Jam! Ç = English "CH" in Chair!', formula: 'Cami (Mosque) = "Jami", Kadıköy = normal, Çay (Tea) = "Chai".' },
      { turkish: 'Ş / ş', english: 'SH sound like in Shine or Sugar.', formula: 'Beşiktaş = "Be-shik-tash", Fiş (Receipt) = "Fish".' },
      { turkish: 'I / ı (No Dot) vs İ / i (With Dot)', english: 'Dotless ı is deep schwa / uh / ih sound! Dotted i is sharp "EE" sound!', formula: 'Akıl = "Ah-kuhl", İkinci = "Ee-keen-ji". Notice dot remains capitalized: İ vs I!' }
    ],
    secretHack: 'Always inspect the "İ" vs "I" dots even in capital letters! In Turkish keyboards and signs, capital of i is İ (with a dot on top!), and capital of dotless ı is I (no dot!).'
  }
];
