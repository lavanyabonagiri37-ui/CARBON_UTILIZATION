import React from 'react';
import {
  Award,
  ArrowRight,
  Sparkles,
  Factory,
  Building2,
  TrendingUp,
  DollarSign,
  Leaf,
  Navigation,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Printer
} from 'lucide-react';
import { RecommendationStrategy } from '../types/carbon';

interface Step6Props {
  strategy: RecommendationStrategy;
  onProceedToDashboard: () => void;
  onOpenReport: () => void;
}

export const Step6_BestRecommendation: React.FC<Step6Props> = ({
  strategy,
  onProceedToDashboard,
  onOpenReport
}) => {
  const {
    source,
    recommendedPathway,
    recommendedBuyer,
    economicImpact,
    environmentalImpact,
    logisticsSummary,
    aiNarrativeExplanation
  } = strategy;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-2 border-emerald-500/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-md shadow-emerald-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>Workflow Phase 06 • Final Strategy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            RECOMMENDED CARBON UTILISATION STRATEGY
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Synthesized end-to-end commercial roadmap integrating capture conditioning, optimal conversion thermodynamics,
            and localized off-taker logistics.
          </p>
        </div>
      </div>

      {/* Dynamic AI Explanation Quote Box */}
      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-xl relative">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                AI Strategic Feasibility Synthesis
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Pareto Index: {recommendedPathway.overallScore}/100
              </span>
            </div>
            <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-emerald-500/60 pl-4">
              &ldquo;{aiNarrativeExplanation}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars: Source, Utilisation, Buyer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. CO2 Source Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <Factory className="w-4 h-4" />
              <span>CO₂ Source</span>
            </span>
            <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              Emitter
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Facility Name:</span>
              <span className="text-sm font-bold text-slate-100 block">{source.industryName}</span>
              <span className="text-slate-400">{source.industryType} Industrial Point Source</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Available CO₂:</span>
              <span className="font-mono font-bold text-cyan-400">{source.co2Quantity} tonnes/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Stream Purity:</span>
              <span className="font-mono font-bold text-emerald-400">{source.co2Purity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="font-medium text-slate-200 text-right truncate max-w-[140px]">
                {source.location.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Capture OPEX:</span>
              <span className="font-mono text-slate-200">${source.operatingCost}/tonne</span>
            </div>
          </div>
        </div>

        {/* 2. Recommended Utilisation Card */}
        <div className="bg-slate-900/90 border border-emerald-500/50 rounded-2xl p-6 shadow-xl space-y-4 ring-1 ring-emerald-500/20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Utilisation</span>
            </span>
            <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
              Rank #1
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Technology Pathway:</span>
              <span className="text-sm font-bold text-slate-100 block">{recommendedPathway.name}</span>
              <span className="text-emerald-300/80">{recommendedPathway.technologyName}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Utilised Volume:</span>
              <span className="font-mono font-bold text-cyan-400">
                {recommendedPathway.co2Utilised} tonnes/day
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Product Output:</span>
              <span className="font-mono font-semibold text-slate-200">
                {recommendedPathway.productOutput.amount.toLocaleString()} {recommendedPathway.productOutput.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Energy Needed:</span>
              <span className="font-mono font-bold text-yellow-400">
                {recommendedPathway.energyRequirement} MWh/d
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Conversion Cost:</span>
              <span className="font-mono text-rose-400">${recommendedPathway.conversionCostPerTonne}/t CO₂</span>
            </div>
          </div>
        </div>

        {/* 3. Recommended Buyer Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <Building2 className="w-4 h-4" />
              <span>Recommended Buyer</span>
            </span>
            <span className="text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded">
              Off-Taker
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Buyer Partner:</span>
              <span className="text-sm font-bold text-slate-100 block">{recommendedBuyer.name}</span>
              <span className="text-slate-400">{recommendedBuyer.industryType}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Logistics Distance:</span>
              <span className="font-mono font-bold text-indigo-300">{recommendedBuyer.distance} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mode:</span>
              <span className="font-medium text-slate-200">{recommendedBuyer.logisticsMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">CO₂ Demand:</span>
              <span className="font-mono font-bold text-cyan-400">
                {recommendedBuyer.co2Requirement} t/day
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Off-Take Price:</span>
              <span className="font-mono font-bold text-emerald-400">
                ${recommendedBuyer.offTakePricePerTonne} / tonne CO₂
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Estimated Results: Techno-Economic & Environmental Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Estimated Techno-Economic & Environmental Results</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Holistic quantitative projections based on full-scale daily and annualized operations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              CO₂ Utilised
            </span>
            <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">
              {environmentalImpact.co2UtilisedPerDay.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              ~{environmentalImpact.annualCO2Utilised.toLocaleString()} tonnes/year
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Daily Total Cost
            </span>
            <span className="text-2xl font-bold text-rose-400 font-mono mt-1 block">
              ${(economicImpact.totalCostPerDay / 1000).toFixed(1)}k
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Conversion: ${(economicImpact.conversionCostPerDay / 1000).toFixed(1)}k • Transport: ${(economicImpact.transportCostPerDay / 1000).toFixed(1)}k
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Expected Daily Revenue
            </span>
            <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
              ${(economicImpact.revenuePerDay / 1000).toFixed(1)}k
            </span>
            <span className="text-[11px] text-emerald-400 mt-1 block">
              Net Profit: +${(economicImpact.netProfitPerDay / 1000).toFixed(1)}k/day
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Net Carbon Reduction
            </span>
            <span className="text-2xl font-bold text-emerald-300 font-mono mt-1 block">
              {environmentalImpact.carbonReductionPerDay.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              tonnes CO₂e abated/day
            </span>
          </div>
        </div>

        {/* Environmental Equivalencies Bar */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-950 p-4 rounded-xl border border-emerald-800/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <Leaf className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Annual Tree Absorption Equiv:</span>
              <span className="font-bold text-emerald-300 text-sm font-mono">
                {environmentalImpact.equivalentTreesPlanted.toLocaleString()} trees
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Passenger Cars Removed:</span>
              <span className="font-bold text-cyan-300 text-sm font-mono">
                {environmentalImpact.carsOffRoadAnnually.toLocaleString()} vehicles/yr
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-yellow-400 shrink-0" />
            <div>
              <span className="text-slate-400 block">Annual Net Value Creation:</span>
              <span className="font-bold text-yellow-300 text-sm font-mono">
                +${(economicImpact.annualNetBenefit / 1000000).toFixed(2)}M / year
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action to Dashboard */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={onOpenReport}
          className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Export Feasibility Dossier (PDF/Print)</span>
        </button>

        <button
          id="proceed-to-dashboard-btn"
          type="button"
          onClick={onProceedToDashboard}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <span>View Comprehensive Analytics Dashboard</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
