import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from '@hooks/useWebSocket';
import { mergeVehicleUpdate, normalizeVehicleList } from '../utils/fleetNormalizers';

export const useWebSocketCacheSync = () => {
  const queryClient = useQueryClient();
  const { isConnected, connectionStatus, subscribe } = useWebSocket();
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = subscribe((data) => {
      console.log('[useWebSocketCacheSync] WebSocket update:', data);

      setLastUpdateTime(Date.now());

      if (data.type === 'vehicle_update' && data.vehicle) {
        queryClient.setQueryData(['vehicles'], (oldData) => {
          if (!oldData) return oldData;

          const normalized = normalizeVehicleList(oldData);
          const existingIndex = normalized.findIndex((v) => v.id === data.vehicle.id);

          if (existingIndex >= 0) {
            const updated = [...normalized];
            updated[existingIndex] = mergeVehicleUpdate(normalized[existingIndex], data.vehicle);
            return updated;
          }
          return normalized;
        });
      }

      if (data.type === 'statistics_update' && data.statistics) {
        queryClient.setQueryData(['statistics'], data.statistics);
      }

      if (data.type === 'vehicles' && data.vehicles) {
        queryClient.setQueryData(['vehicles'], data.vehicles);
      }
    });

    return unsubscribe;
  }, [isConnected, subscribe, queryClient]);

  return {
    isConnected,
    connectionStatus,
    lastUpdateTime,
  };
};

export default useWebSocketCacheSync;
