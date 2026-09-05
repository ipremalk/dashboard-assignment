import { useMemo } from 'react';
import { calculateStatistics } from '../utils/fleetNormalizers';
import { getVehicleCountsByStatus, getVehiclesWithLowLevels } from '../utils/fleetUtils';

export const useVehicleStats = (vehicles = []) => {
  const stats = useMemo(() => calculateStatistics(vehicles), [vehicles]);

  const counts = useMemo(() => getVehicleCountsByStatus(vehicles), [vehicles]);

  const lowLevels = useMemo(() => getVehiclesWithLowLevels(vehicles), [vehicles]);

  return {
    statistics: stats,
    counts,
    lowBattery: lowLevels.lowBattery,
    lowFuel: lowLevels.lowFuel,
  };
};
