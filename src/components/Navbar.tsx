import React from 'react';
import {
  Flame,
  RotateCcw,
  Sparkles,
  Layers,
  FileText,
  Building2,
  HelpCircle
} from 'lucide-react';
import { INDUSTRY_PRESETS } from '../data/industryPresets';
import { IndustryPreset } from '../types/carbon';

interface NavbarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  onLoadPreset: (preset: IndustryPreset) => void;
  onReset: () => void;
  onRunNewAnalysis: () => void;
  onOpenReport: () => void;
  selectedPresetId: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onSelectStep,
  onLoadPreset,
  onReset,
  onRunNewAnalysis,
  onOpenReport,
  selectedPresetId
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectStep(1)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg text-slate-100 tracking-tight">
                  CCUS Intelligence Hub
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AI-Engine v3.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI-Driven Carbon Utilisation & Buyer Matchmaking Platform
              </p>
            </div>
          </div>

          {/* Quick Presets & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Presets dropdown */}
            <div className="relative flex items-center">
              <div className="hidden lg:flex items-center text-xs text-slate-400 mr-2">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Industry Preset:</span>
              </div>
              <select
                aria-label="Select industrial emitter preset"
                value={selectedPresetId}
                onChange={(e) => {
                  const found = INDUSTRY_PRESETS.find((p) => p.id === e.target.value);
                  if (found) onLoadPreset(found);
                }}
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
              >
                {INDUSTRY_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.industryType}: {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Report button (available once past step 1) */}
            {currentStep >= 3 && (
              <button
                onClick={onOpenReport}
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Dossier</span>
              </button>
            )}

            {/* Run New Analysis button */}
            <button
              onClick={onRunNewAnalysis}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm shadow-emerald-900/50 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run New Analysis</span>
              <span className="sm:hidden">Analyze</span>
            </button>

            {/* Reset button */}
            <button
              onClick={onReset}
              title="Reset All Parameters"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg border border-slate-800 hover:border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
