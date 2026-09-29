import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FieldTestVerifier } from './components/FieldTestVerifier';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // GIGW 3.0 Real-time Font Sizing accessibility
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'small') {
      root.style.fontSize = '14px';
    } else if (fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (fontSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  // High contrast accessibility mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        highContrast ? 'bg-black text-yellow-300' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Official Government Header with Emblem, Tricolor strip & Controls */}
      <Header
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Main Feature: SIH 2026 Field Drug-Testing Kit Verifier & Calibrator */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-8 py-6">
        <FieldTestVerifier language={language} />
      </main>

      {/* Official Government Footer with SIH 2026 Prototype Note */}
      <Footer language={language} />
    </div>
  );
}
