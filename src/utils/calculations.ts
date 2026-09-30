import {
  IndustryInput,
  CO2Characterisation,
  UtilisationPathway,
  OptimizationWeights,
  OptimizedPathway,
  Buyer,
  RecommendationStrategy
} from '../types/carbon';
import { RAW_BUYERS_DATABASE, RawBuyerData } from '../data/buyersDatabase';

/**
 * Calculates geodesic distance between two coordinate pairs using Haversine formula (km)
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

/**
 * Evaluates CO2 characterisation based on input specifications
 */
export function evaluateCO2Characterisation(input: IndustryInput): CO2Characterisation {
  const purity = input.co2Purity;
  let purityTier: CO2Characterisation['purityTier'];
  if (purity >= 98) purityTier = 'Ultra-High (>98%)';
  else if (purity >= 90) purityTier = 'High (90-98%)';
  else if (purity >= 50) purityTier = 'Medium (50-90%)';
  else purityTier = 'Dilute/Flue Gas (<50%)';

  const quantity = input.co2Quantity;
  let quantityStatus: string;
  if (quantity >= 2000) quantityStatus = 'Mega-Scale Point Source (High Economy of Scale)';
  else if (quantity >= 800) quantityStatus = 'Commercial Scale Industrial Source';
  else quantityStatus = 'Modular / Distributed Point Source';

  let emissionRateRating: CO2Characterisation['emissionRateRating'];
  if (input.emissionRate > 1000) emissionRateRating = 'Critical Heavy Emitter';
  else if (input.emissionRate > 400) emissionRateRating = 'Moderate Emitter';
  else emissionRateRating = 'Light Point Source';

  // Energy sufficiency
  const energyPerTonneAvg = 1.2; // MWh/tonne average
  const totalEnergyNeeded = (input.co2Quantity * energyPerTonneAvg) / 24; // MWh/hr
  let energySufficiency: CO2Characterisation['energySufficiency'];
  if (input.availableEnergy >= input.co2Quantity * 0.4) {
    energySufficiency = 'Abundant Surplus';
  } else if (input.availableEnergy >= input.co2Quantity * 0.15) {
    energySufficiency = 'Adequate';
  } else {
    energySufficiency = 'Constrained (Requires Grid Import)';
  }

  // Base readiness score
  let readiness = 60;
  if (purity >= 90) readiness += 25;
  else if (purity >= 30) readiness += 10;
  if (input.availableEnergy > 200) readiness += 10;
  if (input.operatingCost < 40) readiness += 5;
  readiness = Math.min(98, Math.max(45, readiness));

  const suitableCategories: string[] = [];
  const incompatibleCategories: string[] = [];

  // Purity category checks
  if (purity >= 15) suitableCategories.push('Mineralisation & Aggregates');
  if (purity >= 20) suitableCategories.push('Concrete Curing & Precast Building Materials');
  if (purity >= 10) suitableCategories.push('Algae & Biological Bioreactors');
  
  if (purity >= 88) {
    suitableCategories.push('Chemicals & Methanol Synthesis');
    suitableCategories.push('Synthetic Fuels & e-SAF');
    suitableCategories.push('Inorganic Carbonates & Bicarbonates');
  } else {
    incompatibleCategories.push('Direct Synthetic Fuels (Requires Upstream Amine Scrubbing)');
    incompatibleCategories.push('Polymer Polyols (Requires Purity >95%)');
  }

  return {
    quantityStatus,
    purityTier,
    emissionRateRating,
    energySufficiency,
    captureReadinessScore: readiness,
    suitableCategories,
    incompatibleCategories,
    keyChemicalProperties: {
      sulfurLevel: input.industryType === 'Steel' || input.industryType === 'Power Plant' ? 'Medium (Requires De-SOx filter)' : 'Low (<5 ppm)',
      particulates: input.industryType === 'Cement' ? 'High (Requires Baghouse Filter)' : 'Low / Scrubbed',
      temperatureRange: input.industryType === 'Cement' ? '120°C - 180°C' : input.industryType === 'Steel' ? '200°C - 350°C' : '45°C - 90°C',
      compressionNeed: purity >= 90 ? 'Direct Supercritical (73.8 bar)' : 'Dehydration + Stage Compression'
    }
  };
}

/**
 * Predicts and calculates suitable utilisation pathways for given CO2 input
 */
export function predictUtilisationPathways(input: IndustryInput): UtilisationPathway[] {
  const qty = input.co2Quantity;
  const purity = input.co2Purity;
  const energy = input.availableEnergy;
  const captureCost = input.operatingCost;

  // 1. Concrete / Construction Materials
  const concreteUtilised = Math.round(qty * 0.95);
  const concreteProductOutput = Math.round(concreteUtilised * 2.25); // tonnes of carbonated precast concrete
  const concreteEnergyPerTonne = 0.14; // MWh/t CO2
  const concreteEnergyReq = Math.round(concreteUtilised * concreteEnergyPerTonne);
  const concreteConversionCost = Math.round(32 + captureCost * 0.3);
  const concreteRevenuePerTonne = 88; // Revenue value derived from CO2 embedded in premium green concrete
  const concreteCarbonReduction = Math.round(concreteUtilised * 0.92);
  
  // Concrete compatibility score
  let concreteCompat = 88;
  if (purity >= 20) concreteCompat += 8;
  else concreteCompat -= (20 - purity) * 3;
  if (qty >= 300) concreteCompat += 4;
  concreteCompat = Math.min(98, Math.max(30, Math.round(concreteCompat)));

  // 2. Chemicals & Polymers (e-Methanol & Polyols)
  const chemPurityPenalty = purity < 90 ? (90 - purity) * 1.8 : 0;
  const chemScrubbingCost = purity < 90 ? (90 - purity) * 0.8 : 0;
  const chemUtilised = Math.round(qty * 0.88);
  const chemProductOutput = Math.round(chemUtilised * 0.73); // tonnes of pure e-Methanol
  const chemEnergyPerTonne = 1.65; // MWh/t CO2 (H2 synthesis + catalytic reactor)
  const chemEnergyReq = Math.round(chemUtilised * chemEnergyPerTonne);
  const chemConversionCost = Math.round(68 + captureCost * 0.4 + chemScrubbingCost);
  const chemRevenuePerTonne = 145; // $/t CO2 based on $600/t methanol value
  const chemCarbonReduction = Math.round(chemUtilised * 0.82);

  let chemCompat = 92 - chemPurityPenalty;
  if (energy < chemEnergyReq * 0.5) chemCompat -= 15;
  chemCompat = Math.min(97, Math.max(25, Math.round(chemCompat)));

  // 3. Synthetic Fuels & e-SAF (Sustainable Aviation Fuel)
  const fuelPurityPenalty = purity < 95 ? (95 - purity) * 2.1 : 0;
  const fuelScrubbingCost = purity < 95 ? (95 - purity) * 1.2 : 0;
  const fuelUtilised = Math.round(qty * 0.80);
  const fuelProductOutput = Math.round(fuelUtilised * 0.38); // tonnes of SAF / e-Kerosene
  const fuelEnergyPerTonne = 2.95; // MWh/t CO2 (Heavy electrolysis H2 coupling)
  const fuelEnergyReq = Math.round(fuelUtilised * fuelEnergyPerTonne);
  const fuelConversionCost = Math.round(110 + captureCost * 0.5 + fuelScrubbingCost);
  const fuelRevenuePerTonne = 210; // High value for aviation compliance credits
  const fuelCarbonReduction = Math.round(fuelUtilised * 0.89);

  let fuelCompat = 90 - fuelPurityPenalty;
  if (energy < fuelEnergyReq * 0.4) fuelCompat -= 20;
  fuelCompat = Math.min(96, Math.max(20, Math.round(fuelCompat)));

  // 4. Mineralisation / Aggregate Fillers
  const mineralUtilised = Math.round(qty * 0.98);
  const mineralProductOutput = Math.round(mineralUtilised * 2.15); // tonnes of synthetic limestone aggregate
  const mineralEnergyPerTonne = 0.22; // MWh/t CO2
  const mineralEnergyReq = Math.round(mineralUtilised * mineralEnergyPerTonne);
  const mineralConversionCost = Math.round(28 + captureCost * 0.25);
  const mineralRevenuePerTonne = 72; // $/t CO2
  const mineralCarbonReduction = Math.round(mineralUtilised * 0.96); // Permanent mineral trapping

  let mineralCompat = 92;
  if (purity >= 15) mineralCompat += 5;
  if (input.industryType === 'Steel' || input.industryType === 'Cement') mineralCompat += 3; // Slag/ash synergy
  mineralCompat = Math.min(99, Math.max(40, Math.round(mineralCompat)));

  // 5. Algae / Biological Utilisation
  const algaeUtilised = Math.round(Math.min(qty * 0.65, 600)); // constrained by land/bioreactor footprint
  const algaeProductOutput = Math.round(algaeUtilised * 0.42); // tonnes of dry spirulina/bio-protein
  const algaeEnergyPerTonne = 0.45; // MWh/t CO2
  const algaeEnergyReq = Math.round(algaeUtilised * algaeEnergyPerTonne);
  const algaeConversionCost = Math.round(44 + captureCost * 0.3);
  const algaeRevenuePerTonne = 82; // $/t CO2
  const algaeCarbonReduction = Math.round(algaeUtilised * 0.78);

  let algaeCompat = 84;
  if (purity <= 40) algaeCompat += 8; // loves flue gas without burning
  if (qty > 1000) algaeCompat -= 10; // footprint constraint for mega quantities
  algaeCompat = Math.min(94, Math.max(35, Math.round(algaeCompat)));

  return [
    {
      id: 'pathway-concrete',
      name: 'CO₂ → Concrete & Construction Materials',
      technologyName: 'Accelerated Mineral Carbonation & CO₂ Concrete Curing',
      category: 'Construction Materials',
      minPurityRequired: 20.0,
      compatibilityScore: concreteCompat,
      co2Utilised: concreteUtilised,
      productOutput: {
        name: 'Carbon-Cured Precast Slabs & Masonry',
        amount: concreteProductOutput,
        unit: 'tonnes/day',
        marketPricePerUnit: 110
      },
      energyRequirement: concreteEnergyReq,
      energyPerTonne: concreteEnergyPerTonne,
      conversionCostPerTonne: concreteConversionCost,
      totalConversionCost: concreteUtilised * concreteConversionCost,
      potentialRevenuePerTonne: concreteRevenuePerTonne,
      totalRevenue: concreteUtilised * concreteRevenuePerTonne,
      carbonReduction: concreteCarbonReduction,
      netEmissionsBalance: concreteCarbonReduction - Math.round(concreteEnergyReq * 0.15),
      trlLevel: 9,
      description: 'Injects captured CO₂ into concrete mixing and autoclaves, permanently locking CO₂ into solid CaCO₃ minerals while increasing compressive strength by 15-25%.',
      environmentalBenefit: 'Permanent mineral trapping for 1000+ years with zero risk of re-emission.',
      marketOutlook: 'Rapid Expansion',
      purityMatchStatus: purity >= 20 ? 'Optimal' : 'Requires Pre-Scrubbing'
    },
    {
      id: 'pathway-chemicals',
      name: 'CO₂ → Chemicals & Polymers',
      technologyName: 'Catalytic Hydrogenation to e-Methanol & Polyols',
      category: 'Chemicals & Polymers',
      minPurityRequired: 90.0,
      compatibilityScore: chemCompat,
      co2Utilised: chemUtilised,
      productOutput: {
        name: 'High-Purity Green e-Methanol',
        amount: chemProductOutput,
        unit: 'tonnes/day',
        marketPricePerUnit: 580
      },
      energyRequirement: chemEnergyReq,
      energyPerTonne: chemEnergyPerTonne,
      conversionCostPerTonne: chemConversionCost,
      totalConversionCost: chemUtilised * chemConversionCost,
      potentialRevenuePerTonne: chemRevenuePerTonne,
      totalRevenue: chemUtilised * chemRevenuePerTonne,
      carbonReduction: chemCarbonReduction,
      netEmissionsBalance: chemCarbonReduction - Math.round(chemEnergyReq * 0.2),
      trlLevel: 8,
      description: 'Thermocatalytic conversion of CO₂ with green hydrogen over Cu/ZnO/Al₂O₃ catalysts to yield industrial e-methanol, formic acid, and polyurethane precursors.',
      environmentalBenefit: 'Displaces fossil-fuel petrochemical feedstocks directly in industrial value chains.',
      marketOutlook: 'High Demand',
      purityMatchStatus: purity >= 90 ? 'Optimal' : purity >= 50 ? 'Requires Pre-Scrubbing' : 'Marginal'
    },
    {
      id: 'pathway-synfuels',
      name: 'CO₂ → Synthetic Fuels & e-SAF',
      technologyName: 'Power-to-Liquids (PtL) & Fischer-Tropsch e-Kerosene',
      category: 'Synthetic Fuels',
      minPurityRequired: 95.0,
      compatibilityScore: fuelCompat,
      co2Utilised: fuelUtilised,
      productOutput: {
        name: 'Sustainable Aviation Fuel (e-SAF)',
        amount: fuelProductOutput,
        unit: 'tonnes/day',
        marketPricePerUnit: 1420
      },
      energyRequirement: fuelEnergyReq,
      energyPerTonne: fuelEnergyPerTonne,
      conversionCostPerTonne: fuelConversionCost,
      totalConversionCost: fuelUtilised * fuelConversionCost,
      potentialRevenuePerTonne: fuelRevenuePerTonne,
      totalRevenue: fuelUtilised * fuelRevenuePerTonne,
      carbonReduction: fuelCarbonReduction,
      netEmissionsBalance: fuelCarbonReduction - Math.round(fuelEnergyReq * 0.25),
      trlLevel: 7,
      description: 'Reverse water-gas shift (rWGS) paired with Fischer-Tropsch synthesis to produce drop-in aviation e-kerosene and synthetic hydrocarbons for aviation and marine transport.',
      environmentalBenefit: 'Up to 90% lifecycle greenhouse gas reduction compared to conventional fossil jet fuel.',
      marketOutlook: 'Regulated Compliance Demand',
      purityMatchStatus: purity >= 95 ? 'Optimal' : purity >= 60 ? 'Requires Pre-Scrubbing' : 'Incompatible'
    },
    {
      id: 'pathway-mineralisation',
      name: 'CO₂ → Mineralisation & Aggregate Fillers',
      technologyName: 'Ex-situ Aqueous Direct Carbonation of Industrial Slags & Minerals',
      category: 'Mineralisation',
      minPurityRequired: 15.0,
      compatibilityScore: mineralCompat,
      co2Utilised: mineralUtilised,
      productOutput: {
        name: 'Carbonated Synthetic Eco-Aggregates',
        amount: mineralProductOutput,
        unit: 'tonnes/day',
        marketPricePerUnit: 48
      },
      energyRequirement: mineralEnergyReq,
      energyPerTonne: mineralEnergyPerTonne,
      conversionCostPerTonne: mineralConversionCost,
      totalConversionCost: mineralUtilised * mineralConversionCost,
      potentialRevenuePerTonne: mineralRevenuePerTonne,
      totalRevenue: mineralUtilised * mineralRevenuePerTonne,
      carbonReduction: mineralCarbonReduction,
      netEmissionsBalance: mineralCarbonReduction - Math.round(mineralEnergyReq * 0.1),
      trlLevel: 9,
      description: 'Reacts CO₂ with steel slag, fly ash, or magnesium silicates in an aqueous reactor, precipitating solid stable carbonates used as virgin quarry aggregate substitutes.',
      environmentalBenefit: 'Thermodynamically irreversible chemical trapping with zero energy for storage maintenance.',
      marketOutlook: 'Rapid Expansion',
      purityMatchStatus: purity >= 15 ? 'Optimal' : 'Requires Pre-Scrubbing'
    },
    {
      id: 'pathway-algae',
      name: 'CO₂ → Algae & Biological Utilisation',
      technologyName: 'Closed Photobioreactor (PBR) Microalgae Cultivation',
      category: 'Biological / Algae',
      minPurityRequired: 10.0,
      compatibilityScore: algaeCompat,
      co2Utilised: algaeUtilised,
      productOutput: {
        name: 'High-Protein Bio-Biomass & Nutrients',
        amount: algaeProductOutput,
        unit: 'tonnes/day',
        marketPricePerUnit: 340
      },
      energyRequirement: algaeEnergyReq,
      energyPerTonne: algaeEnergyPerTonne,
      conversionCostPerTonne: algaeConversionCost,
      totalConversionCost: algaeUtilised * algaeConversionCost,
      potentialRevenuePerTonne: algaeRevenuePerTonne,
      totalRevenue: algaeUtilised * algaeRevenuePerTonne,
      carbonReduction: algaeCarbonReduction,
      netEmissionsBalance: algaeCarbonReduction - Math.round(algaeEnergyReq * 0.12),
      trlLevel: 8,
      description: 'Direct sparging of raw or semi-conditioned CO₂ into photosynthetic microalgae photobioreactors, converting carbon into high-value protein feed, lipids, and bio-fertilizers.',
      environmentalBenefit: 'Replaces carbon-intensive soy/fishmeal feed and produces circular organic bio-stimulants.',
      marketOutlook: 'Emerging Market',
      purityMatchStatus: 'Optimal'
    }
  ];
}

/**
 * Matches potential buyers from the database based on source location and CO2 specifications
 */
export function matchBuyers(
  input: IndustryInput,
  rawBuyers: RawBuyerData[] = RAW_BUYERS_DATABASE
): Buyer[] {
  const sourceLat = input.location.lat;
  const sourceLng = input.location.lng;
  const sourcePurity = input.co2Purity;
  const sourceQty = input.co2Quantity;

  const evaluatedBuyers: Buyer[] = rawBuyers.map((b) => {
    const distance = calculateHaversineDistance(
      sourceLat,
      sourceLng,
      b.location.lat,
      b.location.lng
    );

    // Dynamic distance factor (100 if < 30km, decays smoothly)
    const distanceScore = Math.max(10, 100 - (distance / 35));

    // Purity match factor
    let purityScore = 100;
    if (sourcePurity < b.requiredPurity) {
      const diff = b.requiredPurity - sourcePurity;
      purityScore = Math.max(20, 100 - diff * 2.2);
    }

    // Scale / Quantity match factor
    const qtyRatio = Math.min(sourceQty, b.co2Requirement) / Math.max(sourceQty, b.co2Requirement);
    const scaleScore = 60 + qtyRatio * 40;

    // Price attraction
    const priceScore = (b.offTakePricePerTonne / 90) * 100;

    // Overall compatibility score
    const totalScore = Math.min(
      99,
      Math.max(
        25,
        Math.round(
          distanceScore * 0.35 +
          purityScore * 0.30 +
          scaleScore * 0.20 +
          priceScore * 0.15
        )
      )
    );

    // Logistics determination
    let logisticsMode: Buyer['logisticsMode'] = b.logisticsMode;
    if (distance < 60 && sourceQty >= 800) {
      logisticsMode = 'CO2 Pipeline';
    } else if (distance < 250) {
      logisticsMode = 'Cryogenic Truck';
    } else if (distance < 800) {
      logisticsMode = 'Rail Tanker';
    } else {
      logisticsMode = 'Barge / Coastal Vessel';
    }

    const matchReasons: string[] = [];
    if (distance < 100) matchReasons.push(`Hyper-local proximity (${distance} km) reduces transport emissions`);
    if (sourcePurity >= b.requiredPurity) matchReasons.push(`Direct purity compliance (${sourcePurity}% >= ${b.requiredPurity}%)`);
    else matchReasons.push(`Minor pre-scrubbing required for ${b.requiredPurity}% target purity`);
    if (b.offTakePricePerTonne >= 65) matchReasons.push(`Premium off-take value ($${b.offTakePricePerTonne}/t CO₂)`);
    if (Math.abs(sourceQty - b.co2Requirement) < 300) matchReasons.push('Optimal volume symmetry with plant capacity');

    return {
      id: b.id,
      name: b.name,
      industryType: b.industryType,
      location: {
        name: b.location.name,
        lat: b.location.lat,
        lng: b.location.lng,
        region: b.location.region,
        country: b.location.country
      },
      co2Requirement: b.co2Requirement,
      requiredPurity: b.requiredPurity,
      distance,
      estimatedAnnualDemand: b.estimatedAnnualDemand,
      offTakePricePerTonne: b.offTakePricePerTonne,
      compatibilityScore: totalScore,
      logisticsMode,
      targetProducts: b.targetProducts,
      readinessStatus: b.readinessStatus,
      matchReasons
    };
  });

  // Sort by compatibility score descending
  return evaluatedBuyers.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

/**
 * Performs Multi-Objective Optimisation across suitable utilisation options
 */
export function runMultiObjectiveOptimisation(
  pathways: UtilisationPathway[],
  topBuyer: Buyer,
  weights: OptimizationWeights
): OptimizedPathway[] {
  if (pathways.length === 0) return [];

  // Find min and max for normalization
  const maxUtil = Math.max(...pathways.map((p) => p.co2Utilised), 1);
  const maxCarbon = Math.max(...pathways.map((p) => p.carbonReduction), 1);
  const maxRevenue = Math.max(...pathways.map((p) => p.totalRevenue), 1);
  const minCostVal = Math.min(...pathways.map((p) => p.conversionCostPerTonne), 10);
  const maxCostVal = Math.max(...pathways.map((p) => p.conversionCostPerTonne), 100);
  const minEnergyVal = Math.min(...pathways.map((p) => p.energyRequirement), 10);
  const maxEnergyVal = Math.max(...pathways.map((p) => p.energyRequirement), 1000);

  // Logistics transport cost per tonne: ~$0.08 per km per tonne for cryogenic truck, $0.03 for pipeline
  const transportCostPerTonne = Math.round(
    topBuyer.logisticsMode === 'CO2 Pipeline'
      ? 4 + topBuyer.distance * 0.03
      : 8 + topBuyer.distance * 0.075
  );

  const totalWeight =
    weights.co2Utilisation +
    weights.carbonReduction +
    weights.revenue +
    weights.minCost +
    weights.minDistance +
    weights.minEnergy || 1;

  const optimized: OptimizedPathway[] = pathways.map((p) => {
    // 1. CO2 utilisation normalized (0-100)
    const utilScore = (p.co2Utilised / maxUtil) * 100;

    // 2. Carbon reduction normalized (0-100)
    const carbonScore = (p.carbonReduction / maxCarbon) * 100;

    // 3. Revenue normalized (0-100)
    const revenueScore = (p.totalRevenue / maxRevenue) * 100;

    // 4. Cost score (inverted: lower cost = higher score)
    const costScore = 100 - ((p.conversionCostPerTonne - minCostVal) / (maxCostVal - minCostVal || 1)) * 100;

    // 5. Distance score (based on top matched buyer)
    const distanceScore = Math.max(10, 100 - (topBuyer.distance / 25));

    // 6. Energy score (inverted: lower energy = higher score)
    const energyScore = 100 - ((p.energyRequirement - minEnergyVal) / (maxEnergyVal - minEnergyVal || 1)) * 100;

    // Weighted Overall Score (0-100)
    const overallScore = Math.round(
      (utilScore * weights.co2Utilisation +
        carbonScore * weights.carbonReduction +
        revenueScore * weights.revenue +
        costScore * weights.minCost +
        distanceScore * weights.minDistance +
        energyScore * weights.minEnergy) /
        totalWeight
    );

    const totalCostPerTonne = p.conversionCostPerTonne + transportCostPerTonne;

    return {
      ...p,
      distanceKm: topBuyer.distance,
      transportCostPerTonne,
      totalCostPerTonne,
      overallScore: Math.min(99, Math.max(30, overallScore)),
      rank: 1, // updated after sorting
      scores: {
        utilScore: Math.round(utilScore),
        carbonScore: Math.round(carbonScore),
        revenueScore: Math.round(revenueScore),
        costScore: Math.round(costScore),
        distanceScore: Math.round(distanceScore),
        energyScore: Math.round(energyScore)
      }
    };
  });

  // Sort descending by overall score
  optimized.sort((a, b) => b.overallScore - a.overallScore);

  // Assign ranks
  optimized.forEach((p, idx) => {
    p.rank = idx + 1;
  });

  return optimized;
}

/**
 * Builds the comprehensive Best Recommendation Strategy Dossier
 */
export function buildRecommendationStrategy(
  input: IndustryInput,
  characterisation: CO2Characterisation,
  bestPathway: OptimizedPathway,
  bestBuyer: Buyer
): RecommendationStrategy {
  const co2Utilised = bestPathway.co2Utilised;
  const conversionCostPerDay = bestPathway.totalConversionCost;
  const transportCostPerDay = co2Utilised * bestPathway.transportCostPerTonne;
  const totalCostPerDay = conversionCostPerDay + transportCostPerDay;
  
  // Off-take payment from buyer + product market value
  const buyerRevenuePerDay = co2Utilised * bestBuyer.offTakePricePerTonne;
  const totalRevenuePerDay = bestPathway.totalRevenue + buyerRevenuePerDay * 0.35;
  const netProfitPerDay = totalRevenuePerDay - totalCostPerDay;
  const annualNetBenefit = netProfitPerDay * 350; // 350 operating days/year

  const roiPercentage = Math.round((netProfitPerDay / (totalCostPerDay || 1)) * 100);
  const carbonCreditValuePerDay = Math.round(bestPathway.carbonReduction * 45); // $45/t compliance carbon credit

  const annualCO2Utilised = Math.round(co2Utilised * 350);
  const carbonReductionPerDay = bestPathway.carbonReduction;
  const annualCarbonReduction = Math.round(carbonReductionPerDay * 350);
  const utilisationEfficiencyPercent = Math.round((co2Utilised / input.co2Quantity) * 100);

  // Equivalencies (1 mature tree absorbs ~22kg CO2/year; 1 passenger vehicle emits ~4.6 tonnes CO2/year)
  const equivalentTreesPlanted = Math.round((annualCarbonReduction * 1000) / 22);
  const carsOffRoadAnnually = Math.round(annualCarbonReduction / 4.6);

  // Logistics
  const pipelineFeasible = bestBuyer.distance <= 80 && input.co2Quantity >= 750;
  const trucksPerDay = Math.ceil(co2Utilised / 24); // 24 tonnes per standard cryogenic semi-trailer

  // AI Narrative Explanation Generation
  const aiNarrativeExplanation = `The AI recommends ${bestPathway.name} coupled with ${bestBuyer.name} because it achieves an optimal Pareto feasibility index of ${bestPathway.overallScore}/100. Given the source stream's ${input.co2Purity}% CO₂ concentration and ${input.co2Quantity.toLocaleString()} tonnes/day output at ${input.location.name}, this strategy captures ${utilisationEfficiencyPercent}% of total emissions while keeping energy intensity at ${bestPathway.energyPerTonne} MWh/t CO₂. With ${bestBuyer.name} situated just ${bestBuyer.distance} km away via ${bestBuyer.logisticsMode}, transport overhead is curtailed to $${bestPathway.transportCostPerTonne}/t, generating an expected daily gross return of $${Math.round(totalRevenuePerDay).toLocaleString()} against an operating cost of $${Math.round(totalCostPerDay).toLocaleString()} (Net margin: +$${Math.round(netProfitPerDay).toLocaleString()}/day; ${annualCarbonReduction.toLocaleString()} tonnes CO₂e abated annually).`;

  return {
    source: input,
    characterisation,
    recommendedPathway: bestPathway,
    recommendedBuyer: bestBuyer,
    economicImpact: {
      conversionCostPerDay,
      transportCostPerDay,
      totalCostPerDay,
      revenuePerDay: Math.round(totalRevenuePerDay),
      netProfitPerDay: Math.round(netProfitPerDay),
      annualNetBenefit: Math.round(annualNetBenefit),
      roiPercentage,
      carbonCreditValuePerDay
    },
    environmentalImpact: {
      co2UtilisedPerDay: co2Utilised,
      annualCO2Utilised,
      carbonReductionPerDay,
      annualCarbonReduction,
      utilisationEfficiencyPercent,
      equivalentTreesPlanted,
      carsOffRoadAnnually
    },
    logisticsSummary: {
      distanceKm: bestBuyer.distance,
      transportMode: bestBuyer.logisticsMode,
      transportCostPerTonne: bestPathway.transportCostPerTonne,
      pipelineFeasible,
      estimatedTrucksPerDay: trucksPerDay
    },
    aiNarrativeExplanation,
    timestamp: new Date().toISOString()
  };
}
