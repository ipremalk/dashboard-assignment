import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVehicleById } from './useVehicleById';

const mockVehicles = [
  { id: '1', vehicleNumber: 'FL-001', status: 'idle' },
  { id: '2', vehicleNumber: 'FL-002', status: 'en_route' },
  { id: '3', vehicleNumber: 'FL-003', status: 'delivered' },
];

describe('useVehicleById', () => {
  it('should find vehicle by ID', () => {
    const { result } = renderHook(() => useVehicleById(mockVehicles, '2'));

    expect(result.current).not.toBeNull();
    expect(result.current.id).toBe('2');
    expect(result.current.vehicleNumber).toBe('FL-002');
  });

  it('should return null when vehicle not found', () => {
    const { result } = renderHook(() => useVehicleById(mockVehicles, '999'));

    expect(result.current).toBeNull();
  });

  it('should return null when ID is not provided', () => {
    const { result } = renderHook(() => useVehicleById(mockVehicles, null));

    expect(result.current).toBeNull();
  });

  it('should handle empty vehicle array', () => {
    const { result } = renderHook(() => useVehicleById([], '1'));

    expect(result.current).toBeNull();
  });

  it('should memoize result', () => {
    const { result, rerender } = renderHook(
      ({ vehicles, id }) => useVehicleById(vehicles, id),
      { initialProps: { vehicles: mockVehicles, id: '1' } }
    );

    const firstResult = result.current;

    rerender({ vehicles: mockVehicles, id: '1' });

    expect(result.current).toBe(firstResult);
  });

  it('should update when vehicle ID changes', () => {
    const { result, rerender } = renderHook(
      ({ vehicles, id }) => useVehicleById(vehicles, id),
      { initialProps: { vehicles: mockVehicles, id: '1' } }
    );

    expect(result.current.id).toBe('1');

    rerender({ vehicles: mockVehicles, id: '2' });

    expect(result.current.id).toBe('2');
  });
});
