import { Box } from '@mui/material';
import { useVehicles } from '../../hooks/useVehicles';
import { useStatistics } from '../../hooks/useStatistics';
import { useVehicleFilters } from '../../hooks/useVehicleFilters';
import { useVehicleStats } from '../../hooks/useVehicleStats';
import { useWebSocketCacheSync } from '../../hooks/useWebSocketCacheSync';
import { useTimeSinceUpdate } from '../../hooks/useTimeSinceUpdate';
import { Sidebar } from '../Sidebar';
import { VehicleList } from '../VehicleList';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage';

export const FleetDashboard = () => {
  const { vehicles, isLoading: vehiclesLoading, isError: vehiclesError, error: vehiclesErrorObj, refetch: refetchVehicles } = useVehicles();
  const { statistics } = useStatistics();
  const { isConnected, connectionStatus, lastUpdateTime } = useWebSocketCacheSync();
  const timeSinceUpdate = useTimeSinceUpdate(lastUpdateTime);

  const { counts } = useVehicleStats(vehicles);

  const {
    filters,
    filteredVehicles,
    setStatusFilter,
  } = useVehicleFilters(vehicles);

  if (vehiclesLoading && vehicles.length === 0) {
    return <LoadingSpinner message="Loading fleet data..." />;
  }

  if (vehiclesError && vehicles.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <ErrorMessage
          message={vehiclesErrorObj?.message || 'Failed to load vehicles'}
          onRetry={refetchVehicles}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }} data-testid="fleet-dashboard">
      <Sidebar
        filters={filters}
        counts={counts}
        statistics={statistics}
        onStatusChange={setStatusFilter}
        timeSinceUpdate={timeSinceUpdate}
        isConnected={isConnected}
        connectionStatus={connectionStatus}
      />

      <Box sx={{ flex: 1, p: 3, overflowY: 'auto', bgcolor: 'background.default' }}>
        <VehicleList vehicles={filteredVehicles} totalCount={vehicles.length} />
      </Box>
    </Box>
  );
};

export default FleetDashboard;
