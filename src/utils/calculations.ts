import { EMISSION_FACTORS } from '../constants/emissionFactors';

export interface UserInputs {
  carType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'none';
  carDistance: number;
  busDistance: number;
  trainDistance: number;
  metroDistance: number;
  shortFlights: number;
  mediumFlights: number;
  longFlights: number;
  electricityUsage: number;
  cookingFuel: 'lpg' | 'electricity' | 'biomass';
  dietType: 'vegan' | 'vegetarian' | 'mixed' | 'heavyMeat';
  shoppingHabits: 'low' | 'moderate' | 'high';
  recycling: 'yes' | 'no';
}

export interface EmissionResults {
  transportation: number;
  energy: number;
  lifestyle: number;
  total: number;
  breakdown: {
    car: number;
    publicTransport: number;
    flights: number;
    electricity: number;
    cooking: number;
    diet: number;
    shopping: number;
    recycling: number;
  };
}

export function calculateEmissions(inputs: UserInputs): EmissionResults {
  const weeksPerYear = 52;
  const { transportation, energy, lifestyle } = EMISSION_FACTORS;

  const carEmissions =
    inputs.carType !== 'none'
      ? inputs.carDistance * weeksPerYear * transportation.car[inputs.carType]
      : 0;

  const busEmissions =
    inputs.busDistance * weeksPerYear * transportation.publicTransport.bus;
  const trainEmissions =
    inputs.trainDistance * weeksPerYear * transportation.publicTransport.train;
  const metroEmissions =
    inputs.metroDistance * weeksPerYear * transportation.publicTransport.metro;

  const publicTransportEmissions =
    busEmissions + trainEmissions + metroEmissions;

  const shortFlightEmissions =
    inputs.shortFlights *
    transportation.flights.shortHaul.distance *
    transportation.flights.shortHaul.emissionPerKm *
    2;

  const mediumFlightEmissions =
    inputs.mediumFlights *
    transportation.flights.mediumHaul.distance *
    transportation.flights.mediumHaul.emissionPerKm *
    2;

  const longFlightEmissions =
    inputs.longFlights *
    transportation.flights.longHaul.distance *
    transportation.flights.longHaul.emissionPerKm *
    2;

  const flightEmissions =
    shortFlightEmissions + mediumFlightEmissions + longFlightEmissions;

  const transportationTotal =
    carEmissions + publicTransportEmissions + flightEmissions;

  const electricityEmissions =
    inputs.electricityUsage * 12 * energy.electricity;

  const cookingEmissions =
    inputs.cookingFuel === 'electricity'
      ? inputs.electricityUsage * 0.15 * 12 * energy.cooking.electricity
      : inputs.cookingFuel === 'lpg'
        ? 12 * 15 * energy.cooking.lpg
        : 12 * 20 * energy.cooking.biomass;

  const energyTotal = electricityEmissions + cookingEmissions;

  const dietEmissions = lifestyle.diet[inputs.dietType];
  const shoppingEmissions = lifestyle.shopping[inputs.shoppingHabits];
  const recyclingEmissions = lifestyle.recycling[inputs.recycling];

  const lifestyleTotal = dietEmissions + shoppingEmissions + recyclingEmissions;

  return {
    transportation: transportationTotal,
    energy: energyTotal,
    lifestyle: lifestyleTotal,
    total: transportationTotal + energyTotal + lifestyleTotal,
    breakdown: {
      car: carEmissions,
      publicTransport: publicTransportEmissions,
      flights: flightEmissions,
      electricity: electricityEmissions,
      cooking: cookingEmissions,
      diet: dietEmissions,
      shopping: shoppingEmissions,
      recycling: recyclingEmissions,
    },
  };
}

export function getFootprintClassification(
  total: number
): 'low' | 'average' | 'high' {
  if (total < 6000) return 'low';
  if (total < 12000) return 'average';
  return 'high';
}

export function getReductionTips(results: EmissionResults): string[] {
  const tips: string[] = [];
  const { breakdown } = results;

  if (breakdown.car > 2000) {
    tips.push(
      'Consider carpooling, using public transport, or switching to an electric/hybrid vehicle to reduce car emissions.'
    );
  }

  if (breakdown.flights > 1500) {
    tips.push(
      'Reduce air travel when possible, or offset your flight emissions through verified carbon offset programs.'
    );
  }

  if (breakdown.electricity > 2000) {
    tips.push(
      'Switch to renewable energy providers, use energy-efficient appliances, and turn off devices when not in use.'
    );
  }

  if (breakdown.diet > 2500) {
    tips.push(
      'Reducing meat consumption, especially red meat, can significantly lower your carbon footprint.'
    );
  }

  if (breakdown.shopping > 1000) {
    tips.push(
      'Buy less, choose sustainable brands, and opt for second-hand items when possible.'
    );
  }

  if (breakdown.recycling === 0) {
    tips.push(
      'Start recycling! It can save approximately 300 kg CO₂ per year.'
    );
  }

  if (tips.length === 0) {
    tips.push(
      'Great job! Your carbon footprint is already low. Keep up the good work and inspire others!'
    );
  }

  return tips;
}
