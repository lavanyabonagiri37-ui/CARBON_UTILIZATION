import React from 'react';
import {
  SlidersHorizontal,
  ArrowRight,
  Trophy,
  Scale,
  Sparkles,
  TrendingUp,
  Zap,
  DollarSign,
  Leaf,
  Navigation,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Flame
} from 'lucide-react';
import { OptimizedPathway, OptimizationWeights } from '../types/carbon';

interface Step4Props {
  optimizedPathways: OptimizedPathway[];
  weights: OptimizationWeights;
  onChangeWeights: (newWeights: OptimizationWeights) => void;
  onProceedToBuyerMatching: () => void;
}

export const Step4_MultiObjectiveOptimisation: React.FC<Step4Props> = ({
  optimizedPathways,
  weights,
  onChangeWeights,
  onProceedToBuyerMatching
}) => {
  const bestPathway = optimizedPathways[0];

  const handleWeightChange = (key: keyof OptimizationWeights, val: number) => {
    onChangeWeights({
      ...weights,
      [key]: val
    });
  };

  const applyPresetWeights = (preset: 'balanced' | 'decarbonization' | 'roi' | 'lowEnergy') => {
    switch (preset) {
      case 'balanced':
        onChangeWeights({
          co2Utilisation: 0.8,
          carbonReduction: 0.9,
          revenue: 0.8,
          minCost: 0.7,
          minDistance: 0.6,
          minEnergy: 0.6
        });
        break;
      case 'decarbonization':
        onChangeWeights({
          co2Utilisation: 1.0,
          carbonReduction: 1.0,
          revenue: 0.3,
          minCost: 0.3,
          minDistance: 0.5,
          minEnergy: 0.4
        });
        break;
      case 'roi':
        onChangeWeights({
          co2Utilisation: 0.5,
          carbonReduction: 0.4,
          revenue: 1.0,
          minCost: 0.9,
          minDistance: 0.7,
          minEnergy: 0.5
        });
        break;
      case 'lowEnergy':
        onChangeWeights({
          co2Utilisation: 0.7,
          carbonReduction: 0.7,
          revenue: 0.4,
          minCost: 0.6,
          minDistance: 0.8,
          minEnergy: 1.0
        });
        break;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Workflow Phase 04</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Multi-Objective Pareto Optimisation Engine
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Trade-off simulation balancing maximum CO₂ utilisation, carbon reduction, and commercial revenue
            against conversion cost, transportation distance, and energy consumption.
          </p>
        </div>
      </div>

      {/* Interactive Weight Sliders & Presets */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              <span>Optimisation Priority Weightings</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust sliders or select a strategic policy preset to re-rank pathways in real-time.
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => applyPresetWeights('balanced')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              ⚖️ Balanced Policy
            </button>
            <button
              onClick={() => applyPresetWeights('decarbonization')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition cursor-pointer"
            >
              🌿 Max Decarbonization
            </button>
            <button
              onClick={() => applyPresetWeights('roi')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 transition cursor-pointer"
            >
              💰 Max Commercial ROI
            </button>
            <button
              onClick={() => applyPresetWeights('lowEnergy')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-950/80 hover:bg-yellow-900 text-yellow-300 border border-yellow-800 transition cursor-pointer"
            >
              ⚡ Low Energy Footprint
            </button>
          </div>
        </div>

        {/* 6 Dimension Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Max CO2 Utilisation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-cyan-400" />
                <span>Max CO₂ Utilisation</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {Math.round(weights.co2Utilisation * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.co2Utilisation}
              onChange={(e) => handleWeightChange('co2Utilisation', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Max Carbon Reduction */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Max Carbon Reduction</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {Math.round(weights.carbonReduction * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.carbonReduction}
              onChange={(e) => handleWeightChange('carbonReduction', Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Max Revenue */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-emerald-300" />
                <span>Max Revenue Value</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300">
                {Math.round(weights.revenue * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.revenue}
              onChange={(e) => handleWeightChange('revenue', Number(e.target.value))}
              className="w-full accent-emerald-300 cursor-pointer"
            />
          </div>

          {/* Min Conversion Cost */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-rose-400" />
                <span>Min Conversion Cost</span>
              </span>
              <span className="text-xs font-mono font-bold text-rose-400">
                {Math.round(weights.minCost * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.minCost}
              onChange={(e) => handleWeightChange('minCost', Number(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer"
            />
          </div>

          {/* Min Distance */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                <Navigation className="w-4 h-4 text-indigo-400" />
                <span>Min Transport Distance</span>
              </span>
              <span className="text-xs font-mono font-bold text-indigo-400">
                {Math.round(weights.minDistance * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.minDistance}
              onChange={(e) => handleWeightChange('minDistance', Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
          </div>

          {/* Min Energy */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Min Energy Consumption</span>
              </span>
              <span className="text-xs font-mono font-bold text-yellow-400">
                {Math.round(weights.minEnergy * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.minEnergy}
              onChange={(e) => handleWeightChange('minEnergy', Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Spotlight Best Utilisation Pathway Box */}
      {bestPathway && (
        <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-2 border-emerald-500/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                <span>BEST UTILISATION PATHWAY</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100">{bestPathway.name}</h3>
              <p className="text-sm text-slate-300 max-w-2xl">{bestPathway.description}</p>
            </div>

            <div className="bg-slate-950/90 border border-emerald-500/40 p-5 rounded-2xl text-center shrink-0 min-w-[180px]">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Pareto Feasibility Score
              </span>
              <span className="text-4xl font-extrabold text-emerald-400 font-mono my-1 block">
                {bestPathway.overallScore}
                <span className="text-lg text-slate-400 font-normal">/100</span>
              </span>
              <span className="text-[11px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full inline-block">
                Rank #1 Recommendation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">CO₂ Utilised</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">
                {bestPathway.co2Utilised.toLocaleString()} t/d
              </span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Distance</span>
              <span className="text-sm font-bold text-indigo-300 font-mono">
                {bestPathway.distanceKm} km
              </span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Energy</span>
              <span className="text-sm font-bold text-yellow-400 font-mono">
                {bestPathway.energyRequirement.toLocaleString()} MWh
              </span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Total Cost</span>
              <span className="text-sm font-bold text-rose-400 font-mono">
                ${bestPathway.totalCostPerTonne}/t
              </span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Revenue</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">
                ${bestPathway.potentialRevenuePerTonne}/t
              </span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Net Carbon Cut</span>
              <span className="text-sm font-bold text-emerald-300 font-mono">
                {bestPathway.carbonReduction.toLocaleString()} t/d
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Comparative Optimisation Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span>Multi-Objective Comparative Matrix</span>
          </h3>
          <span className="text-xs text-slate-400">Sorted by Overall Score</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Utilisation Method</th>
                <th className="py-3 px-4 text-right">CO₂ Utilised</th>
                <th className="py-3 px-4 text-right">Distance</th>
                <th className="py-3 px-4 text-right">Energy</th>
                <th className="py-3 px-4 text-right">Cost ($/t)</th>
                <th className="py-3 px-4 text-right">Revenue ($/t)</th>
                <th className="py-3 px-4 text-right">Carbon Reduction</th>
                <th className="py-3 px-4 text-right">Overall Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {optimizedPathways.map((pathway) => {
                const isBest = pathway.rank === 1;

                return (
                  <tr
                    key={pathway.id}
                    className={`transition ${
                      isBest
                        ? 'bg-emerald-950/30 font-semibold text-slate-100'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono">
                      {isBest ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                          1
                        </span>
                      ) : (
                        `#${pathway.rank}`
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-100 block">{pathway.name}</span>
                      <span className="text-[10px] text-slate-400">{pathway.category}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-cyan-400">
                      {pathway.co2Utilised.toLocaleString()} t/d
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-indigo-300">
                      {pathway.distanceKm} km
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-yellow-400">
                      {pathway.energyRequirement.toLocaleString()} MWh
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-rose-400">
                      ${pathway.totalCostPerTonne}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400">
                      ${pathway.potentialRevenuePerTonne}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-300">
                      {pathway.carbonReduction.toLocaleString()} t/d
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg font-mono font-bold text-sm ${
                          isBest
                            ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                            : 'bg-slate-800 text-slate-200'
                        }`}
                      >
                        {pathway.overallScore}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action to Step 5 */}
      <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
        <div className="text-xs text-slate-400">
          Identified best pathway. Next: Geo-Spatial Buyer & Industry Matchmaking.
        </div>
        <button
          id="proceed-to-buyer-matching-btn"
          type="button"
          onClick={onProceedToBuyerMatching}
          className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition cursor-pointer"
        >
          <span>Proceed to Buyer Matching</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
