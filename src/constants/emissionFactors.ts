export const EMISSION_FACTORS = {
  transportation: {
    car: {
      petrol: 0.17,
      diesel: 0.16,
      electric: 0.05,
      hybrid: 0.11,
    },
    publicTransport: {
      bus: 0.089,
      train: 0.041,
      metro: 0.038,
    },
    flights: {
      shortHaul: { distance: 1500, emissionPerKm: 0.255 },
      mediumHaul: { distance: 3000, emissionPerKm: 0.156 },
      longHaul: { distance: 6000, emissionPerKm: 0.150 },
    },
  },
  energy: {
    electricity: 0.475,
    cooking: {
      lpg: 0.25,
      electricity: 0.475,
      biomass: 0.05,
    },
  },
  lifestyle: {
    diet: {
      vegan: 1500,
      vegetarian: 1700,
      mixed: 2500,
      heavyMeat: 3300,
    },
    shopping: {
      low: 500,
      moderate: 1000,
      high: 2000,
    },
    recycling: {
      yes: -300,
      no: 0,
    },
  },
};

export const THRESHOLDS = {
  low: 6000,
  average: 12000,
};

export const GLOBAL_AVERAGE = 4000;
