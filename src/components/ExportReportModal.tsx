import React from 'react';
import {
  X,
  Printer,
  FileText,
  Download,
  CheckCircle2,
  Building2,
  Factory,
  Sparkles,
  Award,
  DollarSign,
  Leaf,
  ShieldCheck,
  Zap,
  Flame
} from 'lucide-react';
import { RecommendationStrategy, OptimizedPathway, Buyer } from '../types/carbon';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: RecommendationStrategy;
  allPathways: OptimizedPathway[];
  allBuyers: Buyer[];
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  strategy,
  allPathways,
  allBuyers
}) => {
  if (!isOpen) return null;

  const {
    source,
    recommendedPathway,
    recommendedBuyer,
    economicImpact,
    environmentalImpact,
    logisticsSummary,
    aiNarrativeExplanation,
    timestamp
  } = strategy;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100">
        {/* Modal Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">
              CCUS Commercial Feasibility & Matching Dossier
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Header */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                Official AI Feasibility Strategy
              </span>
              <h1 className="text-xl font-bold text-slate-100">{source.industryName}</h1>
              <p className="text-xs text-slate-400">
                Facility Location: {source.location.name} ({source.location.region},{' '}
                {source.location.country})
              </p>
            </div>
            <div className="text-right text-xs text-slate-400 font-mono">
              <span>Date: {new Date(timestamp).toLocaleDateString()}</span>
              <div className="text-emerald-400 font-bold">Status: Validated Optimal</div>
            </div>
          </div>
        </div>

        {/* AI Executive Summary Narrative */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-emerald-500/30 space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            Executive Strategy Summary
          </span>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;{aiNarrativeExplanation}&rdquo;
          </p>
        </div>

        {/* 3 Column Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 block uppercase">1. Emitter Stream</span>
            <div className="text-slate-300 space-y-1">
              <div>Type: <strong>{source.industryType}</strong></div>
              <div>Output: <strong>{source.co2Quantity.toLocaleString()} t/day</strong></div>
              <div>Purity: <strong>{source.co2Purity}%</strong></div>
              <div>Capture Cost: <strong>${source.operatingCost}/t</strong></div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block uppercase">2. Recommended Pathway</span>
            <div className="text-slate-300 space-y-1">
              <div>Method: <strong>{recommendedPathway.name}</strong></div>
              <div>Tech: <strong>{recommendedPathway.technologyName}</strong></div>
              <div>Product: <strong>{recommendedPathway.productOutput.amount.toLocaleString()} {recommendedPathway.productOutput.unit}</strong></div>
              <div>Score: <strong>{recommendedPathway.overallScore}/100</strong></div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-400 block uppercase">3. Matched Buyer</span>
            <div className="text-slate-300 space-y-1">
              <div>Partner: <strong>{recommendedBuyer.name}</strong></div>
              <div>Distance: <strong>{recommendedBuyer.distance} km</strong></div>
              <div>Transport: <strong>{recommendedBuyer.logisticsMode}</strong></div>
              <div>Off-Take: <strong>${recommendedBuyer.offTakePricePerTonne}/t</strong></div>
            </div>
          </div>
        </div>

        {/* Financial & Environmental KPI Table */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
            Techno-Economic & Environmental Projections (Annualized)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Annual CO₂ Utilised</span>
              <span className="text-base font-bold text-cyan-400">
                {environmentalImpact.annualCO2Utilised.toLocaleString()} tonnes
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Annual CO₂e Avoided</span>
              <span className="text-base font-bold text-emerald-400">
                {environmentalImpact.annualCarbonReduction.toLocaleString()} tonnes
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Annual OPEX Cost</span>
              <span className="text-base font-bold text-rose-400">
                ${((economicImpact.totalCostPerDay * 350) / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Annual Net Margin</span>
              <span className="text-base font-bold text-emerald-300">
                +${(economicImpact.annualNetBenefit / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
