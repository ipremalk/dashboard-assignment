import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVehicleStats } from './useVehicleStats';

const mockVehicles = [
  { id: '1', status: 'idle', speed: 0, batteryLevel: 80, fuelLevel: 60 },
  { id: '2', status: 'en_route', speed: 50, batteryLevel: 15, fuelLevel: 40 },
  { id: '3', status: 'en_route', speed: 60, batteryLevel: 50, fuelLevel: 10 },
  { id: '4', status: 'delivered', speed: 0, batteryLevel: 90, fuelLevel: 80 },
];

describe('useVehicleStats', () => {
  it('should calculate statistics from vehicles', () => {
    const { result } = renderHook(() => useVehicleStats(mockVehicles));

    expect(result.current.statistics.total).toBe(4);
    expect(result.current.statistics.idle).toBe(1);
    expect(result.current.statistics.enRoute).toBe(2);
    expect(result.current.statistics.delivered).toBe(1);
    expect(result.current.statistics.averageSpeed).toBe(55);
  });

  it('should calculate vehicle counts by status', () => {
    const { result } = renderHook(() => useVehicleStats(mockVehicles));

    expect(result.current.counts.total).toBe(4);
    expect(result.current.counts.idle).toBe(1);
    expect(result.current.counts.en_route).toBe(2);
    expect(result.current.counts.delivered).toBe(1);
  });

  it('should identify vehicles with low battery', () => {
    const { result } = renderHook(() => useVehicleStats(mockVehicles));

    expect(result.current.lowBattery).toHaveLength(1);
    expect(result.current.lowBattery[0].id).toBe('2');
  });

  it('should identify vehicles with low fuel', () => {
    const { result } = renderHook(() => useVehicleStats(mockVehicles));

    expect(result.current.lowFuel).toHaveLength(1);
    expect(result.current.lowFuel[0].id).toBe('3');
  });

  it('should handle empty vehicle array', () => {
    const { result } = renderHook(() => useVehicleStats([]));

    expect(result.current.statistics.total).toBe(0);
    expect(result.current.counts.total).toBe(0);
    expect(result.current.lowBattery).toHaveLength(0);
    expect(result.current.lowFuel).toHaveLength(0);
  });

  it('should memoize calculations', () => {
    const { result, rerender } = renderHook(
      ({ vehicles }) => useVehicleStats(vehicles),
      { initialProps: { vehicles: mockVehicles } }
    );

    const firstStats = result.current.statistics;

    rerender({ vehicles: mockVehicles });

    expect(result.current.statistics).toBe(firstStats);
  });
});
