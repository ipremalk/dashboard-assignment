import { useMemo } from 'react';
import { findVehicleById } from '../utils/fleetUtils';

export const useVehicleById = (vehicles, vehicleId) => {
  const vehicle = useMemo(
    () => findVehicleById(vehicles, vehicleId),
    [vehicles, vehicleId]
  );

  return vehicle;
};
