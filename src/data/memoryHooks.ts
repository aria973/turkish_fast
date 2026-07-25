// ============================================================
// NEUROSCIENCE-BASED MEMORY ENCODING LAYER
// Each hook uses the Keyword-Link Method (Atkinson & Raugh, 1975):
// an English sound-alike ("keyword") + a bizarre, vivid, emotional
// mental image. Bizarre + multisensory imagery activates the
// hippocampus far more strongly than rote repetition.
// ============================================================

export interface MemoryHook {
  /** vocabulary item id from data/vocabulary.ts */
  id: string;
  /** English sound-alike bridge word */
  soundsLike: string;
  /** the vivid absurd image to visualise (dual coding) */
  image: string;
  /** physical gesture — motor encoding creates a second retrieval route */
  gesture?: string;
  /** elaborative-interrogation prompt: forces "why" processing */
  whyPrompt?: string;
}

export const memoryHooks: MemoryHook[] = [
  // ---------- CORE ----------
  {
    id: 'core-3',
    soundsLike: 'Kolay = "cola-y"',
    image: 'You hand a worker an ice-cold COLA and their heavy job instantly becomes easy — "Kolay gelsin!" (may it come easy).',
    gesture: 'Mime passing someone a cold drink.',
    whyPrompt: 'Why would Turks greet workers by wishing ease rather than just saying hello?',
  },
  {
    id: 'core-1',
    soundsLike: 'Anlamıyorum = "on-LAMB-I-your-room"',
    image: 'A confused LAMB wanders into YOUR ROOM, tilts its head and bleats: "I don\'t understand!"',
    gesture: 'Tilt your head and shrug both shoulders.',
    whyPrompt: 'Why is admitting confusion early actually faster than nodding along?',
  },
  {
    id: 'core-2',
    soundsLike: 'öğreniyorum = "ur-GREEN-ee-your-room"',
    image: 'Turkish grammar books sprout GREEN vines all over YOUR ROOM as you learn — you are growing the language.',
    gesture: 'Grow your hands upward like a plant.',
  },

  // ---------- GREETINGS ----------
  {
    id: 'grt-1',
    soundsLike: 'Merhaba = "MER-haba"',
    image: 'A MERmaid says "ha-ha!" as she waves hello from the Bosphorus.',
    gesture: 'Wave with an open palm.',
  },
  {
    id: 'grt-2',
    soundsLike: 'teşekkür = "tea-shek-URE"',
    image: 'Someone pours you TEA and SHAKES your hand — you are SURE to say thanks.',
    gesture: 'Hand on heart — the Turkish thank-you gesture.',
    whyPrompt: 'Why does adding "Ya siz?" (and you?) make you sound instantly more fluent?',
  },
  {
    id: 'grt-4',
    soundsLike: 'Hoş geldiniz = "hosh geldiniz"',
    image: 'A HOST GELS your hair the moment you walk in — over-the-top Turkish hospitality.',
    gesture: 'Open both arms wide in welcome.',
  },
  {
    id: 'grt-6',
    soundsLike: 'Rica ederim = "REE-cha eder-im"',
    image: 'A RICH-uh man waves off your thanks: "it was nothing".',
  },

  // ---------- NAVIGATION ----------
  {
    id: 'nav-1',
    soundsLike: 'eczane = "edge-ZAH-neh"',
    image: 'A glowing green pharmacy cross sits on the EDGE of the street, lit up at 3am — the nöbetçi eczane.',
    gesture: 'Draw a cross in the air with your finger.',
    whyPrompt: 'Why must you learn "nöbetçi" and not just "eczane" before your first night in Turkey?',
  },
  {
    id: 'nav-3',
    soundsLike: 'sağa = "SAH-ah" (right) / sola = "SO-la" (left)',
    image: 'SAğa has an "a" like the RIGHT-hand "a" in hAnd; SOLa contains SOL — the sole of your LEFT foot.',
    gesture: 'Point right on "sağa", left on "sola" — say them aloud while pointing.',
  },
  {
    id: 'emg-2',
    soundsLike: 'hastane = "HAS-tah-neh"',
    image: 'The building that HAS TA(ken) everyone in a hurry — a hospital full of rushing stretchers.',
  },

  // ---------- TRANSIT ----------
  {
    id: 'tr-1',
    soundsLike: 'inebilir miyim = "in-eh-bee-LEER mee-yim"',
    image: 'A BEE flies INto the minibus and politely asks the driver if it may get off here.',
    gesture: 'Tap the roof twice like signalling a dolmuş driver.',
    whyPrompt: 'Why does the -ebilir (can/may) infix make almost any Turkish request polite?',
  },
  {
    id: 'tr-3',
    soundsLike: 'İstanbulkart',
    image: 'A giant blue CARD unlocks every turnstile, ferry and tram in Istanbul like a magic key.',
  },
  {
    id: 'tr-4',
    soundsLike: 'taksimetre = "taxi-metre"',
    image: 'A taxi meter shaped like a MEASURING TAPE unrolls lira by lira — if it is dark, your wallet is in danger.',
    gesture: 'Point at an imaginary dashboard meter.',
    whyPrompt: 'Why should you ask this BEFORE the car starts moving rather than after?',
  },
  {
    id: 'tr-6',
    soundsLike: 'inmeliyim = "in-meh-LEE-yim"',
    image: 'The -meli suffix is a tiny MEDAL of duty pinned on the verb: you MUST get off.',
  },

  // ---------- MONEY ----------
  {
    id: 'mon-1',
    soundsLike: 'temassız = "teh-mahs-SUHZ"',
    image: 'A card floats above the reader with NO TOUCH at all — temas (contact) + sız (without).',
    gesture: 'Tap an imaginary card in mid-air.',
    whyPrompt: 'Why does the -sız suffix turn any noun into "without X"? Try: şekersiz, etsiz, tuzsuz.',
  },
  {
    id: 'mon-2',
    soundsLike: 'hesap = "heh-SAHP"',
    image: 'The waiter brings the bill and your wallet lets out a SAP-py sigh.',
    gesture: 'Sign an invisible receipt in the air — the universal bill gesture.',
  },
  {
    id: 'mon-3',
    soundsLike: 'para üstü = "para OOS-too"',
    image: 'Your change (para) sits ON TOP (üstü) of the counter — literally "money on top".',
    whyPrompt: 'Why does softening a complaint with "galiba" (I suppose) get better results in Turkey?',
  },
  {
    id: 'mon-5',
    soundsLike: 'fiş = "FISH"',
    image: 'The cashier hands you a receipt shaped like a wriggling FISH — fiş = receipt.',
    gesture: 'Wiggle your hand like a swimming fish.',
  },

  // ---------- FOOD ----------
  {
    id: 'food-1',
    soundsLike: 'çay = "CHAI"',
    image: 'A tulip-shaped glass of CHAI appears in your hand every 20 minutes, everywhere you go in Turkey.',
    gesture: 'Pinch an imaginary tulip glass by the rim.',
  },
  {
    id: 'food-3',
    soundsLike: 'acısız = "ah-juh-SUHZ"',
    image: 'ACI (spicy pain) + SIZ (without) = your mouth is saved. The "sız" is a fire extinguisher.',
    whyPrompt: 'You met -sız in "temassız" too. What would "sütsüz" mean?',
  },
  {
    id: 'food-5',
    soundsLike: 'Elinize sağlık = "health to your hands"',
    image: 'You bless the cook\'s HANDS with a golden glow of health after a perfect meal.',
    gesture: 'Gesture both palms toward the cook.',
    whyPrompt: 'Why praise the hands instead of the food itself?',
  },

  // ---------- UNIVERSITY ----------
  {
    id: 'uni-1',
    soundsLike: 'Öğrenci İşleri = "ur-REN-jee ISH-leh-ree"',
    image: 'Students RENT a JEEP to drive between endless offices — Student Affairs never ends.',
  },
  {
    id: 'uni-2',
    soundsLike: 'almak istiyorum = "AL-mahk is-tee-YOR-um"',
    image: 'A robot named AL says "I STORE them" — the universal "I want to get..." formula.',
    whyPrompt: 'Swap the noun and reuse: belge / kart / randevu almak istiyorum. Why is this one pattern worth 100 phrases?',
  },
  {
    id: 'uni-6',
    soundsLike: 'burs = "BOORS"',
    image: 'A scholarship BURSts your money worries like a balloon — burs = bursary.',
  },

  // ---------- KIMLIK ----------
  {
    id: 'kim-1',
    soundsLike: 'ikamet = "ee-kah-MET"',
    image: 'You finally MET the officer who stamps where you may live — ikamet = residence.',
    gesture: 'Stamp your fist onto your palm.',
  },
  {
    id: 'kim-2',
    soundsLike: 'eksiksiz = "ek-SEEK-siz"',
    image: 'EKSİK (missing) + SİZ (without) = "without-missing" = complete. Your folder is bulletproof.',
    whyPrompt: 'Third time seeing -sız! Predict: şekersiz, sorunsuz, evsiz.',
  },
  {
    id: 'kim-4',
    soundsLike: 'ikametgah = "ee-kah-met-GAH"',
    image: 'A big GAH-rage where your official address lives, sealed and stamped.',
  },
  {
    id: 'kim-6',
    soundsLike: 'sağlık sigortası = "sah-LUHK see-gor-tah-suh"',
    image: 'A SACK of LUCK (sağlık = health) guarded by an insurance dragon — mandatory for your permit.',
    whyPrompt: 'Why will Göç İdaresi reject your file instantly without this one document?',
  },

  // ---------- EMERGENCY ----------
  {
    id: 'emg-1',
    soundsLike: 'Yardım = "yar-DUHM"',
    image: 'You shout across a YARD and someone DUMPS everything to run help you.',
    gesture: 'Raise one arm high and wave urgently.',
  },
  {
    id: 'emg-6',
    soundsLike: 'alerjim var = "ah-ler-ZHEEM var"',
    image: 'An ALLERGY ALARM (var = there is) blares red whenever the wrong pill appears.',
    whyPrompt: '"Var" means "there is/I have". How would you say "I have an appointment"? (randevum var)',
  },

  // ---------- SERVICES / HOUSING ----------
  {
    id: 'svc-1',
    soundsLike: 'hat = "HAHT"',
    image: 'Your phone line is a glowing HAT you wear — buy a "turist hattı" at the airport.',
  },
  {
    id: 'svc-5',
    soundsLike: 'e-devlet = "eh-dev-LET"',
    image: 'A digital STATE (devlet) inside your phone that LETs you do every bureaucratic task from bed.',
    whyPrompt: 'Why is the PTT queue for an e-devlet password the highest-value hour of your first week?',
  },
  {
    id: 'hou-1',
    soundsLike: 'kira = "KEE-rah"',
    image: 'You need the KEY (kira) and the rent is what buys it each month.',
  },
  {
    id: 'hou-3',
    soundsLike: 'faturalar = "fah-too-rah-LAHR"',
    image: 'Your FUTURE (fatura) arrives monthly as a stack of bills in the letterbox.',
  },
];

export const hooksById: Record<string, MemoryHook> = memoryHooks.reduce((acc, h) => {
  acc[h.id] = h;
  return acc;
}, {} as Record<string, MemoryHook>);

// ============================================================
// THE SCIENCE — shown to the learner so they trust the method
// ============================================================

export interface BrainMethod {
  id: string;
  icon: string;
  name: string;
  finding: string;
  howAppUses: string;
  doThis: string;
}

export const brainMethods: BrainMethod[] = [
  {
    id: 'retrieval',
    icon: '🎯',
    name: 'Active Recall (Testing Effect)',
    finding: 'Roediger & Karpicke (2006): students who self-tested remembered 50% more after a week than students who re-read the same material — even though re-readers felt more confident.',
    howAppUses: 'Every Learn card hides the Turkish until you have tried to produce it. Quizzes force retrieval, never recognition-only.',
    doThis: 'Always attempt the answer out loud BEFORE flipping. The struggle itself is what builds the memory.',
  },
  {
    id: 'spacing',
    icon: '📆',
    name: 'Spaced Repetition',
    finding: 'Ebbinghaus\' forgetting curve shows ~70% loss within 24h. Cepeda et al. (2008): spacing reviews at expanding intervals can triple long-term retention versus massed cramming.',
    howAppUses: 'Smart Review schedules each phrase at 10 min → 1 day → 3 days → 7 days → 21 days, and resets anything you get wrong.',
    doThis: 'Do the Smart Review whenever the badge shows cards are due — even just 5 of them.',
  },
  {
    id: 'keyword',
    icon: '🖼️',
    name: 'Keyword-Link Mnemonics',
    finding: 'Atkinson & Raugh (1975) taught Russian vocabulary with sound-alike keyword images and saw recall jump from 46% to 72%.',
    howAppUses: 'High-value phrases carry a "Memory Hook": an English sound-alike plus a deliberately bizarre mental picture.',
    doThis: 'Spend 5 seconds actually SEEING the absurd image. Vague imagining does nothing; vivid imagining does everything.',
  },
  {
    id: 'dualcoding',
    icon: '🧩',
    name: 'Dual Coding + Motor Encoding',
    finding: 'Paivio\'s dual-coding theory: verbal + visual traces create two retrieval paths. Adding gesture (Macedonia, 2011) boosts foreign-word recall further still.',
    howAppUses: 'Hooks pair text with imagery and a physical gesture you perform while saying the phrase.',
    doThis: 'Actually do the gesture. Your body becomes a second memory.',
  },
  {
    id: 'elaboration',
    icon: '❓',
    name: 'Elaborative Interrogation',
    finding: 'Pressley et al. (1987): asking "why is this true?" while learning roughly doubles retention versus passive study.',
    howAppUses: 'Memory hooks include a "Why?" prompt that connects the phrase to Turkish culture or to a suffix you already met.',
    doThis: 'Answer the Why-prompt in your head in one sentence. Do not skip it.',
  },
  {
    id: 'interleaving',
    icon: '🔀',
    name: 'Interleaving',
    finding: 'Rohrer & Taylor (2007): mixing problem types felt harder during practice but produced far better test performance than blocked practice.',
    howAppUses: 'Quiz, Read and Boss sessions shuffle categories together and pull distractors from the whole course, not just one part.',
    doThis: 'Resist the urge to drill one topic to perfection. Mixed practice feels worse and works better.',
  },
  {
    id: 'difficulty',
    icon: '🏋️',
    name: 'Desirable Difficulty',
    finding: 'Bjork & Bjork: conditions that slow acquisition (harder retrieval, delays) reliably improve long-term retention and transfer.',
    howAppUses: 'The Boss session makes you rebuild the word letter-by-letter instead of just recognising it.',
    doThis: 'If a session feels easy, you are not learning much. Choose the harder mode.',
  },
  {
    id: 'chunking',
    icon: '🧱',
    name: 'Chunking',
    finding: 'Miller\'s classic limit (~4–7 items in working memory) means whole phrases stored as one chunk cost no more than a single word.',
    howAppUses: 'You learn complete usable sentences ("Müsait bir yerde inebilir miyim?") rather than isolated vocabulary.',
    doThis: 'Never memorise bare words — memorise the sentence you will actually say.',
  },
  {
    id: 'sleep',
    icon: '😴',
    name: 'Sleep Consolidation',
    finding: 'Born & Wilhelm (2012): hippocampal replay during slow-wave sleep transfers new memories to the neocortex. Material reviewed shortly before sleep is consolidated best.',
    howAppUses: 'Daily goals are small enough to finish in one evening sitting.',
    doThis: 'Do one short review in the last hour before bed. Your brain rehearses it for free overnight.',
  },
  {
    id: 'emotion',
    icon: '⚡',
    name: 'Emotional & Contextual Salience',
    finding: 'Amygdala activation tags emotional events for priority storage; context-dependent memory research shows recall is best in the setting where learning happened.',
    howAppUses: 'Everything is framed as a real crisis you will face — the dolmuş, the Göç İdaresi counter, the taxi meter.',
    doThis: 'Picture the actual place and your nervousness while rehearsing. Emotion is memory glue.',
  },
];

// Quick study-protocol summary shown on the Course tab
export const studyProtocol = [
  { step: 1, title: 'Encode', detail: 'Read the hook, SEE the bizarre image, do the gesture.', mins: '2 min' },
  { step: 2, title: 'Retrieve', detail: 'Cover the Turkish and say it aloud before flipping.', mins: '3 min' },
  { step: 3, title: 'Interleave', detail: 'Run Quiz + Read sessions that mix topics.', mins: '5 min' },
  { step: 4, title: 'Space', detail: 'Return for Smart Review when cards fall due.', mins: '4 min' },
  { step: 5, title: 'Sleep', detail: 'Final quick review in the hour before bed.', mins: '2 min' },
];
