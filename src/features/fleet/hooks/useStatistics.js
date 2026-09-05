import { useStatisticsQuery } from '@api/queries/fleetQueries';
import { normalizeStatistics } from '../utils/fleetNormalizers';

export const useStatistics = () => {
  const { data, isLoading, isError, error, refetch } = useStatisticsQuery();

  const statistics = data ? normalizeStatistics(data) : null;

  return {
    statistics,
    isLoading,
    isError,
    error,
    refetch,
  };
};
