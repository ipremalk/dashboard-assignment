import { useQuery } from '@tanstack/react-query';
import fleetService from '@api/services/fleetService';
import { QUERY_CONFIG } from '@config/constants';

export const fleetKeys = {
  all: ['fleet'],
  vehicles: () => [...fleetKeys.all, 'vehicles'],
  vehicle: (id) => [...fleetKeys.vehicles(), id],
  vehiclesByStatus: (status) => [...fleetKeys.vehicles(), 'status', status],
  statistics: () => [...fleetKeys.all, 'statistics'],
};

export function useVehiclesQuery() {
  return useQuery({
    queryKey: fleetKeys.vehicles(),
    queryFn: fleetService.getVehicles,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: QUERY_CONFIG.RETRY,
    refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
  });
}

export function useVehicleQuery(vehicleId, options = {}) {
  return useQuery({
    queryKey: fleetKeys.vehicle(vehicleId),
    queryFn: () => fleetService.getVehicleById(vehicleId),
    enabled: !!vehicleId,
    staleTime: QUERY_CONFIG.STALE_TIME / 2,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: QUERY_CONFIG.RETRY,
    ...options,
  });
}

export function useVehiclesByStatusQuery(status, options = {}) {
  return useQuery({
    queryKey: fleetKeys.vehiclesByStatus(status),
    queryFn: () => fleetService.getVehiclesByStatus(status),
    enabled: !!status && status !== 'all',
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: QUERY_CONFIG.RETRY,
    ...options,
  });
}

export function useStatisticsQuery() {
  return useQuery({
    queryKey: fleetKeys.statistics(),
    queryFn: fleetService.getStatistics,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: QUERY_CONFIG.RETRY,
    refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
  });
}
