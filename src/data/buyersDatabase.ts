import { Buyer } from '../types/carbon';

export interface RawBuyerData {
  id: string;
  name: string;
  industryType: string;
  location: {
    name: string;
    lat: number;
    lng: number;
    address: string;
    region: string;
    country: string;
  };
  co2Requirement: number; // tonnes/day
  requiredPurity: number; // min %
  estimatedAnnualDemand: number; // tonnes/year
  offTakePricePerTonne: number; // $/tonne CO2 purchase price
  logisticsMode: 'Cryogenic Truck' | 'CO2 Pipeline' | 'Rail Tanker' | 'Barge / Coastal Vessel';
  targetProducts: string[];
  readinessStatus: 'Ready for Immediate Off-take' | 'Planned Expansion (Q3)' | 'Pilot Integration';
  preferredPathwayCategories: string[];
}

export const RAW_BUYERS_DATABASE: RawBuyerData[] = [
  // North America / Gulf Coast / Houston Hub
  {
    id: 'buyer-cemex-houston',
    name: 'Cemex Baytown EcoCure Concrete Works',
    industryType: 'Precast Concrete & Curing',
    location: {
      name: 'Baytown CCU Concrete Facility',
      lat: 29.7355,
      lng: -94.9774,
      address: 'Industrial Pkwy, Baytown, TX 77520',
      region: 'Gulf Coast, TX',
      country: 'United States'
    },
    co2Requirement: 450,
    requiredPurity: 20.0,
    estimatedAnnualDemand: 160000,
    offTakePricePerTonne: 42,
    logisticsMode: 'Cryogenic Truck',
    targetProducts: ['Carbon-Cured Precast Slabs', 'Low-Carbon Masonry Blocks'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Construction Materials', 'Mineralisation']
  },
  {
    id: 'buyer-celanese-clearlake',
    name: 'Celanese Clear Lake Green Methanol Hub',
    industryType: 'Chemicals & Polymers',
    location: {
      name: 'Clear Lake Chemical Complex',
      lat: 29.5855,
      lng: -95.0933,
      address: 'Bayport Industrial District, Pasadena, TX 77507',
      region: 'Gulf Coast, TX',
      country: 'United States'
    },
    co2Requirement: 1100,
    requiredPurity: 92.0,
    estimatedAnnualDemand: 400000,
    offTakePricePerTonne: 68,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['e-Methanol', 'Acetic Acid', 'Formaldehyde Precursors'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Chemicals & Polymers', 'Synthetic Fuels']
  },
  {
    id: 'buyer-infinium-texas',
    name: 'Infinium Electrofuels SAF Production Plant',
    industryType: 'Synthetic Fuels & SAF',
    location: {
      name: 'Corpus Christi Electrofuels Terminal',
      lat: 27.8006,
      lng: -97.3964,
      address: 'Port Corpus Christi CCU Terminal, TX 78401',
      region: 'Gulf Coast, TX',
      country: 'United States'
    },
    co2Requirement: 950,
    requiredPurity: 95.0,
    estimatedAnnualDemand: 340000,
    offTakePricePerTonne: 78,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['e-SAF Aviation Kerosene', 'e-Diesel', 'Clean Naphtha'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Synthetic Fuels', 'Chemicals & Polymers']
  },
  {
    id: 'buyer-carbicrete- Beaumont',
    name: 'CarbiCrete / Ozinga Carbon Mineral Aggregate',
    industryType: 'Mineralisation & Aggregates',
    location: {
      name: 'Beaumont Carbon Aggregates Facility',
      lat: 30.0802,
      lng: -94.1266,
      address: 'Neches River Industrial Corridor, Beaumont, TX 77701',
      region: 'Gulf Coast, TX',
      country: 'United States'
    },
    co2Requirement: 600,
    requiredPurity: 15.0,
    estimatedAnnualDemand: 215000,
    offTakePricePerTonne: 38,
    logisticsMode: 'Rail Tanker',
    targetProducts: ['Carbonated Lightweight Aggregate', 'Cement Replacement SCM'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Mineralisation', 'Construction Materials']
  },
  {
    id: 'buyer-algaetech-texas',
    name: 'Helios Carbon Bio-Proteins & Algae Farm',
    industryType: 'Biological / Algae Bio-Refining',
    location: {
      name: 'Brazoria Photobioreactor Park',
      lat: 29.0436,
      lng: -95.4338,
      address: 'Brazoria Agri-Industrial Hub, TX 77422',
      region: 'Gulf Coast, TX',
      country: 'United States'
    },
    co2Requirement: 280,
    requiredPurity: 12.0,
    estimatedAnnualDemand: 98000,
    offTakePricePerTonne: 32,
    logisticsMode: 'Cryogenic Truck',
    targetProducts: ['High-Protein Animal Feed', 'Bio-Stimulant Fertilizers', 'Spirulina'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Biological / Algae']
  },
  {
    id: 'buyer-covestro-baytown',
    name: 'Covestro Baytown Polyol & Polymer Center',
    industryType: 'Specialty Polymers & Polyurethanes',
    location: {
      name: 'Covestro Industrial Campus',
      lat: 29.7420,
      lng: -94.9450,
      address: 'Cedar Bayou Plant, Baytown, TX 77520',
      region: 'Gulf Coast, TX',
      country: 'United States'
    },
    co2Requirement: 520,
    requiredPurity: 98.0,
    estimatedAnnualDemand: 185000,
    offTakePricePerTonne: 72,
    logisticsMode: 'Cryogenic Truck',
    targetProducts: ['cardyon® CO2-Based Polyols', 'Thermoplastic Polyurethanes'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Chemicals & Polymers']
  },

  // Europe / Rotterdam / Ruhr / Antwerp Hub
  {
    id: 'buyer-orsted-rotterdam',
    name: 'Porthos & Shell Green Hydrogen/Methanol Plant',
    industryType: 'Synthetic Fuels & SAF',
    location: {
      name: 'Port of Rotterdam Maasvlakte II',
      lat: 51.9540,
      lng: 4.0500,
      address: 'Europaweg 900, 3199 LD Maasvlakte, Netherlands',
      region: 'South Holland',
      country: 'Netherlands'
    },
    co2Requirement: 1400,
    requiredPurity: 95.0,
    estimatedAnnualDemand: 500000,
    offTakePricePerTonne: 82,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['Synthetic Aviation Fuel', 'Marine e-Methanol'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Synthetic Fuels', 'Chemicals & Polymers']
  },
  {
    id: 'buyer-heidelberg-enox',
    name: 'Heidelberg Materials EnOxe Mineral Curing Plant',
    industryType: 'Precast Concrete & Curing',
    location: {
      name: 'Duisburg Rhine Carbon Curing Works',
      lat: 51.4344,
      lng: 6.7623,
      address: 'Rheinhafen Duisburg, 47051 Duisburg, Germany',
      region: 'North Rhine-Westphalia',
      country: 'Germany'
    },
    co2Requirement: 800,
    requiredPurity: 22.0,
    estimatedAnnualDemand: 290000,
    offTakePricePerTonne: 46,
    logisticsMode: 'Barge / Coastal Vessel',
    targetProducts: ['evoBuild Low-Carbon Concrete', 'Mineral Carbonated Slabs'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Construction Materials', 'Mineralisation']
  },
  {
    id: 'buyer-basf-ludwigshafen',
    name: 'BASF Verbund CCU Chemical Intermediate Synthesizer',
    industryType: 'Chemicals & Polymers',
    location: {
      name: 'BASF Ludwigshafen Verbund Site',
      lat: 49.4975,
      lng: 8.4312,
      address: 'Carl-Bosch-Straße 38, 67056 Ludwigshafen, Germany',
      region: 'Rhineland-Palatinate',
      country: 'Germany'
    },
    co2Requirement: 1200,
    requiredPurity: 97.0,
    estimatedAnnualDemand: 430000,
    offTakePricePerTonne: 75,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['Formic Acid', 'Sodium Bicarbonate', 'Ethylene Carbonate'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Chemicals & Polymers']
  },
  {
    id: 'buyer-carbfix-northsea',
    name: 'Neustark / Holcim Mineralisation Aggregates Terminal',
    industryType: 'Mineralisation & Aggregates',
    location: {
      name: 'Antwerp Linkeroever Mineral Carbonation Site',
      lat: 51.2780,
      lng: 4.3100,
      address: 'Haven van Antwerpen 1020, 2030 Antwerp, Belgium',
      region: 'Flemish Region',
      country: 'Belgium'
    },
    co2Requirement: 750,
    requiredPurity: 18.0,
    estimatedAnnualDemand: 270000,
    offTakePricePerTonne: 44,
    logisticsMode: 'Barge / Coastal Vessel',
    targetProducts: ['Permanently Mineralized Demolition Concrete Aggregate'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Mineralisation', 'Construction Materials']
  },
  {
    id: 'buyer-agrifarm-westland',
    name: 'Westland Hyper-Greenhouse Agrivoltaic Complex',
    industryType: 'Biological & Agri Enrichment',
    location: {
      name: 'Westland Agri-CCU Hub',
      lat: 51.9950,
      lng: 4.2250,
      address: 'Middel Broekweg 29, 2675 KB Honselersdijk, Netherlands',
      region: 'South Holland',
      country: 'Netherlands'
    },
    co2Requirement: 320,
    requiredPurity: 99.0,
    estimatedAnnualDemand: 110000,
    offTakePricePerTonne: 55,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['High-Yield Greenhouse Tomatoes & Peppers', 'Micro-Algae Cultures'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Biological / Algae']
  },

  // Asia / India / Singapore / Middle East Hubs
  {
    id: 'buyer-ultratech-india',
    name: 'UltraTech Cement Jharkhand CCU Curing Hub',
    industryType: 'Precast Concrete & Curing',
    location: {
      name: 'Adityapur Industrial Area',
      lat: 22.7833,
      lng: 86.1667,
      address: 'Phase IV Adityapur, Saraikela Kharsawan, Jharkhand 832109',
      region: 'Jharkhand',
      country: 'India'
    },
    co2Requirement: 900,
    requiredPurity: 22.0,
    estimatedAnnualDemand: 320000,
    offTakePricePerTonne: 35,
    logisticsMode: 'Cryogenic Truck',
    targetProducts: ['UltraTech SuperCure Pavers', 'Carbonated Fly Ash Bricks'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Construction Materials', 'Mineralisation']
  },
  {
    id: 'buyer-larsen-toubro',
    name: 'L&T Heavy Engineering Slag Carbonation Facility',
    industryType: 'Mineralisation & Aggregates',
    location: {
      name: 'Kalinganagar Industrial Complex',
      lat: 20.9500,
      lng: 85.8000,
      address: 'Steel Cluster Zone, Jajpur, Odisha 755026',
      region: 'Odisha',
      country: 'India'
    },
    co2Requirement: 1500,
    requiredPurity: 25.0,
    estimatedAnnualDemand: 540000,
    offTakePricePerTonne: 30,
    logisticsMode: 'Rail Tanker',
    targetProducts: ['Carbonated Steel Slag Aggregates', 'Road Base Ballast'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Mineralisation', 'Construction Materials']
  },
  {
    id: 'buyer-reliance-chemicals',
    name: 'Reliance Clean Carbon & SAF SynGas Facility',
    industryType: 'Synthetic Fuels & SAF',
    location: {
      name: 'Jamnagar CCUS Refining Cluster',
      lat: 22.4707,
      lng: 70.0577,
      address: 'Motikhavdi, Jamnagar, Gujarat 361140',
      region: 'Gujarat',
      country: 'India'
    },
    co2Requirement: 2200,
    requiredPurity: 95.0,
    estimatedAnnualDemand: 800000,
    offTakePricePerTonne: 62,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['Green e-Methanol', 'Sustainable Aviation Fuel'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Synthetic Fuels', 'Chemicals & Polymers']
  },
  {
    id: 'buyer-sabic-jubail',
    name: 'SABIC United CCU 2.0 Mega-Methanol Complex',
    industryType: 'Chemicals & Polymers',
    location: {
      name: 'Jubail CCU Synthesis Cluster',
      lat: 27.0200,
      lng: 49.6100,
      address: 'Road 114, Industrial Area 1, Jubail 31951, Saudi Arabia',
      region: 'Eastern Province',
      country: 'Saudi Arabia'
    },
    co2Requirement: 2500,
    requiredPurity: 96.0,
    estimatedAnnualDemand: 900000,
    offTakePricePerTonne: 70,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['Purified Urea / Fertilizers', 'Chemical Grade Methanol'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Chemicals & Polymers', 'Synthetic Fuels']
  },
  {
    id: 'buyer-jurong-synfuel',
    name: 'Jurong Island Sustainable Hydrocarbons Facility',
    industryType: 'Synthetic Fuels & SAF',
    location: {
      name: 'Jurong Island Clean Fuels Berth',
      lat: 1.2720,
      lng: 103.6850,
      address: 'Banyan Drive, Jurong Island, Singapore 627888',
      region: 'South-West',
      country: 'Singapore'
    },
    co2Requirement: 850,
    requiredPurity: 98.0,
    estimatedAnnualDemand: 300000,
    offTakePricePerTonne: 85,
    logisticsMode: 'CO2 Pipeline',
    targetProducts: ['e-Kerosene Aviation Fuel', 'Clean Marine Bio-Bunkering'],
    readinessStatus: 'Ready for Immediate Off-take',
    preferredPathwayCategories: ['Synthetic Fuels', 'Chemicals & Polymers']
  }
];
