import type { Scenario } from "@/types/biomass";

function stamp() {
  return new Date().toISOString();
}

export const defaultScenario20TpdMix: Scenario = {
  id: "default-20tpd-mix",
  name: "20 TPD Mix Sekam + Sawdust Base Case",
  description:
    "Default project 20 ton per hari dengan bahan baku 50:50 sekam dan sawdust.",
  createdAt: stamp(),
  updatedAt: stamp(),
  production: {
    targetPelletTonPerDay: 20,
    calculationMode: "TARGET_OUTPUT",
    operatingDaysPerMonth: 25,
    operatingHoursPerDay: 20,
    pelletizingYieldPct: 92,
    downtimePct: 5,
    rejectRatePct: 2,
    handlingLossPct: 1,
  },
  feedstocks: [
    {
      id: "sekam",
      name: "Sekam Padi",
      mixPct: 50,
      pricePerKg: 500,
      gcvKcalPerKg: 3500,
      moisturePct: 15,
      ashPct: 18,
    },
    {
      id: "sawdust",
      name: "Sawdust",
      mixPct: 50,
      pricePerKg: 500,
      gcvKcalPerKg: 3900,
      moisturePct: 20,
      ashPct: 3,
    },
  ],
  quality: {
    gcvArb: 3700,
    totalMoistureArbPct: 20,
    ashPct: 11,
    sulfurPct: 0.2,
    chlorinePct: 0.03,
  },
  pricing: {
    mode: "HPT",
    hbaUsdPerTon: 55.66,
    usdIdrRate: 17514,
    biomassCoefficient: 1.2,
    referenceCoalGcv: 4100,
  },
  opex: {
    electricityPerDay: 500000,
    waterPerDay: 0,
    laborMonthly: 35000000,
    maintenancePerTon: 40000,
    sparepartMonthly: 10000000,
    packagingPerTon: 15000,
    labTestPerShipment: 200000,
    rentMonthly: 5000000,
    adminMonthly: 3000000,
    otherMonthly: 3000000,
  },
  capex: {
    contingencyPct: 10,
    items: [
      {
        id: "pellet-mill",
        name: "Pellet Mill",
        category: "Machine",
        qty: 4,
        unitPrice: 25000000,
        usefulLifeYears: 5,
      },
      {
        id: "dryer",
        name: "Dryer",
        category: "Machine",
        qty: 1,
        unitPrice: 75000000,
        usefulLifeYears: 5,
      },
      {
        id: "cooler",
        name: "Cooler",
        category: "Machine",
        qty: 1,
        unitPrice: 15000000,
        usefulLifeYears: 5,
      },
      {
        id: "conveyor",
        name: "Conveyor",
        category: "Machine",
        qty: 2,
        unitPrice: 10000000,
        usefulLifeYears: 5,
      },
      {
        id: "electrical",
        name: "Panel dan Instalasi Listrik",
        category: "Electrical",
        qty: 1,
        unitPrice: 30000000,
        usefulLifeYears: 5,
      },
      {
        id: "warehouse",
        name: "Gudang dan Renovasi",
        category: "Civil",
        qty: 1,
        unitPrice: 50000000,
        usefulLifeYears: 10,
      },
      {
        id: "qc",
        name: "Timbangan dan QC Tools",
        category: "QC",
        qty: 1,
        unitPrice: 10000000,
        usefulLifeYears: 3,
      },
    ],
  },
  workingCapital: {
    opexBufferMonths: 1,
    feedstockStockDays: 7,
    receivableDays: 30,
    cashReserve: 25000000,
  },
  transport: {
    mode: "SELLER_PAID",
    truckCapacityTon: 24,
    costPerTrip: 4500000,
    loadingUnloadingPerTrip: 0,
    labShipmentMode: "PER_TRIP",
    outboundLossPct: 0,
  },
  financing: {
    enabled: false,
    ownCapital: 0,
    loanPrincipal: 0,
    annualInterestRatePct: 12,
    tenorMonths: 36,
    gracePeriodMonths: 0,
    method: "ANNUITY",
  },
  tax: {
    enabled: false,
    incomeTaxPct: 0,
  },
};

export const scenarioPresets = [
  {
    id: "conservative",
    label: "Konservatif",
    notes: "Yield lebih rendah, biaya bahan baku dan transport lebih tinggi.",
  },
  {
    id: "base-case",
    label: "Base Case",
    notes: "Asumsi standar untuk evaluasi utama.",
  },
  {
    id: "optimistic",
    label: "Optimis",
    notes: "Yield lebih tinggi, biaya lebih efisien, dan harga jual sedikit naik.",
  },
] as const;
