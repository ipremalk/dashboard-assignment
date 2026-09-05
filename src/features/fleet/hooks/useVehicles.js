import { useVehiclesQuery } from '@api/queries/fleetQueries';
import { normalizeVehicleList } from '../utils/fleetNormalizers';

export const useVehicles = () => {
  const { data, isLoading, isError, error, refetch } = useVehiclesQuery();

  const vehicles = data ? normalizeVehicleList(data) : [];

  return {
    vehicles,
    isLoading,
    isError,
    error,
    refetch,
  };
};
