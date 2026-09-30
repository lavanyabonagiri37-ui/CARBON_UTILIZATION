import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Truck,
  Layers,
  CheckCircle2,
  Factory,
  Radio,
  Anchor,
  Compass
} from 'lucide-react';
import { Buyer, IndustryInput } from '../types/carbon';

interface GeoMapVisualizerProps {
  source: IndustryInput;
  buyers: Buyer[];
  selectedBuyerId?: string;
  onSelectBuyer?: (buyerId: string) => void;
}

export const GeoMapVisualizer: React.FC<GeoMapVisualizerProps> = ({
  source,
  buyers,
  selectedBuyerId,
  onSelectBuyer
}) => {
  const [hoveredBuyer, setHoveredBuyer] = useState<Buyer | null>(null);

  // Center coordinate is source
  const centerLat = source.location.lat;
  const centerLng = source.location.lng;

  // Viewbox coordinates: center is (400, 220)
  const mapWidth = 800;
  const mapHeight = 440;
  const cx = mapWidth / 2;
  const cy = mapHeight / 2;

  // Scaling: 1 degree lat ≈ 111 km. Let 250km fit within ~180px radius
  const maxDistance = Math.max(...buyers.slice(0, 8).map((b) => b.distance), 150);
  const scalePxPerKm = 170 / (maxDistance || 150);

  // Compute (x, y) relative to source
  const getCoordinates = (lat: number, lng: number, distanceKm: number) => {
    const dLat = lat - centerLat;
    const dLng = lng - centerLng;
    // Simple projection
    const x = cx + dLng * 80 * (scalePxPerKm * 1.5);
    const y = cy - dLat * 80 * (scalePxPerKm * 1.5);
    
    // Clamp to map boundaries
    const clampedX = Math.max(60, Math.min(mapWidth - 60, x));
    const clampedY = Math.max(45, Math.min(mapHeight - 45, y));
    return { x: clampedX, y: clampedY };
  };

  const topBuyers = buyers.slice(0, 5);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-2xl">
      {/* Map Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">
            Geospatial Carbon Logistics Radar
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Origin: {source.location.name}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>CO₂ Source</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span>Matched Off-Takers</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 border border-dashed border-cyan-400 inline-block" />
            <span>Logistics Corridors</span>
          </span>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[440px] bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 rounded-xl border border-slate-800/80 overflow-hidden select-none">
        {/* Subtle Grid Lines */}
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-full cursor-crosshair"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(51, 65, 85, 0.25)"
                strokeWidth="0.8"
              />
            </pattern>
            {/* Pulsing Gradient */}
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.25)" />
              <stop offset="60%" stopColor="rgba(16, 185, 129, 0.05)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </radialGradient>
            {/* Route Line Gradients */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Distance Concentric Circles */}
          {[50, 100, 200, 350].map((dist) => {
            const r = dist * scalePxPerKm;
            if (r > mapWidth / 1.5) return null;
            return (
              <g key={dist}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="rgba(51, 65, 85, 0.45)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={cx + r + 4}
                  y={cy - 4}
                  fill="rgba(148, 163, 184, 0.5)"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {dist} km
                </text>
              </g>
            );
          })}

          {/* Source Pulse Glow */}
          <circle cx={cx} cy={cy} r="65" fill="url(#radarGlow)" />

          {/* Connecting Logistics Arcs from Source to Top 5 Buyers */}
          {topBuyers.map((buyer, idx) => {
            const { x, y } = getCoordinates(
              buyer.location.lat,
              buyer.location.lng,
              buyer.distance
            );
            const isSelected = buyer.id === selectedBuyerId;
            const isHovered = hoveredBuyer?.id === buyer.id;

            // Curved Quadratic Bezier Control Point
            const midX = (cx + x) / 2 + (idx % 2 === 0 ? 25 : -25);
            const midY = (cy + y) / 2 - 20;

            return (
              <g key={`route-${buyer.id}`}>
                <path
                  d={`M ${cx} ${cy} Q ${midX} ${midY} ${x} ${y}`}
                  fill="none"
                  stroke={isSelected || isHovered ? '#10b981' : 'rgba(6, 182, 212, 0.45)'}
                  strokeWidth={isSelected || isHovered ? 2.5 : 1.2}
                  strokeDasharray={isSelected || isHovered ? 'none' : '3 3'}
                  className="transition-all duration-300"
                />
                {/* Distance Badge on route */}
                <rect
                  x={midX - 22}
                  y={midY - 9}
                  width="44"
                  height="16"
                  rx="4"
                  fill="#020617"
                  stroke={isSelected ? '#10b981' : '#334155'}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 3}
                  textAnchor="middle"
                  fill={isSelected ? '#34d399' : '#94a3b8'}
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  {buyer.distance}km
                </text>
              </g>
            );
          })}

          {/* Center Emitter Point (CO2 Source) */}
          <g>
            <circle
              cx={cx}
              cy={cy}
              r="14"
              fill="#ef4444"
              fillOpacity="0.2"
              stroke="#ef4444"
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle cx={cx} cy={cy} r="6" fill="#ef4444" />
            <text
              x={cx}
              y={cy + 24}
              textAnchor="middle"
              fill="#f87171"
              fontSize="10"
              fontWeight="bold"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              CO₂ Source: {source.industryName.split(' ')[0]}
            </text>
          </g>

          {/* Buyer Pins */}
          {topBuyers.map((buyer, idx) => {
            const { x, y } = getCoordinates(
              buyer.location.lat,
              buyer.location.lng,
              buyer.distance
            );
            const isSelected = buyer.id === selectedBuyerId;
            const isHovered = hoveredBuyer?.id === buyer.id;
            const isBest = idx === 0;

            return (
              <g
                key={`pin-${buyer.id}`}
                className="cursor-pointer group"
                onClick={() => onSelectBuyer && onSelectBuyer(buyer.id)}
                onMouseEnter={() => setHoveredBuyer(buyer)}
                onMouseLeave={() => setHoveredBuyer(null)}
              >
                {/* Pin Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isBest ? 12 : 9}
                  fill={isSelected ? '#10b981' : isBest ? '#059669' : '#0f766e'}
                  stroke={isSelected || isBest ? '#6ee7b7' : '#14b8a6'}
                  strokeWidth={isSelected ? 3 : 1.5}
                />
                <text
                  x={x}
                  y={y + 3.5}
                  textAnchor="middle"
                  fill="#020617"
                  fontSize={isBest ? '9' : '8'}
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace"
                >
                  #{idx + 1}
                </text>

                {/* Buyer Label */}
                <text
                  x={x}
                  y={y - 14}
                  textAnchor="middle"
                  fill={isSelected ? '#34d399' : '#e2e8f0'}
                  fontSize="9.5"
                  fontWeight={isSelected || isBest ? 'bold' : 'normal'}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {buyer.name.split(' ')[0]} {buyer.name.split(' ')[1] || ''}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered Tooltip Overlay */}
        {hoveredBuyer && (
          <div className="absolute bottom-3 left-3 bg-slate-900/95 border border-emerald-500/50 rounded-xl p-3.5 shadow-2xl backdrop-blur-md max-w-xs text-xs pointer-events-none animate-fadeIn">
            <div className="flex items-center justify-between space-x-2 border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-bold text-slate-100 truncate">{hoveredBuyer.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                {hoveredBuyer.compatibilityScore}% Match
              </span>
            </div>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Distance:</span>
                <span className="font-mono text-cyan-300 font-bold">{hoveredBuyer.distance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CO₂ Demand:</span>
                <span className="font-mono text-slate-200">{hoveredBuyer.co2Requirement} t/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Purity Req:</span>
                <span className="font-mono text-emerald-400">&gt;={hoveredBuyer.requiredPurity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Logistics:</span>
                <span className="text-slate-200">{hoveredBuyer.logisticsMode}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
