import React, { useState } from 'react';
import { conversationCategories } from '../data/conversations';
import { triggerHaptic, playBeep } from '../utils/audio';
import { MessageSquare, ShieldAlert, CheckCircle2, Play, ChevronRight, User, Award, ScrollText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConversationsProps {
  soundEnabled: boolean;
}

const survivorScenarios = [
  {
    id: 's-1',
    title: 'Crisis #1: Crowded Dolmuş Minibus',
    situation: 'You are squeezed inside a full Dolmuş speeding along the coast toward Kadıköy. You see your street approaching in 50 meters. There is no bell button. What is your required Turkish survival phrase?',
    options: [
      { text: 'Kaptan, burada hemen dur! Niye durmuyorsun?', polite: false, feedback: 'Too demanding and rude! Drivers may become irritable or miss the spot.' },
      { text: 'Kaptan, müsait bir yerde inebilir miyim?', polite: true, feedback: '⭐ Exactly right! The driver smoothly glides to the nearest safe sidewalk and stops.' },
      { text: 'Temassız kart ile poşet almak istiyorum.', polite: false, feedback: 'You just asked to buy a plastic bag with contactless payment!' }
    ]
  },
  {
    id: 's-2',
    title: 'Crisis #2: Göç İdaresi (Immigration Counter)',
    situation: 'You stand at Counter #5 at Göç İdaresi for your student residence permit (İkamet). The busy officer asks "Neye geldin? Evrakların nerede?". How do you initiate the encounter professionally?',
    options: [
      { text: 'Benim pasaportum var, bana hemen ikamet verin.', polite: false, feedback: 'Never command an immigration official! This invites administrative delays.' },
      { text: 'Kolay gelsin efendim, saat 10 randevum vardı. Buyrun ıslak imzalı evrak dosyam.', polite: true, feedback: '⭐ Masterpiece! Starting with "Kolay gelsin efendim" and presenting wet-signed documents ensures smooth processing!' },
      { text: 'Hesap lütfen ustam, ayrı ayrı ödeyecek miyiz?', polite: false, feedback: 'You just treated the migration bureau like an all-you-can-eat kebap dining room!' }
    ]
  },
  {
    id: 's-3',
    title: 'Crisis #3: Taxi Airport Meter Defense',
    situation: 'You hop into a taxi outside the station. The driver leaves the meter dark and says "Bostancıya 1000 lira fix olur abim." What is your polite defensive Turkish maneuver?',
    options: [
      { text: 'Ustam taksimetre açmayı unuttunuz galiba. Taksimetreyle en kısa yoldan gidelim.', polite: true, feedback: '⭐ Perfect! Using "unuttunuz galiba" (you presumably forgot) lets them turn on the legal meter without losing face.' },
      { text: 'Sen beni kandırıyorsun, polis çağıracağım!', polite: false, feedback: 'Immediate conflict! Much better to gently assert the taximeter rule first.' },
      { text: 'Bana iki paket çay ve bir pet su verin.', polite: false, feedback: 'You ordered tea and bottled water from the taxicab dashboard!' }
    ]
  },
  {
    id: 's-4',
    title: 'Crisis #4: Student Registrar (Öğrenci İşleri)',
    situation: 'You need an official enrollment letter (Öğrenci Belgesi) to claim your half-price student transit card. You step up to the faculty office desk. What is your magic formula?',
    options: [
      { text: 'Akbil nerede yüklenir?', polite: false, feedback: 'That just asks where to recharge transit cards, not how to obtain your student university certificate.' },
      { text: 'Kolay gelsin efendim. Öğrenci indirim kartım için resmi öğrenci belgesi almak istiyorum.', polite: true, feedback: '⭐ Golden! Using "[Noun] + almak istiyorum" gets your stamped student letter immediately!' },
      { text: 'Para üstüm 50 Lira eksik galiba.', polite: false, feedback: 'You just told the student registrar that your grocery change is 50 lira short!' }
    ]
  }
];

export const ConversationsHub: React.FC<ConversationsProps> = ({ soundEnabled }) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(conversationCategories[0].id);
  const [selectedDiagId, setSelectedDiagId] = useState<string>(conversationCategories[0].dialogues[0].id);
  const [mode, setMode] = useState<'dialogues' | 'simulator'>('dialogues');
  const [survivorStep, setSurvivorStep] = useState(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [survivorScore, setSurvivorScore] = useState(0);

  const currentCategory = conversationCategories.find(c => c.id === selectedCatId)!;
  const currentDialogue = currentCategory.dialogues.find(d => d.id === selectedDiagId)!;

  const handleSelectCat = (catId: string) => {
    triggerHaptic('medium');
    if (soundEnabled) playBeep('tap');
    setSelectedCatId(catId);
    const cat = conversationCategories.find(c => c.id === catId)!;
    setSelectedDiagId(cat.dialogues[0].id);
  };

  const handleSelectOption = (idx: number, isPolite: boolean) => {
    triggerHaptic(isPolite ? 'success' : 'error');
    if (soundEnabled) playBeep(isPolite ? 'success' : 'tap');
    setSelectedOptIndex(idx);
    if (isPolite) {
      setSurvivorScore(s => s + 1);
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // Ignore
      }
    }
  };

  const nextSurvivorStep = () => {
    triggerHaptic('medium');
    setSelectedOptIndex(null);
    if (survivorStep < survivorScenarios.length - 1) {
      setSurvivorStep(s => s + 1);
    } else {
      setSurvivorStep(0);
      setSurvivorScore(0);
    }
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      {/* Mode Switcher Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-950 text-white rounded-3xl p-5 shadow-xl border border-gray-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            Conversational Mastery
          </span>
          <span className="text-xs text-gray-300 font-semibold">Real-Life Turkish</span>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight">
          Situational Dialogues & Roleplay
        </h1>

        <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => { triggerHaptic('medium'); setMode('dialogues'); }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'dialogues' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Real-Life Scripts
          </button>
          <button
            onClick={() => { triggerHaptic('heavy'); setMode('simulator'); }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'simulator' ? 'bg-red-600 text-white shadow-md animate-pulse' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-300" /> Survivor Sim ⚡
          </button>
        </div>
      </div>

      {mode === 'dialogues' ? (
        <>
          {/* Category Picker Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {conversationCategories.map((cat) => {
              const isSelected = selectedCatId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCat(cat.id)}
                  className={`px-3.5 py-2.5 rounded-2xl font-extrabold text-xs shrink-0 transition-all duration-200 border flex flex-col items-start ${
                    isSelected
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-gray-900 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-[#2c2c2e] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-tight mb-0.5">
                    {cat.badge}
                  </span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Dialogue Scenario Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 px-1">
              Select Scenario within {currentCategory.turkishTitle}:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {currentCategory.dialogues.map((diag) => (
                <button
                  key={diag.id}
                  onClick={() => { triggerHaptic('light'); setSelectedDiagId(diag.id); }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedDiagId === diag.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-bold shadow-sm'
                      : 'bg-white dark:bg-[#2c2c2e] border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-300 hover:border-indigo-300'
                  }`}
                >
                  <div className="truncate pr-2">
                    <p className="text-xs font-bold truncate">{diag.title}</p>
                    <p className="text-[11px] text-gray-500 truncate font-normal">{diag.scenario}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${selectedDiagId === diag.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Dialogue Script */}
          <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                {currentDialogue.title}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed italic">
                📍 Scenario: {currentDialogue.scenario}
              </p>
            </div>

            {/* Script lines */}
            <div className="space-y-3">
              {currentDialogue.lines.map((line, idx) => {
                const isUser = line.role === 'user';
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border ${
                      isUser
                        ? 'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 ml-3'
                        : 'bg-gray-50 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 mr-3'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        isUser ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-100 dark:bg-gray-600'
                      }`}>
                        <User className="w-3 h-3" /> {line.speaker}
                      </span>
                    </div>

                    <p className="text-sm font-extrabold text-gray-900 dark:text-white leading-snug">
                      {line.turkish}
                    </p>
                    <p className="text-xs font-medium text-red-700 dark:text-red-300 mt-1">
                      "{line.english}"
                    </p>

                    {/* Read-aloud transcript */}
                    <div className="mt-2 bg-white/70 dark:bg-black/25 rounded-xl px-2.5 py-1.5 flex items-start gap-1.5">
                      <ScrollText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-gray-600 dark:text-gray-300 font-mono font-semibold leading-relaxed">
                        {line.pronunciation}
                      </p>
                    </div>

                    {line.grammarNote && (
                      <div className="mt-2 pt-2 border-t border-red-100 dark:border-red-900/30 text-[11px] text-gray-700 dark:text-gray-300 font-medium">
                        💡 <strong>Why this works:</strong> {line.grammarNote}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Key takeaway idioms */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-800 dark:text-gray-200 flex items-center gap-1">
                <Play className="w-3.5 h-3.5 text-red-600 fill-red-600" /> Key Takeaway Phrases for Memory:
              </h3>
              <div className="space-y-2">
                {currentDialogue.keyPhrases.map((kp, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#2c2c2e] p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
                    <p className="font-bold text-gray-900 dark:text-white">{kp.turkish}</p>
                    <p className="text-[11px] text-gray-500">Meaning: {kp.english}</p>
                    <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">⚡ {kp.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Survivor Simulator Game */
        <div className="bg-gradient-to-br from-red-600 to-amber-700 text-white p-5 rounded-3xl shadow-xl border border-red-500 space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-amber-300" /> Choose-Your-Own-Adventure
            </span>
            <span className="text-xs font-extrabold bg-black/30 px-3 py-1 rounded-full flex items-center gap-1">
              <Award className="w-4 h-4 text-yellow-300" /> Score: {survivorScore}
            </span>
          </div>

          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2">
            <span className="text-amber-300 font-extrabold text-xs uppercase tracking-wider">
              {survivorScenarios[survivorStep].title}
            </span>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed font-semibold">
              {survivorScenarios[survivorStep].situation}
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-extrabold uppercase tracking-wide text-red-100">
              Select Your Turkish Action Sentence:
            </p>
            {survivorScenarios[survivorStep].options.map((opt, idx) => {
              const isSelected = selectedOptIndex === idx;
              let style = "bg-white text-gray-900 hover:bg-red-50";
              if (selectedOptIndex !== null) {
                if (isSelected) {
                  style = opt.polite
                    ? "bg-green-600 text-white font-black border-2 border-green-300 ring-4 ring-green-400"
                    : "bg-rose-900 text-white font-black border-2 border-rose-300";
                } else if (opt.polite) {
                  style = "bg-green-600/80 text-white font-bold opacity-90";
                } else {
                  style = "bg-white/40 text-gray-300 opacity-50 pointer-events-none";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedOptIndex !== null}
                  onClick={() => handleSelectOption(idx, opt.polite)}
                  className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-bold shadow-md transition-all flex flex-col justify-between ${style}`}
                >
                  <span>"{opt.text}"</span>

                  {selectedOptIndex !== null && (isSelected || opt.polite) && (
                    <div className="mt-2.5 pt-2 border-t border-white/20 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{opt.feedback}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedOptIndex !== null && (
            <button
              onClick={nextSurvivorStep}
              className="w-full py-3.5 bg-black/50 hover:bg-black/70 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg border border-white/30 flex items-center justify-center gap-2 animate-bounce"
            >
              {survivorStep < survivorScenarios.length - 1 ? 'Next Crisis Situation →' : 'Replay Survivor Challenge 🔄'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
