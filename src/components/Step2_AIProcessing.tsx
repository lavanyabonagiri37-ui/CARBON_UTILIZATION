import React, { useState, useEffect } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Flame,
  Check,
  XCircle,
  Database,
  Layers,
  Thermometer
} from 'lucide-react';
import { IndustryInput, CO2Characterisation } from '../types/carbon';

interface Step2Props {
  input: IndustryInput;
  characterisation: CO2Characterisation;
  onProceedToPrediction: () => void;
}

const STAGES = [
  { id: 1, text: 'Collecting CO₂ source information and flow metrics...', duration: 450 },
  { id: 2, text: 'Validating CO₂ quantity and purity concentration tiers...', duration: 450 },
  { id: 3, text: 'Processing geospatial location and transport corridors...', duration: 450 },
  { id: 4, text: 'Analysing available utilisation technologies & chemical readiness...', duration: 500 },
  { id: 5, text: 'Preparing multi-objective Pareto optimisation parameters...', duration: 400 }
];

export const Step2_AIProcessing: React.FC<Step2Props> = ({
  input,
  characterisation,
  onProceedToPrediction
}) => {
  const [activeStage, setActiveStage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let current = 1;
    const runSequence = () => {
      if (current <= STAGES.length) {
        setActiveStage(current);
        const timer = setTimeout(() => {
          current++;
          runSequence();
        }, STAGES[current - 1]?.duration || 400);
        return () => clearTimeout(timer);
      } else {
        setIsCompleted(true);
      }
    };
    const t = setTimeout(runSequence, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Workflow Phase 02</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Platform AI Analysis & CO₂ Characterisation
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            The neural inference pipeline is evaluating stream thermodynamics, trace impurities,
            and technological compatibility for downstream valorization.
          </p>
        </div>
      </div>

      {/* AI Processing Animation Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Cpu className={`w-5 h-5 text-cyan-400 ${!isCompleted ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100">
                AI Stream Intelligence Engine
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {isCompleted ? 'Analysis Completed (100%)' : `Executing Stage 0${activeStage}/05...`}
              </span>
            </div>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold border ${
              isCompleted
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse'
            }`}
          >
            {isCompleted ? 'Validated' : 'Processing'}
          </span>
        </div>

        {/* Progress Stages List */}
        <div className="space-y-3.5">
          {STAGES.map((stage) => {
            const isDone = isCompleted || activeStage > stage.id;
            const isCurrent = !isCompleted && activeStage === stage.id;

            return (
              <div
                key={stage.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                  isDone
                    ? 'bg-slate-950/60 border-slate-800 text-slate-200'
                    : isCurrent
                    ? 'bg-cyan-950/20 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-950/30 border-slate-800/40 text-slate-400 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      isDone
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                        : isCurrent
                        ? 'bg-cyan-500 text-slate-950 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : stage.id}
                  </div>
                  <span className="text-sm font-medium">{stage.text}</span>
                </div>

                <span className="text-xs font-mono">
                  {isDone ? (
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Done</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="text-cyan-400 animate-pulse">Analyzing...</span>
                  ) : (
                    <span className="text-slate-400">Pending</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CO2 Characterisation Report */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>CO₂ Characterisation & Compatibility Dossier</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified physical and thermodynamic properties derived from input metrics.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Capture Readiness:</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm">
              {characterisation.captureReadinessScore}/100
            </span>
          </div>
        </div>

        {/* 4 Core Characterisation Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              CO₂ Quantity
            </span>
            <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">
              {input.co2Quantity.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              {characterisation.quantityStatus}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              CO₂ Purity
            </span>
            <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
              {input.co2Purity}%
            </span>
            <span className="text-xs text-emerald-300/80 mt-1 block">
              Tier: {characterisation.purityTier}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Source Location
            </span>
            <span className="text-base font-bold text-slate-100 truncate mt-1 block">
              {input.location.name}
            </span>
            <span className="text-xs text-slate-400 mt-1 block flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>{input.location.region}, {input.location.country}</span>
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Emission Rate
            </span>
            <span className="text-2xl font-bold text-amber-400 font-mono mt-1 block">
              {input.emissionRate}
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              {characterisation.emissionRateRating}
            </span>
          </div>
        </div>

        {/* Chemical & Gas Details */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Sulfur (SOx) Level:</span>
            <span className="font-semibold text-slate-200">
              {characterisation.keyChemicalProperties.sulfurLevel}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Particulates & Fly Ash:</span>
            <span className="font-semibold text-slate-200">
              {characterisation.keyChemicalProperties.particulates}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Flue Gas Temp:</span>
            <span className="font-semibold text-slate-200">
              {characterisation.keyChemicalProperties.temperatureRange}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Compression Protocol:</span>
            <span className="font-semibold text-cyan-300">
              {characterisation.keyChemicalProperties.compressionNeed}
            </span>
          </div>
        </div>

        {/* Suitable vs Incompatible Utilisation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Suitable */}
          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-5">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>Technically Compatible Utilisation Categories</span>
            </div>
            <ul className="space-y-2">
              {characterisation.suitableCategories.map((cat, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Incompatible or Conditional */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm mb-3">
              <AlertCircle className="w-4 h-4" />
              <span>Conditioned / Pre-Treatment Categories</span>
            </div>
            {characterisation.incompatibleCategories.length > 0 ? (
              <ul className="space-y-2">
                {characterisation.incompatibleCategories.map((cat, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-300">
                Stream purity is high enough for all direct catalytic and synthetic transformation pathways.
              </p>
            )}
          </div>
        </div>

        {/* Action Button to Step 3 */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            id="proceed-to-prediction-btn"
            type="button"
            onClick={onProceedToPrediction}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition cursor-pointer"
          >
            <span>Proceed to AI Utilisation Prediction</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
