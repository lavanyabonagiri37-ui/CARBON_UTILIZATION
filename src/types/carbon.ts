export type IndustryType = 'Cement' | 'Steel' | 'Power Plant' | 'Chemical' | 'Refinery' | 'Other';

export interface LocationInfo {
  name: string;
  lat: number;
  lng: number;
  region: string;
  country: string;
}

export interface IndustryInput {
  industryName: string;
  industryType: IndustryType;
  co2Quantity: number; // tonnes/day
  co2Purity: number; // percentage (10% - 99.9%)
  emissionRate: number; // kg CO2 / tonne of product or MWh
  location: LocationInfo;
  availableEnergy: number; // MWh/day (clean/grid power)
  operatingCost: number; // $/tonne capture/conditioning cost
  moistureContent?: number; // %
  flueGasPressure?: number; // bar
}

export interface CO2Characterisation {
  quantityStatus: string;
  purityTier: 'Ultra-High (>98%)' | 'High (90-98%)' | 'Medium (50-90%)' | 'Dilute/Flue Gas (<50%)';
  emissionRateRating: 'Critical Heavy Emitter' | 'Moderate Emitter' | 'Light Point Source';
  energySufficiency: 'Abundant Surplus' | 'Adequate' | 'Constrained (Requires Grid Import)';
  captureReadinessScore: number; // 0-100
  suitableCategories: string[];
  incompatibleCategories: string[];
  keyChemicalProperties: {
    sulfurLevel: string;
    particulates: string;
    temperatureRange: string;
    compressionNeed: string;
  };
}

export interface ProductOutput {
  name: string;
  amount: number;
  unit: string;
  marketPricePerUnit: number;
}

export interface UtilisationPathway {
  id: string;
  name: string;
  technologyName: string;
  category: 'Construction Materials' | 'Chemicals & Polymers' | 'Synthetic Fuels' | 'Mineralisation' | 'Biological / Algae' | 'Geothermal / Working Fluid';
  minPurityRequired: number; // %
  compatibilityScore: number; // 0 - 100
  co2Utilised: number; // tonnes/day
  productOutput: ProductOutput;
  energyRequirement: number; // MWh/day
  energyPerTonne: number; // MWh / t CO2
  conversionCostPerTonne: number; // $/t CO2
  totalConversionCost: number; // $/day
  potentialRevenuePerTonne: number; // $/t CO2
  totalRevenue: number; // $/day
  carbonReduction: number; // tonnes CO2e avoided/day
  netEmissionsBalance: number; // tonnes net avoided
  trlLevel: number; // Technology Readiness Level 1-9
  description: string;
  environmentalBenefit: string;
  marketOutlook: 'Rapid Expansion' | 'High Demand' | 'Emerging Market' | 'Regulated Compliance Demand';
  purityMatchStatus: 'Optimal' | 'Requires Pre-Scrubbing' | 'Marginal' | 'Incompatible';
}

export interface OptimizationWeights {
  co2Utilisation: number; // weight 0-1
  carbonReduction: number;
  revenue: number;
  minCost: number;
  minDistance: number;
  minEnergy: number;
}

export interface OptimizedPathway extends UtilisationPathway {
  distanceKm: number;
  transportCostPerTonne: number;
  totalCostPerTonne: number;
  overallScore: number;
  rank: number;
  scores: {
    utilScore: number;
    carbonScore: number;
    revenueScore: number;
    costScore: number;
    distanceScore: number;
    energyScore: number;
  };
}

export interface Buyer {
  id: string;
  name: string;
  industryType: string;
  location: LocationInfo;
  co2Requirement: number; // tonnes/day
  requiredPurity: number; // min %
  distance: number; // km from source (calculated)
  estimatedAnnualDemand: number; // tonnes/year
  offTakePricePerTonne: number; // $/tonne CO2 purchase price
  compatibilityScore: number; // 0-100
  logisticsMode: 'Cryogenic Truck' | 'CO2 Pipeline' | 'Rail Tanker' | 'Barge / Coastal Vessel';
  targetProducts: string[];
  readinessStatus: 'Ready for Immediate Off-take' | 'Planned Expansion (Q3)' | 'Pilot Integration';
  matchReasons: string[];
}

export interface RecommendationStrategy {
  source: IndustryInput;
  characterisation: CO2Characterisation;
  recommendedPathway: OptimizedPathway;
  recommendedBuyer: Buyer;
  economicImpact: {
    conversionCostPerDay: number;
    transportCostPerDay: number;
    totalCostPerDay: number;
    revenuePerDay: number;
    netProfitPerDay: number;
    annualNetBenefit: number;
    roiPercentage: number;
    carbonCreditValuePerDay: number;
  };
  environmentalImpact: {
    co2UtilisedPerDay: number;
    annualCO2Utilised: number;
    carbonReductionPerDay: number;
    annualCarbonReduction: number;
    utilisationEfficiencyPercent: number;
    equivalentTreesPlanted: number;
    carsOffRoadAnnually: number;
  };
  logisticsSummary: {
    distanceKm: number;
    transportMode: string;
    transportCostPerTonne: number;
    pipelineFeasible: boolean;
    estimatedTrucksPerDay: number;
  };
  aiNarrativeExplanation: string;
  timestamp: string;
}

export interface IndustryPreset {
  id: string;
  name: string;
  industryType: IndustryType;
  description: string;
  data: IndustryInput;
}
