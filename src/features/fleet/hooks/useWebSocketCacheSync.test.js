import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWebSocketCacheSync } from './useWebSocketCacheSync';
import * as useWebSocketModule from '@hooks/useWebSocket';

// Mock the useWebSocket hook
vi.mock('@hooks/useWebSocket');

describe('useWebSocketCacheSync', () => {
  let queryClient;
  let mockSubscribe;
  let mockUnsubscribe;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    mockUnsubscribe = vi.fn();
    mockSubscribe = vi.fn(() => mockUnsubscribe);

    // Mock useWebSocket to return our mock functions
    vi.spyOn(useWebSocketModule, 'useWebSocket').mockReturnValue({
      isConnected: true,
      connectionStatus: 'connected',
      subscribe: mockSubscribe,
    });
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('returns connection state', () => {
    const { result } = renderHook(() => useWebSocketCacheSync(), { wrapper });

    expect(result.current.isConnected).toBe(true);
    expect(result.current.connectionStatus).toBe('connected');
    expect(result.current.lastUpdateTime).toBeNull();
  });

  it('subscribes to WebSocket when connected', () => {
    renderHook(() => useWebSocketCacheSync(), { wrapper });

    expect(mockSubscribe).toHaveBeenCalledTimes(1);
    expect(mockSubscribe).toHaveBeenCalledWith(expect.any(Function));
  });

  it('unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useWebSocketCacheSync(), { wrapper });

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('does not subscribe when not connected', () => {
    vi.spyOn(useWebSocketModule, 'useWebSocket').mockReturnValue({
      isConnected: false,
      connectionStatus: 'disconnected',
      subscribe: mockSubscribe,
    });

    renderHook(() => useWebSocketCacheSync(), { wrapper });

    expect(mockSubscribe).not.toHaveBeenCalled();
  });

  it('updates lastUpdateTime when receiving WebSocket message', async () => {
    const { result } = renderHook(() => useWebSocketCacheSync(), { wrapper });

    // Get the subscribe callback
    const subscribeCallback = mockSubscribe.mock.calls[0][0];

    // Simulate receiving a WebSocket message
    const beforeTime = Date.now();
    subscribeCallback({ type: 'vehicle_update', vehicle: { id: '1' } });
    const afterTime = Date.now();

    await waitFor(() => {
      expect(result.current.lastUpdateTime).toBeGreaterThanOrEqual(beforeTime);
      expect(result.current.lastUpdateTime).toBeLessThanOrEqual(afterTime);
    });
  });

  it('handles vehicle_update message type', async () => {
    // Set initial data in cache
    queryClient.setQueryData(['vehicles'], [
      { id: '1', vehicleNumber: 'V001', speed: 50 },
    ]);

    renderHook(() => useWebSocketCacheSync(), { wrapper });

    const subscribeCallback = mockSubscribe.mock.calls[0][0];

    // Simulate vehicle update
    subscribeCallback({
      type: 'vehicle_update',
      vehicle: { id: '1', speed: 60 },
    });

    await waitFor(() => {
      const cachedData = queryClient.getQueryData(['vehicles']);
      expect(cachedData).toBeDefined();
      expect(cachedData[0].speed).toBe(60);
    });
  });

  it('handles statistics_update message type', async () => {
    renderHook(() => useWebSocketCacheSync(), { wrapper });

    const subscribeCallback = mockSubscribe.mock.calls[0][0];

    // Simulate statistics update
    const newStats = { total: 10, idle: 5, enRoute: 3, delivered: 2 };
    subscribeCallback({
      type: 'statistics_update',
      statistics: newStats,
    });

    await waitFor(() => {
      const cachedStats = queryClient.getQueryData(['statistics']);
      expect(cachedStats).toEqual(newStats);
    });
  });

  it('handles vehicles message type (full list update)', async () => {
    renderHook(() => useWebSocketCacheSync(), { wrapper });

    const subscribeCallback = mockSubscribe.mock.calls[0][0];

    // Simulate full vehicle list update
    const newVehicles = [
      { id: '1', vehicleNumber: 'V001' },
      { id: '2', vehicleNumber: 'V002' },
    ];
    subscribeCallback({
      type: 'vehicles',
      vehicles: newVehicles,
    });

    await waitFor(() => {
      const cachedData = queryClient.getQueryData(['vehicles']);
      expect(cachedData).toEqual(newVehicles);
    });
  });

  it('ignores unknown message types', async () => {
    queryClient.setQueryData(['vehicles'], [{ id: '1' }]);

    renderHook(() => useWebSocketCacheSync(), { wrapper });

    const subscribeCallback = mockSubscribe.mock.calls[0][0];

    // Simulate unknown message type
    subscribeCallback({ type: 'unknown_type', data: 'test' });

    // Cache should remain unchanged
    const cachedData = queryClient.getQueryData(['vehicles']);
    expect(cachedData).toEqual([{ id: '1' }]);
  });
});
