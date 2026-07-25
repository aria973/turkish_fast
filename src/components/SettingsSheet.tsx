import React from 'react';
import { SettingsApi, TextScale, TEXT_SCALE_LABEL } from '../hooks/useSettings';
import { triggerHaptic, playBeep } from '../utils/audio';
import { X, Type, Contrast, Zap, BookOpenText, Volume2, Accessibility, RotateCcw } from 'lucide-react';

interface SettingsSheetProps {
  settings: SettingsApi;
  onClose: () => void;
  srsInfo?: { tracked: number; strong: number; onReset: () => void };
}

const Row: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}> = ({ icon, title, desc, checked, onToggle }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={onToggle}
    className="w-full flex items-center gap-3 p-3.5 bg-white dark:bg-[#2c2c2e] rounded-2xl border border-gray-200 dark:border-gray-800 text-left active:scale-[0.99] transition-transform tap-target"
  >
    <span className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#38383a] text-red-600 shrink-0">{icon}</span>
    <span className="flex-1 min-w-0">
      <span className="block text-sm font-extrabold text-gray-900 dark:text-white">{title}</span>
      <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 leading-snug">{desc}</span>
    </span>
    <span
      className={`w-[52px] h-[31px] rounded-full p-[2px] transition-colors shrink-0 ${
        checked ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span
        className={`block w-[27px] h-[27px] bg-white rounded-full shadow-md transition-transform ${
          checked ? 'translate-x-[21px]' : 'translate-x-0'
        }`}
      />
    </span>
  </button>
);

export const SettingsSheet: React.FC<SettingsSheetProps> = ({ settings, onClose, srsInfo }) => {
  const tap = () => {
    triggerHaptic('light');
    if (settings.soundEnabled) playBeep('tap');
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center" role="dialog" aria-modal="true" aria-label="Display and accessibility settings">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-t-[28px] shadow-2xl max-h-[90vh] flex flex-col animate-sheetUp pb-safe">
        <div className="pt-2.5 pb-1 flex justify-center shrink-0">
          <span className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="px-5 pb-3 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-red-600" /> Display & Access
          </h2>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="p-2.5 bg-gray-200 dark:bg-[#38383a] rounded-full text-gray-700 dark:text-gray-200 tap-target flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6 space-y-4">
          {/* Text size */}
          <section className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-4 border border-gray-200 dark:border-gray-800 space-y-3">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-red-600" /> Text size
            </h3>
            <div className="flex gap-2" role="group" aria-label="Text size">
              {(['default', 'large', 'xlarge'] as TextScale[]).map(scale => (
                <button
                  key={scale}
                  aria-pressed={settings.textScale === scale}
                  onClick={() => { tap(); settings.set('textScale', scale); }}
                  className={`flex-1 py-3 rounded-xl font-extrabold transition-all tap-target border-2 ${
                    settings.textScale === scale
                      ? 'bg-red-600 text-white border-red-600 shadow'
                      : 'bg-gray-100 dark:bg-[#38383a] text-gray-700 dark:text-gray-200 border-transparent'
                  }`}
                  style={{ fontSize: scale === 'default' ? '13px' : scale === 'large' ? '15px' : '17px' }}
                >
                  {scale === 'default' ? 'A' : scale === 'large' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Currently: <strong className="text-gray-900 dark:text-white">{TEXT_SCALE_LABEL[settings.textScale]}</strong> — scales every screen.
            </p>
          </section>

          <Row
            icon={<Contrast className="w-5 h-5" />}
            title="High contrast"
            desc="Darker text and stronger borders for bright sunlight or low vision."
            checked={settings.highContrast}
            onToggle={() => { tap(); settings.toggle('highContrast'); }}
          />

          <Row
            icon={<Type className="w-5 h-5" />}
            title="Dyslexia-friendly text"
            desc="Wider letter spacing, taller lines and a clearer typeface."
            checked={settings.dyslexicFont}
            onToggle={() => { tap(); settings.toggle('dyslexicFont'); }}
          />

          <Row
            icon={<Zap className="w-5 h-5" />}
            title="Reduce motion"
            desc="Removes sliding sheets and bouncing animations."
            checked={settings.reduceMotion}
            onToggle={() => { tap(); settings.toggle('reduceMotion'); }}
          />

          <Row
            icon={<BookOpenText className="w-5 h-5" />}
            title="Show pronunciation transcripts"
            desc="Hide them for a harder, more effective recall challenge."
            checked={settings.showTranscripts}
            onToggle={() => { tap(); settings.toggle('showTranscripts'); }}
          />

          <Row
            icon={<Volume2 className="w-5 h-5" />}
            title="Interface sounds & haptics"
            desc="Tap feedback only — the app never speaks Turkish aloud."
            checked={settings.soundEnabled}
            onToggle={() => { tap(); settings.toggle('soundEnabled'); }}
          />

          {srsInfo && (
            <section className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-4 border border-gray-200 dark:border-gray-800 space-y-3">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Memory schedule</h3>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 dark:bg-[#38383a] rounded-xl py-2.5 text-center">
                  <p className="text-lg font-black text-gray-900 dark:text-white">{srsInfo.tracked}</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase">Tracked</p>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-[#38383a] rounded-xl py-2.5 text-center">
                  <p className="text-lg font-black text-emerald-600">{srsInfo.strong}</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase">Strong</p>
                </div>
              </div>
              <button
                onClick={() => { triggerHaptic('heavy'); srsInfo.onReset(); }}
                className="w-full py-3 rounded-xl bg-gray-100 dark:bg-[#38383a] text-gray-700 dark:text-gray-200 font-extrabold text-xs flex items-center justify-center gap-2 tap-target"
              >
                <RotateCcw className="w-4 h-4" /> Reset review schedule
              </button>
            </section>
          )}

          <button
            onClick={() => { triggerHaptic('heavy'); settings.reset(); }}
            className="w-full py-3.5 rounded-2xl bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 font-extrabold text-sm tap-target"
          >
            Restore default display settings
          </button>
        </div>
      </div>
    </div>
  );
};
