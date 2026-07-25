import React, { useState } from 'react';
import { interactiveReceipt, paymentVocabulary } from '../data/receiptData';
import { triggerHaptic, playBeep } from '../utils/audio';
import { Receipt as ReceiptIcon, DollarSign, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import { ReceiptField } from '../types';

interface ReceiptReaderProps {
  soundEnabled: boolean;
}

export const ReceiptReader: React.FC<ReceiptReaderProps> = ({ soundEnabled }) => {
  const [activeField, setActiveField] = useState<ReceiptField>(interactiveReceipt[6]); // Default to KDV Tax row
  const [activeTab, setActiveTab] = useState<'receipt' | 'cash-vocab'>('receipt');

  const handleSelectField = (field: ReceiptField) => {
    triggerHaptic('light');
    if (soundEnabled) playBeep('tap');
    setActiveField(field);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-3xl p-5 shadow-xl border border-emerald-600">
        <div className="flex items-center justify-between">
          <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-amber-300" /> Money & Tax Hacks
          </span>
          <span className="text-xs text-white/80 font-mono">Fiş / Adisyon Guide</span>
        </div>
        <h1 className="text-xl font-extrabold mt-2 tracking-tight flex items-center gap-2">
          Interactive Receipt & Cashier Guide
        </h1>
        <p className="text-xs text-white/90 mt-1 leading-relaxed">
          Tap any printed line on the receipt below to learn fiscal tax rates (KDV), count your change (Para Üstü), and handle cashiers!
        </p>

        {/* Tab Switcher */}
        <div className="flex mt-4 bg-black/30 p-1 rounded-2xl border border-white/20">
          <button
            onClick={() => { triggerHaptic('medium'); setActiveTab('receipt'); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'receipt' ? 'bg-emerald-600 text-white shadow' : 'text-gray-300 hover:text-white'
            }`}
          >
            <ReceiptIcon className="w-4 h-4" /> Interactive Fiş
          </button>
          <button
            onClick={() => { triggerHaptic('medium'); setActiveTab('cash-vocab'); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'cash-vocab' ? 'bg-emerald-600 text-white shadow' : 'text-gray-300 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Paying Scripts
          </button>
        </div>
      </div>

      {activeTab === 'receipt' ? (
        <div className="space-y-4">
          {/* Simulated Paper Receipt (Fiş) */}
          <div className="bg-amber-50 dark:bg-[#1a1a1b] p-5 rounded-t-3xl shadow-xl border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs relative overflow-hidden">
            <div className="text-center border-b border-dashed border-gray-400 dark:border-gray-700 pb-3 mb-3">
              <span className="bg-gray-800 text-amber-300 text-[10px] px-2.5 py-0.5 rounded font-sans font-black tracking-widest uppercase">
                🏷️ Tap Any Row Below To Inspect
              </span>
            </div>

            <div className="space-y-2">
              {interactiveReceipt.map((row) => {
                const isSelected = activeField.id === row.id;
                let bgStyle = "hover:bg-amber-100 dark:hover:bg-gray-800";
                if (isSelected) {
                  bgStyle = "bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 scale-[1.02] shadow-sm rounded-lg";
                } else if (row.category === 'tax') {
                  bgStyle += " text-rose-700 dark:text-rose-400 font-bold";
                } else if (row.category === 'total') {
                  bgStyle += " font-extrabold text-gray-950 dark:text-white border-y border-gray-300 dark:border-gray-800 py-1";
                }

                return (
                  <div
                    key={row.id}
                    onClick={() => handleSelectField(row)}
                    className={`p-2 rounded cursor-pointer transition-all flex items-center justify-between gap-2 select-none ${bgStyle}`}
                  >
                    <span className="truncate flex-1 text-[11px] sm:text-xs tracking-tighter sm:tracking-normal">
                      {row.turkishTerm}
                    </span>
                    <span className="text-[10px] font-sans font-semibold opacity-80 shrink-0">
                      ℹ️
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mt-4 pt-2 text-center text-[10px] text-gray-500 font-sans">
              ★ MALİ DEĞERİ VARDIR • FISCAL SEAL VERIFIED ★
            </div>
          </div>

          {/* Active Field Explanation Deck */}
          {activeField && (
            <div className="bg-white dark:bg-[#2c2c2e] p-5 rounded-3xl shadow-xl border border-emerald-500 dark:border-emerald-700 space-y-3 animate-fadeIn">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    Row Analysis • {activeField.category.toUpperCase()}
                  </span>
                  <h2 className="text-sm font-black text-gray-900 dark:text-white mt-1 font-mono leading-tight">
                    {activeField.turkishTerm}
                  </h2>
                </div>
              </div>

              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                💬 Literal English: "{activeField.literalEnglish}"
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-2.5">
                {activeField.meaning}
              </p>

              {activeField.cashierDialogue && (
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3 rounded-2xl text-xs space-y-1.5">
                  <span className="font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Likely Cashier Dialogue:
                  </span>
                  <p className="text-emerald-900 dark:text-emerald-200 italic font-medium">
                    {activeField.cashierDialogue}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Cash & Paying Essential Vocabulary Deck */
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 px-1 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-emerald-600" /> Essential Money & Dining Payment Phrases
          </h3>
          <div className="space-y-2.5">
            {paymentVocabulary.map((pv, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#2c2c2e] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-1"
              >
                <p className="font-black text-sm text-gray-900 dark:text-white">
                  {pv.turkish}
                </p>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  "{pv.english}"
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-tight pt-1 border-t border-gray-100 dark:border-gray-800">
                  💡 <strong>Pro Tip:</strong> {pv.hint}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
