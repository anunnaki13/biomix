import { z } from "zod";

const feedstockSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  mixPct: z.number().min(0).max(100),
  pricePerKg: z.number().min(0),
  gcvKcalPerKg: z.number().min(0),
  moisturePct: z.number().min(0).max(100),
  ashPct: z.number().min(0).max(100).optional(),
  sulfurPct: z.number().min(0).max(100).optional(),
  chlorinePct: z.number().min(0).max(100).optional(),
  inboundTransportPerTon: z.number().min(0).optional(),
  preprocessingCostPerTon: z.number().min(0).optional(),
  supplyLimitTonPerDay: z.number().min(0).optional(),
});

export const scenarioSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    createdAt: z.string().min(1),
    updatedAt: z.string().min(1),
    production: z.object({
      targetPelletTonPerDay: z.number().min(0),
      rawInputTonPerDay: z.number().min(0).optional(),
      calculationMode: z.enum(["TARGET_OUTPUT", "TARGET_INPUT"]),
      operatingDaysPerMonth: z.number().min(1).max(31),
      operatingHoursPerDay: z.number().min(1).max(24),
      pelletizingYieldPct: z.number().min(0).max(100),
      downtimePct: z.number().min(0).max(100),
      rejectRatePct: z.number().min(0).max(100),
      handlingLossPct: z.number().min(0).max(100),
      machineRatedCapacityKgPerHour: z.number().min(0).optional(),
    }),
    feedstocks: z.array(feedstockSchema).min(1),
    quality: z.object({
      gcvArb: z.number().min(0).optional(),
      gcvAdb: z.number().min(0).optional(),
      gcvDb: z.number().min(0).optional(),
      totalMoistureArbPct: z.number().min(0).max(100),
      moistureAdbPct: z.number().min(0).max(100).optional(),
      ashPct: z.number().min(0).max(100).optional(),
      sulfurPct: z.number().min(0).max(100).optional(),
      chlorinePct: z.number().min(0).max(100).optional(),
      potassiumPct: z.number().min(0).max(100).optional(),
      sodiumPct: z.number().min(0).max(100).optional(),
      particleSizeMinMm: z.number().min(0).optional(),
      particleSizeMaxMm: z.number().min(0).optional(),
    }),
    pricing: z.object({
      mode: z.enum(["MANUAL", "HPT", "CONTRACT_GCV_ADJUSTED"]),
      manualPricePerTon: z.number().min(0).optional(),
      hbaUsdPerTon: z.number().min(0).optional(),
      usdIdrRate: z.number().min(0).optional(),
      biomassCoefficient: z.number().min(0).optional(),
      referenceCoalGcv: z.number().min(0).optional(),
      contractBasePricePerTon: z.number().min(0).optional(),
      contractBaseGcv: z.number().min(0).optional(),
      minAcceptedGcv: z.number().min(0).optional(),
      maxAcceptedMoisturePct: z.number().min(0).max(100).optional(),
      penaltyPerPctMoisture: z.number().min(0).optional(),
    }),
    opex: z.object({
      electricityPerDay: z.number().min(0),
      waterPerDay: z.number().min(0),
      laborMonthly: z.number().min(0),
      maintenancePerTon: z.number().min(0),
      sparepartMonthly: z.number().min(0),
      packagingPerTon: z.number().min(0),
      labTestPerShipment: z.number().min(0),
      rentMonthly: z.number().min(0),
      adminMonthly: z.number().min(0),
      otherMonthly: z.number().min(0),
    }),
    capex: z.object({
      items: z.array(
        z.object({
          id: z.string().min(1),
          name: z.string().min(1),
          category: z.string().min(1),
          qty: z.number().min(0),
          unitPrice: z.number().min(0),
          usefulLifeYears: z.number().min(0).optional(),
        }),
      ),
      contingencyPct: z.number().min(0).max(100),
    }),
    workingCapital: z.object({
      opexBufferMonths: z.number().min(0),
      feedstockStockDays: z.number().min(0),
      receivableDays: z.number().min(0),
      cashReserve: z.number().min(0),
    }),
    transport: z.object({
      mode: z.enum(["FOB", "SELLER_PAID", "PASS_THROUGH", "DDP"]),
      truckCapacityTon: z.number().gt(0),
      costPerTrip: z.number().min(0),
      loadingUnloadingPerTrip: z.number().min(0),
      labShipmentMode: z.enum(["PER_TRIP", "PER_MONTH", "NONE"]),
      outboundLossPct: z.number().min(0).max(100),
      minimumTripsPerMonth: z.number().min(0).optional(),
    }),
    financing: z.object({
      enabled: z.boolean(),
      ownCapital: z.number().min(0),
      loanPrincipal: z.number().min(0),
      annualInterestRatePct: z.number().min(0).max(100),
      tenorMonths: z.number().min(0),
      gracePeriodMonths: z.number().min(0),
      method: z.enum(["ANNUITY", "FLAT"]),
      adminFeePct: z.number().min(0).max(100).optional(),
    }),
    tax: z.object({
      enabled: z.boolean(),
      incomeTaxPct: z.number().min(0).max(100),
    }),
  })
  .superRefine((scenario, ctx) => {
    const totalMix = scenario.feedstocks.reduce(
      (sum, item) => sum + item.mixPct,
      0,
    );

    if (Math.abs(totalMix - 100) > 0.01) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["feedstocks"],
        message: "Total mix feedstock harus 100%.",
      });
    }

    if (
      scenario.pricing.mode === "HPT" &&
      (!scenario.pricing.hbaUsdPerTon ||
        !scenario.pricing.usdIdrRate ||
        !scenario.pricing.biomassCoefficient ||
        !scenario.pricing.referenceCoalGcv)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricing"],
        message: "Mode HPT membutuhkan HBA, kurs, koefisien biomassa, dan reference GCV.",
      });
    }

    if (
      scenario.pricing.mode === "MANUAL" &&
      !scenario.pricing.manualPricePerTon
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricing", "manualPricePerTon"],
        message: "Manual price wajib diisi jika mode pricing MANUAL.",
      });
    }

    if (
      scenario.pricing.mode === "CONTRACT_GCV_ADJUSTED" &&
      (!scenario.pricing.contractBasePricePerTon ||
        !scenario.pricing.contractBaseGcv)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricing"],
        message: "Mode contract GCV adjusted membutuhkan base contract price dan base GCV.",
      });
    }

    if (
      scenario.financing.enabled &&
      (scenario.financing.loanPrincipal <= 0 || scenario.financing.tenorMonths <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["financing"],
        message: "Loan principal dan tenor wajib lebih besar dari 0 saat financing aktif.",
      });
    }

    if (
      !scenario.quality.gcvArb &&
      !scenario.quality.gcvAdb &&
      !scenario.quality.gcvDb
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["quality"],
        message: "Minimal satu basis GCV harus diisi: ARB, ADB, atau DB.",
      });
    }
  });

export type ScenarioInput = z.infer<typeof scenarioSchema>;
