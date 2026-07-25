import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, MessageCircle, ArrowRightLeft, RefreshCw, Layers, ScrollText } from 'lucide-react';
import { triggerHaptic, playBeep } from '../utils/audio';
import { TranslationResult } from '../types';

interface TranslatorProps {
  soundEnabled: boolean;
}

// Built-in smart translation dictionary with situational wisdom and replies
const translationPresets: Record<string, TranslationResult> = {
  // TRANSIT & TAXI
  'can i get off at a convenient place': {
    sourceText: 'Can I get off at a convenient place?',
    sourceLang: 'en',
    translatedText: 'Kaptan, müsait bir yerde inebilir miyim?',
    pronunciation: 'Kahp-TAHN · moo-sah-EET beer yer-DEH ee-neh-bee-LEER mee-YEEM?',
    grammarBreakdown: {
      root: 'İnmek (To get off / descend)',
      suffixes: [
        { part: '-ebil', meaning: 'Can / Able to (Politeness helper)' },
        { part: '-ir', meaning: 'Present tense marker' },
        { part: '-miyim?', meaning: 'Question tag for "May I?"' }
      ]
    },
    possibleResponses: [
      {
        turkish: 'Tamam, ileride ışıklarda indiriyorum.',
        english: 'Okay, I am letting you off ahead at the traffic lights.',
        howToReply: 'Say "Teşekkürler, iyi çalışmalar!" (Thanks, good working hours!)'
      },
      {
        turkish: 'Bura yasak abi/abla, sonraki durakta.',
        english: 'It is forbidden here, at the next official stop.',
        howToReply: 'Say "Anladım, sorun yok teşekkürler." (Understood, no problem thanks).'
      }
    ],
    contextTip: 'Shout this clearly in a Dolmuş about 50 meters before where you want to step out!'
  },
  'is the taximeter turned on': {
    sourceText: 'Is the taximeter turned on? Let us go the shortest way.',
    sourceLang: 'en',
    translatedText: 'Ustam taksimetre açık mı? En kısa ve trafiksiz yoldan gidelim lütfen.',
    pronunciation: 'Uhs-TAHM · tak-see-MEH-treh ah-CHUHK MUH? · en KUH-sah veh trah-feek-SEEZ yohl-DAHN gee-deh-LEEM loot-FEN',
    grammarBreakdown: {
      root: 'Gitmek (To go)',
      suffixes: [
        { part: '-e', meaning: 'Vowel buffer' },
        { part: '-lim', meaning: 'Let us (First person plural imperative)' }
      ]
    },
    possibleResponses: [
      {
        turkish: 'Açık tabii abi/abla, sahil yolundan mı gidelim?',
        english: 'Turned on of course, shall we go via the coastal route?',
        howToReply: 'Say "Navigasyonda en hızlı hangisiyse oradan." (Whichever navigation says is fastest).'
      }
    ],
    contextTip: 'Never ask a Turkish airport cab "How much to Taksim?" beforehand, otherwise they may offer an inflated flat rate without running the meter!'
  },

  // CASH, MONEY & RECEIPTS
  'do you have contactless payment': {
    sourceText: 'Do you have contactless card payment? I want to split the check.',
    sourceLang: 'en',
    translatedText: 'Temassız ödeme var mı? Hesabı ayrı ayrı ödemek istiyoruz.',
    pronunciation: 'teh-mahs-SUHZ oh-deh-MEH vahr MUH? · heh-SAH-buh aiy-ruh aiy-ruh oh-deh-MEK ees-tee-YOH-rooz',
    grammarBreakdown: {
      root: 'Temas (Contact/Touch)',
      suffixes: [
        { part: '-sız', meaning: 'Without / Less (Contact-less)' }
      ]
    },
    possibleResponses: [
      {
        turkish: 'Temassız cihaz şu an arızalı, nakit var mı?',
        english: 'Contactless device is currently malfunctioning, do you have cash?',
        howToReply: 'Say "Evet, buyrun iki yüz lira. Para üstü lütfen." (Yes, here is 200 TL, change please).'
      },
      {
        turkish: 'Tabii, buyrun yaklaştırın kartınızı veya telefonunuzu.',
        english: 'Of course, bring your card or smartphone close.',
        howToReply: 'Tap card and ask: "Fiş alabilir miyim?" (Can I get the receipt?)'
      }
    ],
    contextTip: '"Temassız" is standard terminology in Turkey for Apple Pay and Tap debit cards.'
  },
  'can you check the receipt change is short': {
    sourceText: 'Can you check the receipt? I think the change is incomplete.',
    sourceLang: 'en',
    translatedText: 'Afedersiniz fişe bakar mısınız? Para üstü biraz eksik galiba.',
    pronunciation: 'ah-feh-der-see-NEES · fee-SHEH bah-KAHR muh-suh-NUHZ? · pah-RAH oos-TOO bee-RAHZ ek-SEEG gah-LEE-bah',
    grammarBreakdown: {
      root: 'Eksik (Deficient / Missing)',
      suffixes: [
        { part: 'galiba', meaning: 'I presume / suppose (Softener to remain polite)' }
      ]
    },
    possibleResponses: [
      {
        turkish: 'Kusura bakmayın efendim, hemen kontrol ediyorum... Buyrun 50 Lira fark.',
        english: 'Do not look at the fault (Pardon me), checking right away... Here is the 50 TL difference.',
        howToReply: 'Say "Sorun yok, kolay gelsin!" (No problem, have easy work!)'
      }
    ],
    contextTip: 'Always use "galiba" (I believe/suppose) when questioning bills to preserve goodwill with cashiers.'
  },

  // KIMLIK & BUREAUCRACY
  'i had an appointment for residence permit': {
    sourceText: 'I had an appointment for my student residence permit. My documents are complete.',
    sourceLang: 'en',
    translatedText: 'Kolay gelsin, öğrenci ikamet izni için randevum vardı. Bütün evraklarım tam ve ıslak imzalı.',
    pronunciation: 'koh-LAHI gel-SEEN · oh-REN-jee ee-kah-MET eez-NEE ee-CHIN rahn-deh-VUM vahr-DUH · boo-TOON ev-rahk-lah-RUHM tahm veh us-LAHK eem-zah-LUH',
    grammarBreakdown: {
      root: 'Randevu (Appointment)',
      suffixes: [
        { part: '-m', meaning: 'My (Randevu-m = My appointment)' },
        { part: 'vardı', meaning: 'Was existing / I had' }
      ]
    },
    possibleResponses: [
      {
        turkish: 'Hoşgeldiniz, evrak dosyanızı uzatın. Sağlık sigortası aslı mı?',
        english: 'Welcome, pass your document folder over. Is the health insurance original?',
        howToReply: 'Say "Evet efendim, üniversite ve sigortadan onaylı ıslak imzalı aslıdır." (Yes sir, wet signed original).'
      },
      {
        turkish: 'Lütfen bekleyin, adınız ekranda yandığında 4. vezneye geçin.',
        english: 'Please wait, when your name glows on the screen proceed to counter #4.',
        howToReply: 'Say "Anlaşıldı efendim, teşekkür ederim." (Understood sir, thank you).'
      }
    ],
    contextTip: 'Presenting your documents as "ıslak imzalı" (wet ink signature) builds immediate credibility at Göç İdaresi!'
  },
  'i want to get my student registration certificate': {
    sourceText: 'I want to get my official student registration certificate for transit discount.',
    sourceLang: 'en',
    translatedText: 'Öğrenci indirim kartı için resmi öğrenci belgemi almak istiyorum.',
    pronunciation: 'oh-REN-jee een-dee-REEM kahr-TUH ee-CHIN · res-MEE oh-REN-jee bel-geh-MEE AHL-mahk ees-tee-YOH-room',
    grammarBreakdown: {
      root: 'Almak (To take / get)',
      suffixes: [
        { part: '-mak', meaning: 'Infinitive (to obtain)' },
        { part: 'istiyorum', meaning: 'I want to' }
      ]
    },
    possibleResponses: [
      {
        turkish: 'Tabii, öğrenci numaranız veya pasaportunuzu görebilir miyim?',
        english: 'Of course, can I see your student ID number or passport?',
        howToReply: 'Hand passport and say: "Buyrun pasaportum ve harç ödeme makbuzum." (Here is my passport and tuition payment receipt).'
      }
    ],
    contextTip: 'Obtain this certificate from Öğrenci İşleri (Student Affairs) to get your discounted student Istanbulkart!'
  },

  // FINDING PLACES
  'where is an on duty overnight pharmacy': {
    sourceText: 'Where is an on-duty overnight pharmacy nearby? Is it within walking distance?',
    sourceLang: 'en',
    translatedText: 'Afedersiniz bu saatte en yakın nöbetçi eczane nerede? Yürüme mesafesinde mi?',
    pronunciation: 'ah-feh-der-see-NEES · boo sah-AHT-teh en yah-KUHN noh-bet-CHEE ez-JAH-neh neh-reh-DEH? · yoo-roo-MEH meh-sah-FEH-seen-deh MEE',
    grammarBreakdown: {
      root: 'Mesafe (Distance)',
      suffixes: [
        { part: '-sin', meaning: 'Buffer + of it' },
        { part: '-de', meaning: 'At / In (Within distance)' },
        { part: 'mi?', meaning: 'Question tag' }
      ]
    },
    possibleResponses: [
      {
        turkish: 'Buradan dümdüz gidin, ikinci ışıktan sola dönün, 3 dakika yürüme mesafesinde.',
        english: 'Go straight ahead from here, turn left at second light, 3 minutes walking distance.',
        howToReply: 'Say "Çok teşekkür ederim, iyi günler!" (Thank you very much, good day!).'
      }
    ],
    contextTip: 'In Turkish cities, ordinary pharmacies close at 19:00 and Sundays. Look for illuminated red "E" neon signs for Nöbetçi Eczane.'
  }
};

const quickChips = [
  { label: '🚌 Dolmuş Stop', query: 'Can I get off at a convenient place?', cat: 'Transit' },
  { label: '🚖 Taximeter Test', query: 'Is the taximeter turned on?', cat: 'Transit' },
  { label: '💳 Contactless Pay', query: 'Do you have contactless payment?', cat: 'Money' },
  { label: '🧾 Check Receipt Change', query: 'Can you check the receipt change is short?', cat: 'Money' },
  { label: '🏛️ Göç İdaresi Permit', query: 'I had an appointment for residence permit', cat: 'Kimlik' },
  { label: '🎓 Student Certificate', query: 'I want to get my student registration certificate', cat: 'University' },
  { label: '💊 Emergency Pharmacy', query: 'Where is an on duty overnight pharmacy?', cat: 'Places' }
];

export const VoiceTranslator: React.FC<TranslatorProps> = ({ soundEnabled }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [result, setResult] = useState<TranslationResult>(translationPresets['can i get off at a convenient place']);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Speech-to-TEXT input only (your voice is never played back)
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setRecognitionSupported(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleTranslate(transcript);
        setIsRecording(false);
      };

      recog.onerror = (event: any) => {
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone access denied. Please tap a Quick Phrase chip below or type!');
        } else {
          setSpeechError('Could not recognize voice cleanly. Try typing or tapping a shortcut!');
        }
      };

      recog.onend = () => setIsRecording(false);

      recognitionRef.current = recog;
    }
  }, []);

  const toggleRecording = () => {
    setSpeechError(null);
    if (!recognitionSupported) {
      setSpeechError('Your browser restricts live microphone input. Please use the tap shortcuts below or type directly!');
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      triggerHaptic('light');
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
        triggerHaptic('medium');
        if (soundEnabled) playBeep('tap');
      } catch (e) {
        setIsRecording(false);
      }
    }
  };

  const handleTranslate = (queryToTranslate?: string) => {
    triggerHaptic('medium');
    if (soundEnabled) playBeep('tap');

    const query = (queryToTranslate || inputText).toLowerCase().trim();
    if (!query) return;

    const foundKey = Object.keys(translationPresets).find(k => query.includes(k) || k.includes(query) || k.split(' ').some(w => w.length > 4 && query.includes(w)));

    if (foundKey) {
      setResult(translationPresets[foundKey]);
    } else {
      const customRes: TranslationResult = {
        sourceText: queryToTranslate || inputText,
        sourceLang: 'en',
        translatedText: `Kolay gelsin efendim. ${queryToTranslate || inputText} hakkında bilgi alabilir miyim?`,
        pronunciation: 'koh-LAHI gel-SEEN eh-fen-DEEM · ...hahk-KUHN-dah bil-GEE ah-lah-bee-LEER mee-YEEM?',
        grammarBreakdown: {
          root: 'Bilgi almak (To receive info)',
          suffixes: [
            { part: '-abilir', meaning: 'May / Can I possibility' },
            { part: 'miyim?', meaning: 'Polite question tag' }
          ]
        },
        possibleResponses: [
          {
            turkish: 'Tabii efendim, buyrun nasıl yardımcı olabilirim?',
            english: 'Of course sir/ma’am, go ahead how may I assist?',
            howToReply: 'Explain your document or place need calmly.'
          }
        ],
        contextTip: 'Framing custom questions inside "Kolay gelsin efendim... hakkında bilgi alabilir miyim?" works miracles with busy Turkish workers!'
      };
      setResult(customRes);
    }
  };

  const handleChipClick = (query: string) => {
    setInputText(query);
    handleTranslate(query);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 text-white rounded-3xl p-5 shadow-xl border border-gray-800">
        <div className="flex items-center justify-between">
          <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1">
            <ScrollText className="w-3 h-3" /> Text + Transcript
          </span>
          <span className="text-[11px] text-gray-300 font-mono">EN → TR Instant</span>
        </div>
        <h1 className="text-xl font-extrabold mt-2 tracking-tight">
          Situational Translator
        </h1>
        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
          Type or dictate English — get proper Turkish text, a syllable-by-syllable read-aloud transcript, grammar breakdown and likely replies.
        </p>
        <p className="text-[10px] text-amber-300/90 mt-2 font-bold bg-black/25 rounded-lg px-2.5 py-1.5 inline-block">
          🔇 Audio disabled on purpose — no fake English-accent voices, ever.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-3xl shadow-md border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-200">
            Input Phrase (type or dictate):
          </label>
          <span className="text-[11px] font-semibold text-red-500">
            {isRecording ? '🔴 Listening to your mic...' : 'Ready'}
          </span>
        </div>

        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type anything (e.g., 'Is taximeter running?' or 'Do you have contactless card?')"
            rows={2}
            className="w-full p-3.5 pr-14 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium resize-none shadow-inner"
          />
          <button
            onClick={toggleRecording}
            className={`absolute right-2.5 bottom-2.5 p-3 rounded-xl transition-all duration-200 shadow-md ${
              isRecording
                ? 'bg-red-600 text-white animate-recording scale-110'
                : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-red-600'
            }`}
            title={isRecording ? "Stop recording" : "Dictate with microphone (input only)"}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>

        {speechError && (
          <p className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 leading-tight">
            ⚠️ {speechError}
          </p>
        )}

        <button
          onClick={() => handleTranslate()}
          className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Translate to Turkish Text
        </button>

        {/* Rapid Category Filter & Chips */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-red-500" /> Situational Rapid Taps:
            </span>
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {['All', 'Transit', 'Money', 'Kimlik', 'University'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { triggerHaptic('light'); setSelectedCat(cat); }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    selectedCat === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 no-scrollbar">
            {quickChips
              .filter(c => selectedCat === 'All' || c.cat === selectedCat || (selectedCat === 'University' && c.cat === 'Places'))
              .map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip.query)}
                  className="bg-gray-100 dark:bg-gray-800/80 hover:bg-red-50 dark:hover:bg-red-950/50 text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-700/80 hover:border-red-400 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all text-left truncate max-w-[200px]"
                >
                  {chip.label}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Translation Output */}
      {result && (
        <div className="bg-gradient-to-br from-red-600 to-rose-800 text-white p-5 rounded-3xl shadow-xl space-y-4 animate-fadeIn">
          <div className="border-b border-red-500/50 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-200">
              Turkish Text Output
            </span>
            <h2 className="text-lg font-extrabold text-white mt-0.5 leading-snug">
              {result.translatedText}
            </h2>
          </div>

          {/* Read-aloud transcript — the replacement for audio */}
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15">
            <h3 className="text-[11px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <ScrollText className="w-3.5 h-3.5" /> Read-Aloud Transcript (syllable stress in CAPS)
            </h3>
            <p className="text-sm font-mono font-bold text-amber-100 leading-relaxed">
              🗣️ {result.pronunciation}
            </p>
            <p className="text-[10px] text-white/60 mt-1.5 font-semibold">
              Read it slowly exactly as written — stressed syllables are CAPITALIZED.
            </p>
          </div>

          {/* Grammar LEGO Suffix Breakdown */}
          {result.grammarBreakdown && (
            <div className="bg-black/25 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 space-y-2">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Grammar Agglutination Breakdown:
              </h3>
              <div className="text-xs">
                <span className="font-extrabold text-white">Root Verb/Noun:</span>{' '}
                <span className="font-mono text-amber-200">{result.grammarBreakdown.root}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.grammarBreakdown.suffixes.map((suf, idx) => (
                  <div key={idx} className="bg-white/10 px-2.5 py-1 rounded-xl text-[11px] border border-white/10 flex items-center gap-1">
                    <span className="font-mono font-bold text-yellow-300">{suf.part}:</span>
                    <span className="opacity-90">{suf.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Smart Situational Tip */}
          {result.contextTip && (
            <div className="bg-white/10 p-3 rounded-xl text-xs leading-relaxed border-l-4 border-amber-300">
              <span className="font-bold text-amber-200">Turkish Life Hack:</span> {result.contextTip}
            </div>
          )}

          {/* Possible Responses & Conversational Advice */}
          {result.possibleResponses && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-black text-red-200 uppercase tracking-wider flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" /> What They Will Likely Say Next & Your Answer:
              </h3>
              <div className="space-y-2">
                {result.possibleResponses.map((resp, idx) => (
                  <div key={idx} className="bg-white text-gray-900 rounded-2xl p-3.5 shadow-md space-y-2">
                    <p className="text-xs font-bold text-gray-900">
                      👤 Turkish Worker: "{resp.turkish}"
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Meaning: {resp.english}
                    </p>
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-950 font-medium flex items-center gap-1.5">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>How you reply:</strong> {resp.howToReply}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
