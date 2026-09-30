import { IndustryPreset, LocationInfo } from '../types/carbon';

export const INDUSTRIAL_LOCATIONS: LocationInfo[] = [
  { name: 'Houston Industrial Ship Channel', lat: 29.7604, lng: -95.3698, region: 'Gulf Coast, TX', country: 'United States' },
  { name: 'Rotterdam Maasvlakte CCUS Cluster', lat: 51.9244, lng: 4.4777, region: 'South Holland', country: 'Netherlands' },
  { name: 'Jamshedpur Heavy Industrial Belt', lat: 22.8046, lng: 86.2029, region: 'Jharkhand', country: 'India' },
  { name: 'Ruhr Valley Industrial Basin', lat: 51.4556, lng: 7.0116, region: 'North Rhine-Westphalia', country: 'Germany' },
  { name: 'Jurong Island Petrochemical Hub', lat: 1.2667, lng: 103.7000, region: 'South-West', country: 'Singapore' },
  { name: 'Jubail Industrial City', lat: 27.0046, lng: 49.6592, region: 'Eastern Province', country: 'Saudi Arabia' },
  { name: 'Edmonton Carbon Trunkline Hub', lat: 53.5461, lng: -113.4938, region: 'Alberta', country: 'Canada' },
  { name: 'Antwerp Port Chemical Cluster', lat: 51.2194, lng: 4.4025, region: 'Flemish Region', country: 'Belgium' },
  { name: 'Shanghai Baoshan Industrial Zone', lat: 31.4053, lng: 121.4894, region: 'Shanghai', country: 'China' },
  { name: 'Teesside Clean Carbon Industrial Zone', lat: 54.5742, lng: -1.2350, region: 'North East England', country: 'United Kingdom' }
];

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: 'cement-heidelberg',
    name: 'Holcim / Heidelberg Kiln #4 Complex',
    industryType: 'Cement',
    description: 'High-volume limestone calcination plant producing cement clinker. Point source with moderate CO₂ concentration (24%) and steady flue gas flow.',
    data: {
      industryName: 'Holcim EcoCem Plant #4',
      industryType: 'Cement',
      co2Quantity: 1250, // tonnes/day
      co2Purity: 26.5, // %
      emissionRate: 680, // kg CO2 / tonne cement
      location: INDUSTRIAL_LOCATIONS[0], // Houston
      availableEnergy: 180, // MWh/day
      operatingCost: 38, // $/tonne capture
      moistureContent: 6.2,
      flueGasPressure: 1.15
    }
  },
  {
    id: 'steel-tata',
    name: 'Tata Steel Blast Furnace Unit 3',
    industryType: 'Steel',
    description: 'Integrated blast furnace steel mill with carbon monoxide & carbon dioxide rich off-gases, ideal for mineralisation and chemical syntheses.',
    data: {
      industryName: 'Tata Steel BF Complex #3',
      industryType: 'Steel',
      co2Quantity: 2800, // tonnes/day
      co2Purity: 32.0, // %
      emissionRate: 1850, // kg CO2 / tonne crude steel
      location: INDUSTRIAL_LOCATIONS[2], // Jamshedpur
      availableEnergy: 420, // MWh/day
      operatingCost: 45, // $/tonne capture
      moistureContent: 4.8,
      flueGasPressure: 1.8
    }
  },
  {
    id: 'power-combined-cycle',
    name: 'Duke Energy Combined Cycle Natural Gas',
    industryType: 'Power Plant',
    description: 'Large natural gas turbine facility providing baseload & peaker electricity. Low CO₂ concentration (8.5-12%) requiring amine scrubbing.',
    data: {
      industryName: 'Apex Combined Cycle CCGT Unit 2',
      industryType: 'Power Plant',
      co2Quantity: 1950, // tonnes/day
      co2Purity: 11.5, // %
      emissionRate: 375, // kg CO2 / MWh
      location: INDUSTRIAL_LOCATIONS[0], // Houston
      availableEnergy: 350, // MWh/day
      operatingCost: 52, // $/tonne capture
      moistureContent: 9.5,
      flueGasPressure: 1.05
    }
  },
  {
    id: 'chem-basf',
    name: 'BASF Steam Cracker & Ammonia Unit',
    industryType: 'Chemical',
    description: 'Petrochemical cracking unit with concentrated syngas shift effluent yielding ultra-high purity CO₂ stream (>96%), ideal for methanol & SAF synthesis.',
    data: {
      industryName: 'BASF Syngas & Olefins Facility',
      industryType: 'Chemical',
      co2Quantity: 850, // tonnes/day
      co2Purity: 97.5, // %
      emissionRate: 420, // kg CO2 / tonne chemical
      location: INDUSTRIAL_LOCATIONS[3], // Ruhr Valley
      availableEnergy: 210, // MWh/day
      operatingCost: 22, // $/tonne capture (already concentrated)
      moistureContent: 1.2,
      flueGasPressure: 22.0
    }
  },
  {
    id: 'refinery-valero',
    name: 'Gulf Coast Hydrotreater & FCC Refinery',
    industryType: 'Refinery',
    description: 'Fluid catalytic cracker and hydrogen production unit generating medium-high concentration CO₂ streams (68%) with existing compression infrastructure.',
    data: {
      industryName: 'Valero Coastal Refinery FCC-2',
      industryType: 'Refinery',
      co2Quantity: 1600, // tonnes/day
      co2Purity: 68.0, // %
      emissionRate: 1100, // kg CO2 / thousand bbl
      location: INDUSTRIAL_LOCATIONS[0], // Houston
      availableEnergy: 290, // MWh/day
      operatingCost: 34, // $/tonne capture
      moistureContent: 3.5,
      flueGasPressure: 3.2
    }
  }
];
