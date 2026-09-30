import React from 'react';
import {
  UploadCloud,
  Factory,
  Gauge,
  Percent,
  Zap,
  DollarSign,
  MapPin,
  Flame,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { IndustryInput, IndustryType, LocationInfo } from '../types/carbon';
import { INDUSTRIAL_LOCATIONS, INDUSTRY_PRESETS } from '../data/industryPresets';

interface Step1Props {
  input: IndustryInput;
  onChangeInput: (newInput: IndustryInput) => void;
  onSubmitAndAnalyze: () => void;
  onSelectPreset: (presetId: string) => void;
}

export const Step1_IndustryInput: React.FC<Step1Props> = ({
  input,
  onChangeInput,
  onSubmitAndAnalyze,
  onSelectPreset
}) => {
  const handleFieldChange = <K extends keyof IndustryInput>(
    field: K,
    value: IndustryInput[K]
  ) => {
    onChangeInput({
      ...input,
      [field]: value
    });
  };

  const handleLocationChange = (locationName: string) => {
    const loc = INDUSTRIAL_LOCATIONS.find((l) => l.name === locationName);
    if (loc) {
      handleFieldChange('location', loc);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Workflow Phase 01</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Industry CO₂ Data Upload & Source Profiling
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Enter your industrial facility&apos;s flue gas and capture stream parameters. The AI
            engine will model the chemical composition, calculate thermodynamic conversion pathways,
            and query nearby off-taker networks.
          </p>

          {/* Quick Presets row */}
          <div className="mt-4 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Quick Test Cases:</span>
            {INDUSTRY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-emerald-950/80 hover:text-emerald-300 hover:border-emerald-500/40 text-slate-300 border border-slate-700 transition"
              >
                {preset.industryType}: {preset.data.industryName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 8 cols */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center space-x-2">
              <Factory className="w-5 h-5 text-emerald-400" />
              <span>Facility Parameters & Flue Gas Metrics</span>
            </h2>
            <span className="text-xs text-slate-400">All fields reactive in real-time</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Industry Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Industry / Facility Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={input.industryName}
                  onChange={(e) => handleFieldChange('industryName', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                  placeholder="e.g. Apex Industrial Kiln Complex"
                />
              </div>
            </div>

            {/* Industry Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Industry Classification
              </label>
              <select
                aria-label="Industry Classification"
                value={input.industryType}
                onChange={(e) =>
                  handleFieldChange('industryType', e.target.value as IndustryType)
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition cursor-pointer"
              >
                <option value="Cement">Cement (High CaCO3 / Point Source)</option>
                <option value="Steel">Steel (Blast Furnace / Off-Gas)</option>
                <option value="Power Plant">Power Plant (Coal / Natural Gas CCGT)</option>
                <option value="Chemical">Chemical (Ammonia / Syngas / Petrochemical)</option>
                <option value="Refinery">Refinery (Fluid Catalytic Cracker)</option>
                <option value="Other">Other Industrial Emitter</option>
              </select>
            </div>

            {/* CO2 Quantity */}
            <div className="sm:col-span-2 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <span>CO₂ Emission Quantity (Tonnes / Day)</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    value={input.co2Quantity}
                    onChange={(e) =>
                      handleFieldChange('co2Quantity', Math.max(1, Number(e.target.value)))
                    }
                    className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm font-mono text-cyan-400 text-right focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-xs text-slate-400">t/day</span>
                </div>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="25"
                value={input.co2Quantity}
                onChange={(e) => handleFieldChange('co2Quantity', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>50 t/day (Pilot)</span>
                <span>1,200 t/day (Standard)</span>
                <span>5,000 t/day (Mega Plant)</span>
              </div>
            </div>

            {/* CO2 Purity */}
            <div className="sm:col-span-2 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
                  <Percent className="w-4 h-4 text-emerald-400" />
                  <span>CO₂ Purity Concentration (%)</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="5"
                    max="99.9"
                    step="0.5"
                    value={input.co2Purity}
                    onChange={(e) =>
                      handleFieldChange('co2Purity', Math.min(99.9, Math.max(5, Number(e.target.value))))
                    }
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm font-mono text-emerald-400 text-right focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-400">%</span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="99.5"
                step="0.5"
                value={input.co2Purity}
                onChange={(e) => handleFieldChange('co2Purity', Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>10% (Flue gas)</span>
                <span>25% (Cement kiln)</span>
                <span>98%+ (Pure Shift gas)</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Geographic Hub / Location</span>
              </label>
              <select
                aria-label="Geographic Hub Location"
                value={input.location.name}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition cursor-pointer"
              >
                {INDUSTRIAL_LOCATIONS.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name} ({loc.region}, {loc.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Emission Rate */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Specific Emission Intensity Rate</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="5000"
                  value={input.emissionRate}
                  onChange={(e) =>
                    handleFieldChange('emissionRate', Math.max(10, Number(e.target.value)))
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                  placeholder="e.g. 680"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">kg CO₂/tonne</span>
              </div>
            </div>

            {/* Available Energy */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Available Energy / Power</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="2000"
                  value={input.availableEnergy}
                  onChange={(e) =>
                    handleFieldChange('availableEnergy', Math.max(10, Number(e.target.value)))
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">MWh / day</span>
              </div>
            </div>

            {/* Operating Cost */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Baseline Capture Cost</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="150"
                  value={input.operatingCost}
                  onChange={(e) =>
                    handleFieldChange('operatingCost', Math.max(1, Number(e.target.value)))
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">$/tonne CO₂</span>
              </div>
            </div>
          </div>

          {/* Submission Action */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ready for thermodynamic simulation and matchmaking calculations.</span>
            </div>

            <button
              id="analyze-co2-btn"
              type="button"
              onClick={onSubmitAndAnalyze}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Upload CO₂ Data / Analyze CO₂</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Right Summary Card (Instant Display after/during entry): 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                CO₂ Stream Summary Card
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Live State
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-slate-400 block">Facility Name</span>
                <span className="text-sm font-semibold text-slate-100 truncate block">
                  {input.industryName || 'Unnamed Facility'}
                </span>
                <span className="text-xs text-slate-400">{input.industryType} Sector</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 block">CO₂ Volume</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">
                    {input.co2Quantity.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">tonnes / day</span>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 block">Purity Stream</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {input.co2Purity}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">Concentration</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-medium text-right truncate max-w-[170px]">
                    {input.location.region}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Coordinates:</span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {input.location.lat.toFixed(2)}°, {input.location.lng.toFixed(2)}°
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Emission Rate:</span>
                  <span className="font-mono text-slate-200">{input.emissionRate} kg/unit</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Clean Energy Available:</span>
                  <span className="font-mono text-yellow-400">{input.availableEnergy} MWh/d</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Capture Unit OPEX:</span>
                  <span className="font-mono text-emerald-400">${input.operatingCost}/tonne</span>
                </div>
              </div>

              {/* Annualized estimate */}
              <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 p-3.5 rounded-xl border border-emerald-800/40">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Annual Emitter Profile</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ~{(input.co2Quantity * 350).toLocaleString()} tonnes/year captured CO₂ available
                  for permanent utilization or valorization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
