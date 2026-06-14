import type { TransportConfig } from "@/types/biomass";
import type { ProductionResult, TransportResult } from "@/types/results";

export function calculateTrips(params: {
  pelletTonPerMonth: number;
  truckCapacityTon: number;
  minimumTripsPerMonth?: number;
}) {
  if (params.truckCapacityTon <= 0) {
    return 0;
  }

  const trips = Math.ceil(params.pelletTonPerMonth / params.truckCapacityTon);
  return Math.max(trips, params.minimumTripsPerMonth ?? 0);
}

export function calculateTransport(
  transport: TransportConfig,
  production: ProductionResult,
): TransportResult {
  const tripsPerMonth = calculateTrips({
    pelletTonPerMonth: production.pelletTonPerMonth,
    truckCapacityTon: transport.truckCapacityTon,
    minimumTripsPerMonth: transport.minimumTripsPerMonth,
  });
  const outboundTransportMonthly =
    tripsPerMonth * (transport.costPerTrip + transport.loadingUnloadingPerTrip);
  const outboundTransportPerTon =
    production.pelletTonPerMonth > 0
      ? outboundTransportMonthly / production.pelletTonPerMonth
      : 0;

  return {
    tripsPerMonth,
    outboundTransportMonthly,
    outboundTransportPerTon,
    outboundTransportPerKg: outboundTransportPerTon / 1000,
    isIncludedInOpex:
      transport.mode === "SELLER_PAID" || transport.mode === "DDP",
  };
}
