import React from 'react';
import { ShieldCheck, Lock, FileText, Copyright, ExternalLink, Shield } from 'lucide-react';

export const Footer: React.FC<{ language: 'en' | 'hi' }> = ({ language }) => {
  const isHi = language === 'hi';

  return (
    <footer className="mt-auto bg-[#0B1120] text-slate-300 border-t border-slate-800 text-xs select-none">
      {/* 3-Column Official Structure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Column 1: Ministry / Department & Address (5 Cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-start gap-3">
            <img
              src="/emblem.svg"
              alt="State Emblem of India"
              className="h-12 w-auto object-contain shrink-0"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">
                {isHi ? 'स्वापक नियंत्रण ब्यूरो (NCB)' : 'NARCOTICS CONTROL BUREAU'}
              </h4>
              <div className="text-[11px] font-medium text-slate-300">
                {isHi ? 'गृह मंत्रालय • भारत सरकार' : 'Ministry of Home Affairs • Government of India'}
              </div>
              <div className="text-[10px] text-slate-400">
                West Block-1, Wing-5, R.K. Puram, New Delhi - 110066
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
            {isHi
              ? 'स्वापक औषधि और मनःप्रभावी पदार्थ अधिनियम (NDPS Act), 1985 के अंतर्गत गठित भारत की शीर्ष कानून प्रवर्तन एवं राष्ट्रीय समन्वय एजेंसी।'
              : 'Constituted under The Narcotic Drugs and Psychotropic Substances Act, 1985 as the apex coordinating law enforcement authority in India.'}
          </p>
        </div>

        {/* Column 2: Statutory Policies & GIGW Compliance (3 Cols) */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-slate-800 pb-1">
            STATUTORY POLICIES & GIGW
          </h4>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            <li>
              <a href="#privacy" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <FileText className="w-3 h-3 text-slate-400" />
                <span>Terms of Service</span>
              </a>
            </li>
            <li>
              <a href="#copyright" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <Copyright className="w-3 h-3 text-slate-400" />
                <span>Copyright Policy</span>
              </a>
            </li>
            <li>
              <a href="#hyperlink" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-slate-400" />
                <span>Hyperlinking Policy</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Standards & Security (4 Cols) */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-slate-800 pb-1">
            STANDARDS & ACCESSIBILITY
          </h4>

          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>GIGW 3.0 Conforming Layout</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Conforms to Guidelines for Indian Government Websites & WCAG 2.1 AAA
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>National Narcotics Helpline (MANAS)</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Toll-Free: 14416 (24x7) • NCB Control Room: 1933
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar with SIH 2026 Prototype notice */}
      <div className="bg-[#070B14] py-3 px-4 text-center border-t border-slate-900 text-[10px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Narcotics Control Bureau UI • Prototype developed for Smart India Hackathon (SIH 2026).
          </span>
          <span className="font-mono text-amber-400/90 font-medium">
            [SIH 2026 Demonstration Prototype — Not an Official Government Portal]
          </span>
        </div>
      </div>
    </footer>
  );
};
