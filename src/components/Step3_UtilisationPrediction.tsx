import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  DollarSign,
  Leaf,
  Layers,
  CheckCircle2,
  Building,
  FlaskConical,
  Plane,
  Mountain,
  Dna,
  Info,
  SlidersHorizontal,
  Scale
} from 'lucide-react';
import { UtilisationPathway, IndustryInput } from '../types/carbon';

interface Step3Props {
  pathways: UtilisationPathway[];
  input: IndustryInput;
  onProceedToOptimisation: () => void;
}

export const Step3_UtilisationPrediction: React.FC<Step3Props> = ({
  pathways,
  input,
  onProceedToOptimisation
}) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>(
    pathways[0]?.id || 'pathway-concrete'
  );

  const selectedPathway =
    pathways.find((p) => p.id === selectedPathwayId) || pathways[0];

  const getCategoryIcon = (category: UtilisationPathway['category']) => {
    switch (category) {
      case 'Construction Materials':
        return <Building className="w-5 h-5 text-amber-400" />;
      case 'Chemicals & Polymers':
        return <FlaskConical className="w-5 h-5 text-cyan-400" />;
      case 'Synthetic Fuels':
        return <Plane className="w-5 h-5 text-indigo-400" />;
      case 'Mineralisation':
        return <Mountain className="w-5 h-5 text-emerald-400" />;
      case 'Biological / Algae':
        return <Dna className="w-5 h-5 text-lime-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  // Sort pathways by compatibility score
  const sortedPathways = [...pathways].sort(
    (a, b) => b.compatibilityScore - a.compatibilityScore
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow Phase 03</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            AI Utilisation Pathway Prediction Engine
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Neural thermodynamic algorithms have simulated conversion yields, stoichiometric product outputs,
            and techno-economic viability tailored to your {input.co2Purity}% purity and{' '}
            {input.co2Quantity.toLocaleString()} t/day point source.
          </p>

          {/* Prototype Simulation Notice */}
          <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              <strong>AI-Simulated Prototype Predictions:</strong> Stoichiometric values are modeled from IEA/NREL CCUS industrial benchmarks.
            </span>
          </div>
        </div>
      </div>

      {/* Pathways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPathways.map((pathway, idx) => {
          const isSelected = pathway.id === selectedPathwayId;
          const isTopCompat = idx === 0;

          return (
            <div
              key={pathway.id}
              onClick={() => setSelectedPathwayId(pathway.id)}
              className={`rounded-2xl p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/60 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/70 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700'
              }`}
            >
              {isTopCompat && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                  Top AI Match
                </div>
              )}

              <div>
                {/* Pathway Category & Icon */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getCategoryIcon(pathway.category)}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {pathway.category}
                    </span>
                    <h2 className="text-sm font-bold text-slate-100 leading-tight">
                      {pathway.name}
                    </h2>
                  </div>
                </div>

                {/* Compatibility Score Bar */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-slate-400 font-medium">Compatibility Score</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      {pathway.compatibilityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${pathway.compatibilityScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5 font-mono">
                    <span>Min Purity: {pathway.minPurityRequired}%</span>
                    <span className="text-slate-300">TRL {pathway.trlLevel}/9</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">CO₂ Utilised</span>
                    <span className="font-bold text-cyan-400 font-mono">
                      {pathway.co2Utilised.toLocaleString()} t/d
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Carbon Reduction</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {pathway.carbonReduction.toLocaleString()} t CO₂e/d
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Energy Req.</span>
                    <span className="font-bold text-yellow-400 font-mono">
                      {pathway.energyRequirement.toLocaleString()} MWh/d
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Gross Revenue</span>
                    <span className="font-bold text-emerald-300 font-mono">
                      ${(pathway.totalRevenue / 1000).toFixed(1)}k/d
                    </span>
                  </div>
                </div>

                {/* Product Output Tag */}
                <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 mb-3">
                  <span className="text-slate-400 block text-[10px]">Product Output:</span>
                  <span className="font-medium text-slate-200">
                    {pathway.productOutput.amount.toLocaleString()} {pathway.productOutput.unit}{' '}
                    ({pathway.productOutput.name})
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Unit Cost: ${pathway.conversionCostPerTonne}/t</span>
                <span className="text-emerald-400 font-medium hover:underline">
                  {isSelected ? 'Selected' : 'Click to Inspect'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Drawer for Selected Pathway */}
      {selectedPathway && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                {getCategoryIcon(selectedPathway.category)}
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">
                  Detailed Pathway Architecture
                </span>
                <h3 className="text-lg font-bold text-slate-100">{selectedPathway.name}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                {selectedPathway.marketOutlook}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                TRL {selectedPathway.trlLevel}/9
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedPathway.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Conversion OPEX</span>
              <span className="text-xl font-bold text-rose-400 font-mono mt-0.5 block">
                ${selectedPathway.conversionCostPerTonne} / tonne CO₂
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Total: ${(selectedPathway.totalConversionCost / 1000).toFixed(1)}k/day
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Potential Revenue</span>
              <span className="text-xl font-bold text-emerald-400 font-mono mt-0.5 block">
                ${selectedPathway.potentialRevenuePerTonne} / tonne CO₂
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Total: ${(selectedPathway.totalRevenue / 1000).toFixed(1)}k/day
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Energy Intensity</span>
              <span className="text-xl font-bold text-yellow-400 font-mono mt-0.5 block">
                {selectedPathway.energyPerTonne} MWh/tonne
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Daily: {selectedPathway.energyRequirement} MWh
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Net Carbon Displacement</span>
              <span className="text-xl font-bold text-cyan-400 font-mono mt-0.5 block">
                {selectedPathway.carbonReduction.toLocaleString()} t CO₂e/d
              </span>
              <span className="text-[11px] text-emerald-400 mt-1 block">
                ~{(selectedPathway.carbonReduction * 350).toLocaleString()} t/year net
              </span>
            </div>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-xl flex items-start space-x-3">
            <Leaf className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-emerald-300 block mb-0.5">
                Environmental & Circularity Impact:
              </span>
              <span className="text-slate-300">{selectedPathway.environmentalBenefit}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action to Step 4 */}
      <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
        <div className="text-xs text-slate-400">
          Rankings dynamically adapt to source purity & volume. Next: Multi-Objective Optimisation.
        </div>
        <button
          id="proceed-to-optimisation-btn"
          type="button"
          onClick={onProceedToOptimisation}
          className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition cursor-pointer"
        >
          <span>Proceed to Optimisation Engine</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
