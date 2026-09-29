import React from 'react';
import { X, Printer, Download, ShieldCheck, Info } from 'lucide-react';

interface CalibrationCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalibrationCardModal: React.FC<CalibrationCardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0F2756] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold tracking-tight">NCB Standard Reference Color Calibration Card</h3>
              <p className="text-[11px] text-slate-300">GIGW & ISO 17025 Forensic Chromogenic Control Target</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Canvas Preview */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-50">
          <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-3 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">How to use in the field:</span> Place this reference card adjacent to the reagent test well or lateral flow strip before capturing the photo. The camera calibration algorithm samples the 100% White, 18% Neutral Gray, and 0% Black patches to eliminate variations caused by streetlights, sunlight, or smartphone sensors.
            </div>
          </div>

          {/* Realistic High-Fidelity Forensic Reference Card Display */}
          <div className="bg-white p-6 rounded-xl border-2 border-slate-800 shadow-md text-slate-900 mx-auto max-w-lg select-none">
            {/* Target Header */}
            <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">NARCOTICS CONTROL BUREAU • FIELD FORENSICS</div>
              <div className="text-base font-black text-[#0F2756] tracking-tight">OPTICAL CALIBRATION TARGET #NCB-REF-2026</div>
              <div className="text-[10px] text-slate-600 font-mono">D65 STANDARD ILLUMINANT • 18% NEUTRAL REFLECTANCE</div>
            </div>

            {/* 3 Main Calibration Bands */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* 100% White */}
              <div className="border-2 border-slate-300 rounded-lg p-3 text-center bg-white shadow-xs">
                <div className="w-full h-16 bg-white border border-slate-200 rounded-md mb-2 shadow-inner"></div>
                <div className="text-xs font-black text-slate-900">WHITE 100%</div>
                <div className="text-[10px] text-slate-500 font-mono">RGB: 255, 255, 255</div>
                <div className="text-[9px] text-blue-600 font-semibold mt-1">Gain Normalizer</div>
              </div>

              {/* 18% Neutral Gray */}
              <div className="border-2 border-slate-400 rounded-lg p-3 text-center bg-slate-100 shadow-xs">
                <div className="w-full h-16 bg-[#808080] rounded-md mb-2 shadow-inner"></div>
                <div className="text-xs font-black text-slate-900">18% NEUTRAL GREY</div>
                <div className="text-[10px] text-slate-500 font-mono">RGB: 128, 128, 128</div>
                <div className="text-[9px] text-blue-600 font-semibold mt-1">Midtone Balance</div>
              </div>

              {/* 0% True Black */}
              <div className="border-2 border-slate-900 rounded-lg p-3 text-center bg-slate-900 text-white shadow-xs">
                <div className="w-full h-16 bg-[#000000] border border-slate-700 rounded-md mb-2 shadow-inner"></div>
                <div className="text-xs font-black text-white">BLACK 0%</div>
                <div className="text-[10px] text-slate-400 font-mono">RGB: 0, 0, 0</div>
                <div className="text-[9px] text-amber-400 font-semibold mt-1">Black Level Bias</div>
              </div>
            </div>

            {/* Spectral Reagent Standard Reference Swatches */}
            <div className="mb-4">
              <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Standard Reagent Reaction Benchmark Swatches:
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                <div className="bg-[#4C1D95] text-white p-2 rounded-md">
                  <div>Heroin</div>
                  <div className="text-[9px] opacity-80 font-mono">#4C1D95</div>
                </div>
                <div className="bg-[#1D4ED8] text-white p-2 rounded-md">
                  <div>Cocaine</div>
                  <div className="text-[9px] opacity-80 font-mono">#1D4ED8</div>
                </div>
                <div className="bg-[#581C87] text-white p-2 rounded-md">
                  <div>Cannabis</div>
                  <div className="text-[9px] opacity-80 font-mono">#581C87</div>
                </div>
                <div className="bg-[#C2410C] text-white p-2 rounded-md">
                  <div>Meth</div>
                  <div className="text-[9px] opacity-80 font-mono">#C2410C</div>
                </div>
              </div>
            </div>

            {/* 10mm Forensic Metric Scale */}
            <div className="pt-2 border-t border-slate-300">
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-1">
                <span>0mm</span>
                <span>25mm</span>
                <span>50mm</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-xs flex overflow-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-full ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
                  ></div>
                ))}
              </div>
              <div className="text-center text-[9px] font-mono text-slate-500 mt-1">
                LEGAL SCALE VERIFIER (SECTION 52A NDPS ACT INVENTORY)
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            SIH 2026 Academic Hardware Standard
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Calibration Card</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#0F2756] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
