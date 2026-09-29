import React from 'react';
import { Phone, Moon, Sun } from 'lucide-react';

export interface HeaderProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
}) => {
  const isHi = language === 'hi';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm select-none">
      {/* 1. Indian National Flag Tricolor Ribbon */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-[#FFFFFF]"></div>
        <div className="bg-[#138808]"></div>
      </div>

      {/* 2. Top GIGW Government Utility Bar (Dark Navy #0F172A) */}
      <div className="bg-[#0F172A] text-slate-200 text-[11px] sm:text-xs py-1.5 px-3 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Ministry Identification */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="font-bold text-white uppercase tracking-wider">
              {isHi ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              {isHi
                ? 'गृह मंत्रालय • स्वापक नियंत्रण ब्यूरो'
                : 'Ministry of Home Affairs • Narcotics Control Bureau'}
            </span>
          </div>

          {/* Right: National Toll-Free Helpline, Accessibility Controls, Contrast & Language */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* National Toll-Free Helpline */}
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>MANAS: 14416 / NCB: 1933</span>
            </div>

            <div className="h-3 w-[1px] bg-slate-700 hidden sm:block"></div>

            {/* Accessibility Font Size Controls (GIGW 3.0 Standard) */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700 shadow-inner">
              <button
                type="button"
                onClick={() => setFontSize('small')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                  fontSize === 'small'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={isHi ? 'छोटा फ़ॉन्ट आकार (A-)' : 'Decrease Font Size (A-)'}
                aria-label="Decrease Font Size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                  fontSize === 'normal'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={isHi ? 'मानक फ़ॉन्ट आकार (A)' : 'Standard / Default Font Size (A)'}
                aria-label="Default Font Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => {
                  setFontSize(fontSize === 'large' ? 'xlarge' : 'large');
                }}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                  fontSize === 'large' || fontSize === 'xlarge'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={isHi ? 'बड़ा फ़ॉन्ट आकार (A+)' : 'Increase Font Size (A+)'}
                aria-label="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle High Contrast"
            >
              {highContrast ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-400" />}
              <span>{isHi ? 'कंट्रास्ट' : 'Contrast'}</span>
            </button>

            <div className="h-3 w-[1px] bg-slate-700"></div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#D97706] hover:bg-[#B45309] text-white transition-all shadow-sm cursor-pointer"
              title="Switch Language"
            >
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Official Header (State Emblem & Department Hierarchy) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Official State Emblem & Department Hierarchy */}
        <div className="flex items-center gap-3.5">
          <img
            src="/emblem.svg"
            alt="State Emblem of India"
            className="h-12 sm:h-14 w-auto object-contain shrink-0 select-none drop-shadow-xs"
          />

          <div className="flex flex-col justify-center">
            <div className="text-[12px] sm:text-[13px] font-bold text-slate-800 tracking-tight leading-tight">
              {isHi ? 'भारत सरकार • Government of India' : 'भारत सरकार • Government of India'}
            </div>
            <h1 className="text-base sm:text-xl md:text-[22px] font-black text-[#0F2756] tracking-tight leading-tight mt-0.5">
              {isHi ? 'स्वापक नियंत्रण ब्यूरो' : 'Narcotics Control Bureau'}
            </h1>
            <div className="text-[12px] sm:text-[13px] font-medium text-slate-600 leading-tight mt-0.5">
              {isHi
                ? 'गृह मंत्रालय • Ministry of Home Affairs'
                : 'Ministry of Home Affairs • Government of India'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
