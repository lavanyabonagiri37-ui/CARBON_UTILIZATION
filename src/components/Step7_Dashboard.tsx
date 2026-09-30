import React, { useState } from 'react';
import {
  LayoutDashboard,
  Factory,
  Sparkles,
  TrendingUp,
  Leaf,
  Navigation,
  FileText,
  RotateCcw,
  PlusCircle,
  DollarSign,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Building2,
  BarChart3,
  PieChart as PieIcon,
  HelpCircle,
  Truck,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { RecommendationStrategy, OptimizedPathway, Buyer } from '../types/carbon';

interface Step7Props {
  strategy: RecommendationStrategy;
  allPathways: OptimizedPathway[];
  allBuyers: Buyer[];
  onReset: () => void;
  onRunNewAnalysis: () => void;
  onOpenReport: () => void;
}

export const Step7_Dashboard: React.FC<Step7Props> = ({
  strategy,
  allPathways,
  allBuyers,
  onReset,
  onRunNewAnalysis,
  onOpenReport
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'pathways' | 'finance' | 'carbon' | 'logistics' | 'radar'>('pathways');

  const {
    source,
    recommendedPathway,
    recommendedBuyer,
    economicImpact,
    environmentalImpact,
    logisticsSummary
  } = strategy;

  // Chart 1: Pathway Comparison Data
  const pathwayChartData = allPathways.map((p) => ({
    name: p.name.replace('CO₂ → ', '').split(' & ')[0],
    overallScore: p.overallScore,
    co2Utilised: p.co2Utilised,
    carbonReduction: p.carbonReduction
  }));

  // Chart 2: Cost vs Revenue
  const financeChartData = allPathways.map((p) => ({
    name: p.name.replace('CO₂ → ', '').split(' & ')[0],
    DailyCostK: Math.round(p.totalConversionCost / 1000),
    DailyRevenueK: Math.round(p.totalRevenue / 1000),
    NetProfitK: Math.round((p.totalRevenue - p.totalConversionCost) / 1000)
  }));

  // Chart 3: Carbon Reduction & Net Balance
  const carbonChartData = allPathways.map((p) => ({
    name: p.name.replace('CO₂ → ', '').split(' & ')[0],
    grossReduction: p.carbonReduction,
    netBalance: p.netEmissionsBalance
  }));

  // Chart 4: Buyer Distance vs Off-take Price
  const buyerChartData = allBuyers.slice(0, 6).map((b) => ({
    name: b.name.split(' ')[0],
    distanceKm: b.distance,
    demandTons: b.co2Requirement,
    offTakePrice: b.offTakePricePerTonne
  }));

  // Chart 5: Multi-Criteria Radar for Recommended Pathway
  const radarData = [
    { subject: 'CO₂ Utilisation', score: recommendedPathway.scores.utilScore },
    { subject: 'Carbon Reduction', score: recommendedPathway.scores.carbonScore },
    { subject: 'Revenue Margin', score: recommendedPathway.scores.revenueScore },
    { subject: 'Cost Efficiency', score: recommendedPathway.scores.costScore },
    { subject: 'Proximity', score: recommendedPathway.scores.distanceScore },
    { subject: 'Energy Fit', score: recommendedPathway.scores.energyScore }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Workflow Phase 07 • Operations Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              CCUS Strategy & Techno-Economic Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Live operational metrics for {source.industryName} • Source: {source.location.name}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReport}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-2 transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Executive Report</span>
            </button>
            <button
              onClick={onRunNewAnalysis}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Run New Analysis</span>
            </button>
            <button
              onClick={onReset}
              className="p-2.5 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 transition cursor-pointer"
              title="Reset Analysis"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5 KPI Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. CO2 Source */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
              <Factory className="w-3.5 h-3.5" />
              <span>CO₂ SOURCE</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">{source.industryType}</span>
          </div>
          <div>
            <span className="text-2xl font-bold font-mono text-slate-100 block">
              {source.co2Quantity.toLocaleString()} <span className="text-xs text-slate-400 font-normal">t/day</span>
            </span>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Purity: <strong className="text-emerald-400 font-mono">{source.co2Purity}%</strong></span>
              <span className="truncate max-w-[90px]">{source.location.region.split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* 2. AI Recommendation */}
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-5 shadow-lg space-y-2 ring-1 ring-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI PATHWAY</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950">
              {recommendedPathway.overallScore}/100
            </span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-100 truncate block">
              {recommendedPathway.name.replace('CO₂ → ', '')}
            </span>
            <span className="text-xs text-emerald-300/80 truncate block mt-1">
              Partner: {recommendedBuyer.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* 3. Economic Impact */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span>ECONOMIC IMPACT</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">
              +${(economicImpact.netProfitPerDay / 1000).toFixed(1)}k/d
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold font-mono text-emerald-400 block">
              ${(economicImpact.revenuePerDay / 1000).toFixed(1)}k <span className="text-xs text-slate-400 font-normal">rev/d</span>
            </span>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>OPEX: ${(economicImpact.totalCostPerDay / 1000).toFixed(1)}k</span>
              <span className="text-emerald-300 font-semibold">{economicImpact.roiPercentage}% ROI</span>
            </div>
          </div>
        </div>

        {/* 4. Environmental Impact */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center space-x-1">
              <Leaf className="w-3.5 h-3.5" />
              <span>ENVIRONMENTAL</span>
            </span>
            <span className="text-[10px] text-teal-400 font-mono">
              {environmentalImpact.utilisationEfficiencyPercent}% Eff.
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold font-mono text-teal-300 block">
              {environmentalImpact.carbonReductionPerDay.toLocaleString()} <span className="text-xs text-slate-400 font-normal">t/d</span>
            </span>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Annual: {(environmentalImpact.annualCarbonReduction / 1000).toFixed(0)}kt</span>
              <span>{environmentalImpact.carsOffRoadAnnually.toLocaleString()} cars</span>
            </div>
          </div>
        </div>

        {/* 5. Logistics */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5" />
              <span>LOGISTICS</span>
            </span>
            <span className="text-[10px] text-indigo-300 font-mono">
              {logisticsSummary.distanceKm} km
            </span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-100 truncate block">
              {logisticsSummary.transportMode}
            </span>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Cost: ${logisticsSummary.transportCostPerTonne}/t</span>
              <span>~{logisticsSummary.estimatedTrucksPerDay} loads/d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Charts Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Chart Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>Analytics & Comparative Visualizations</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-dimensional evaluation across conversion efficiency, economics, and logistics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveChartTab('pathways')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeChartTab === 'pathways'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Pathway Matrix
            </button>
            <button
              onClick={() => setActiveChartTab('finance')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeChartTab === 'finance'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Cost vs Revenue
            </button>
            <button
              onClick={() => setActiveChartTab('carbon')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeChartTab === 'carbon'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Carbon Abatement
            </button>
            <button
              onClick={() => setActiveChartTab('logistics')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeChartTab === 'logistics'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Buyer Distance
            </button>
            <button
              onClick={() => setActiveChartTab('radar')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeChartTab === 'radar'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              5. Strategic Radar
            </button>
          </div>
        </div>

        {/* Active Chart Viewport */}
        <div className="h-[360px] w-full pt-4">
          {/* Chart 1: Pathways Comparison */}
          {activeChartTab === 'pathways' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pathwayChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="overallScore" name="Overall Pareto Score (/100)" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="co2Utilised" name="CO₂ Utilised (t/d)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Chart 2: Cost vs Revenue */}
          {activeChartTab === 'finance' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit="k$" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: any) => [`$${value}k / day`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="DailyCostK" name="Total Daily OPEX ($k)" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="DailyRevenueK" name="Gross Daily Revenue ($k)" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="NetProfitK" name="Net Profit ($k)" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Chart 3: Carbon Reduction */}
          {activeChartTab === 'carbon' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit=" t" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="grossReduction"
                  name="CO₂e Avoided (t/day)"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#carbonGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="netBalance"
                  name="Net Abatement Balance"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={0.2}
                  fill="#06b6d4"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {/* Chart 4: Buyer Distance vs Demand */}
          {activeChartTab === 'logistics' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buyerChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="distanceKm" name="Distance from Source (km)" fill="#818cf8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="offTakePrice" name="Off-Take Offer ($/t CO₂)" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Chart 5: Multi-Criteria Radar */}
          {activeChartTab === 'radar' && (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
                <Radar
                  name="Selected Strategy Fit"
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
