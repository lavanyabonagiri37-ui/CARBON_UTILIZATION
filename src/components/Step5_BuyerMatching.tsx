import React, { useState } from 'react';
import {
  Users,
  ArrowRight,
  MapPin,
  Truck,
  DollarSign,
  Gauge,
  Percent,
  CheckCircle2,
  Trophy,
  Filter,
  Sparkles,
  Search,
  Building2,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { Buyer, IndustryInput } from '../types/carbon';
import { GeoMapVisualizer } from './GeoMapVisualizer';

interface Step5Props {
  buyers: Buyer[];
  input: IndustryInput;
  onProceedToRecommendation: () => void;
}

export const Step5_BuyerMatching: React.FC<Step5Props> = ({
  buyers,
  input,
  onProceedToRecommendation
}) => {
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>(buyers[0]?.id || '');
  const [filterType, setFilterType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'compat' | 'distance' | 'demand' | 'price'>('compat');

  // Top 5 buyers for spotlighting
  const top5Buyers = buyers.slice(0, 5);
  const bestBuyer = top5Buyers[0];

  // Filtering & Sorting for full list
  const filteredBuyers = buyers
    .filter((b) => {
      if (filterType === 'All') return true;
      return b.industryType.toLowerCase().includes(filterType.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'demand') return b.co2Requirement - a.co2Requirement;
      if (sortBy === 'price') return b.offTakePricePerTonne - a.offTakePricePerTonne;
      return b.compatibilityScore - a.compatibilityScore;
    });

  const selectedBuyer = buyers.find((b) => b.id === selectedBuyerId) || bestBuyer;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Workflow Phase 05</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Geospatial Buyer & Off-Taker Matching Network
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Calculated distance matrices and purity tolerances to connect your{' '}
            <span className="text-cyan-400 font-semibold">{input.location.name}</span> facility
            with verified regional industrial off-takers and supply agreements.
          </p>
        </div>
      </div>

      {/* Best Buyer Match Spotlight Card */}
      {bestBuyer && (
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 border-2 border-emerald-500/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                <span>BEST BUYER MATCH</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-100">{bestBuyer.name}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                  <span className="flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{bestBuyer.industryType}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>
                      {bestBuyer.location.address} ({bestBuyer.distance} km away)
                    </span>
                  </span>
                </div>
              </div>

              {/* Match Reasons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {bestBuyer.matchReasons.map((reason, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{reason}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Score & Off-take Price Callout */}
            <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center bg-slate-950/90 border border-emerald-500/40 p-5 rounded-2xl text-center shrink-0 min-w-[200px] gap-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Buyer Compatibility
                </span>
                <span className="text-4xl font-extrabold text-emerald-400 font-mono my-0.5 block">
                  {bestBuyer.compatibilityScore}%
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 w-full">
                <span className="text-[11px] text-slate-400 block">Offer Price</span>
                <span className="text-base font-bold text-emerald-300 font-mono">
                  ${bestBuyer.offTakePricePerTonne} / tonne CO₂
                </span>
              </div>
            </div>
          </div>

          {/* 4 Key Match Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Haversine Distance</span>
              <span className="text-lg font-bold text-indigo-300 font-mono">
                {bestBuyer.distance} km
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Logistics: {bestBuyer.logisticsMode}
              </span>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Required CO₂ Volume</span>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {bestBuyer.co2Requirement.toLocaleString()} t/d
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Annual: ~{(bestBuyer.estimatedAnnualDemand / 1000).toFixed(0)}k tonnes
              </span>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Purity Threshold</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">
                &gt;= {bestBuyer.requiredPurity}%
              </span>
              <span className="text-[10px] text-emerald-400/80 block mt-0.5">
                {input.co2Purity >= bestBuyer.requiredPurity ? 'Stream meets specification' : 'Pre-scrubbing needed'}
              </span>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Target End-Product</span>
              <span className="text-sm font-semibold text-slate-200 truncate block mt-0.5">
                {bestBuyer.targetProducts[0]}
              </span>
              <span className="text-[10px] text-emerald-400 block">
                {bestBuyer.readinessStatus}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Geospatial Radar / Logistics Map */}
      <GeoMapVisualizer
        source={input}
        buyers={buyers}
        selectedBuyerId={selectedBuyerId}
        onSelectBuyer={(id) => setSelectedBuyerId(id)}
      />

      {/* Top 5 Potential Buyers Table & Ranking */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Top 5 Ranked Potential Off-Takers</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked dynamically by distance, purity compliance, and off-take commercial price.
            </p>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                aria-label="Filter buyers by sector"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All">All Sectors</option>
                <option value="Concrete">Concrete & Curing</option>
                <option value="Chemicals">Chemicals & Methanol</option>
                <option value="Fuels">Synthetic Fuels & SAF</option>
                <option value="Mineralisation">Mineralisation</option>
                <option value="Algae">Biological / Algae</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                aria-label="Sort buyers by metric"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="compat">Highest Compatibility</option>
                <option value="distance">Shortest Distance</option>
                <option value="demand">Largest Demand</option>
                <option value="price">Highest Price ($/t)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 5 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {top5Buyers.map((buyer, idx) => {
            const isBest = idx === 0;
            const isSelected = buyer.id === selectedBuyerId;

            return (
              <div
                key={buyer.id}
                onClick={() => setSelectedBuyerId(buyer.id)}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          isBest
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-100 truncate max-w-[150px]">
                        {buyer.name}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {buyer.compatibilityScore}%
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 block mb-3">
                    {buyer.industryType}
                  </span>

                  <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Distance:</span>
                      <span className="font-mono text-indigo-300 font-bold">{buyer.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Demand:</span>
                      <span className="font-mono text-cyan-400">{buyer.co2Requirement} t/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Required Purity:</span>
                      <span className="font-mono text-emerald-400">&gt;={buyer.requiredPurity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Off-Take Price:</span>
                      <span className="font-mono text-emerald-300 font-bold">
                        ${buyer.offTakePricePerTonne}/t
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-400">
                  <span className="truncate max-w-[140px]">{buyer.logisticsMode}</span>
                  <span className="text-emerald-400 font-medium">
                    {isSelected ? 'Active Selection' : 'Inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action to Step 6 */}
      <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
        <div className="text-xs text-slate-400">
          Matched optimal buyer partner. Next: Synthesize Final Strategy & AI Recommendation.
        </div>
        <button
          id="proceed-to-recommendation-btn"
          type="button"
          onClick={onProceedToRecommendation}
          className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition cursor-pointer"
        >
          <span>Generate Best Recommendation</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
