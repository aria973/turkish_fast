import React, { useState } from 'react';
import { grammarTips } from '../data/grammarData';
import { magicWords } from '../data/vocabulary';
import { triggerHaptic, playBeep } from '../utils/audio';
import { Sparkles, Wand2, Star } from 'lucide-react';

interface GrammarProps {
  soundEnabled: boolean;
}

export const GrammarAndTips: React.FC<GrammarProps> = ({ soundEnabled }) => {
  const [selectedSection, setSelectedSection] = useState<'lego' | 'magic-words' | 'etiquette'>('lego');

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-red-900 text-white rounded-3xl p-5 shadow-xl border border-purple-800">
        <div className="flex items-center justify-between">
          <span className="bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-amber-950" /> Hacks & Cheat Codes
          </span>
          <span className="text-xs text-purple-200 font-bold">Fast-Track Rules</span>
        </div>
        <h1 className="text-xl font-extrabold mt-2 tracking-tight">
          Grammar Hacks & Secret Tips
        </h1>
        <p className="text-xs text-purple-200 mt-1 leading-relaxed">
          Forget boring university textbooks! Master Turkish agglutination Lego blocks and the 8 Magic Words that solve 90% of real-life situations.
        </p>

        {/* Navigation Section Picker */}
        <div className="grid grid-cols-3 gap-1.5 mt-4 bg-black/35 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => { triggerHaptic('light'); if (soundEnabled) playBeep('tap'); setSelectedSection('lego'); }}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedSection === 'lego' ? 'bg-purple-600 text-white shadow' : 'text-gray-300 hover:text-white'
            }`}
          >
            🧩 LEGO Grammar
          </button>
          <button
            onClick={() => { triggerHaptic('light'); if (soundEnabled) playBeep('tap'); setSelectedSection('magic-words'); }}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedSection === 'magic-words' ? 'bg-purple-600 text-white shadow' : 'text-gray-300 hover:text-white'
            }`}
          >
            🪄 8 Magic Words
          </button>
          <button
            onClick={() => { triggerHaptic('light'); if (soundEnabled) playBeep('tap'); setSelectedSection('etiquette'); }}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedSection === 'etiquette' ? 'bg-purple-600 text-white shadow' : 'text-gray-300 hover:text-white'
            }`}
          >
            🤝 Social Titles
          </button>
        </div>
      </div>

      {selectedSection === 'lego' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 px-1 flex items-center gap-1.5">
            <Wand2 className="w-4 h-4 text-purple-600" /> Agglutination & Vowel Harmony Simplified
          </h2>

          {grammarTips.map((tip) => (
            <div key={tip.id} className="bg-white dark:bg-[#2c2c2e] p-5 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-3.5">
              <div className="flex items-start justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                    Grammar Hack #{tip.id.replace('g-', '')}
                  </span>
                  <h3 className="text-base font-black text-gray-900 dark:text-white leading-snug mt-0.5">
                    {tip.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {tip.simpleExplanation}
              </p>

              {/* Formula Example Table */}
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-2xl p-3 border border-purple-200 dark:border-purple-900/50 space-y-2">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-300 block mb-1">
                  📐 Real Formula Demonstrations:
                </span>
                <div className="space-y-1.5">
                  {tip.exampleTable.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#1f1f21] p-2.5 rounded-xl border border-purple-100 dark:border-gray-700 text-xs"
                    >
                      <p className="font-bold font-mono text-purple-700 dark:text-purple-400">{ex.turkish}</p>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400">Meaning: {ex.english}</p>
                      <p className="text-[10px] font-semibold text-gray-500">How: {ex.formula}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 shrink-0 fill-amber-500" />
                <span><strong>Secret Shortcut:</strong> {tip.secretHack}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSection === 'magic-words' && (
        <div className="space-y-3">
          <div className="bg-purple-100 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-200 dark:border-purple-900 text-xs text-purple-950 dark:text-purple-200">
            <strong>The "8 Magic Words" Theorem:</strong> You do not need a 5000-word vocabulary to survive in Istanbul or Ankara. Mastering these 8 specific cultural phrases allows you to solve administrative crises, negotiate happily, and diffuse tension instantly!
          </div>

          <div className="space-y-2.5">
            {magicWords.map((mw, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#2c2c2e] p-4 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-base text-purple-900 dark:text-purple-300 font-mono">
                    ✨ {mw.word}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <span>Rating: {mw.lifeSaverRating}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                  </div>
                </div>

                <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Literal meaning: "{mw.literal}"
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong>When to unleash it:</strong> {mw.whenToUse}
                </p>

                <div className="bg-gray-50 dark:bg-[#38383a] p-2.5 rounded-xl text-[11px] font-medium text-gray-800 dark:text-gray-200 border-l-4 border-purple-500">
                  <strong>Real life:</strong> {mw.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSection === 'etiquette' && (
        <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
          <div>
            <span className="text-xs font-extrabold text-purple-600 uppercase tracking-widest">
              Social Intelligence
            </span>
            <h2 className="text-base font-black text-gray-900 dark:text-white mt-1">
              How to Address Turks Like a Local (Stop Saying "Mr/Mrs")
            </h2>
          </div>

          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            In Turkey, addressing strangers or staff with cold Western titles can feel awkward. Turks operate on a warm "extended family & guild" terminology system:
          </p>

          <div className="space-y-3">
            {[
              { title: 'Abi / Abim (Elder Brother)', target: 'Any male worker, shopkeeper, or stranger slightly older or roughly around your age.', ex: '"Kolay gelsin abi, akbil dolumu nerede?"' },
              { title: 'Abla / Ablam (Elder Sister)', target: 'Any female shop assistant, receptionist, or stranger.', ex: '"Teşekkürler abla, iyi günler!"' },
              { title: 'Hocam (My Teacher / Master)', target: 'Not just university professors! Turks respectfully call smart white-collar workers, technicians, and advisors "Hocam".', ex: '"Hocam, evrakta bir sorun var mı?"' },
              { title: 'Usta / Ustam (Master Craftsman)', target: 'Taxi drivers, mechanics, kebap chefs, carpenters, and maintenance crews love being honored as Ustam!', ex: '"Taksimetre açık mı ustam?"' },
              { title: 'Beyefendi / Hanımefendi', target: 'Formal respectful usage for immigration (Göç İdaresi) officers, police, and corporate desks.', ex: '"Buyrun hanımefendi, randevum vardı."' }
            ].map((e, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800/80 p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-1">
                <span className="font-extrabold text-xs text-purple-700 dark:text-purple-400">{e.title}</span>
                <p className="text-[11px] text-gray-600 dark:text-gray-300"><strong>Use with:</strong> {e.target}</p>
                <p className="text-[11px] font-mono text-gray-800 dark:text-gray-200 italic">Example: {e.ex}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
