import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVehicleFilters } from './useVehicleFilters';

const mockVehicles = [
  { id: '1', vehicleNumber: 'FL-001', status: 'idle', driverName: 'John', speed: 0 },
  { id: '2', vehicleNumber: 'FL-002', status: 'en_route', driverName: 'Jane', speed: 50 },
  { id: '3', vehicleNumber: 'FL-003', status: 'delivered', driverName: 'Bob', speed: 0 },
];

describe('useVehicleFilters', () => {
  it('should initialize with default filters', () => {
    const { result } = renderHook(() => useVehicleFilters(mockVehicles));

    expect(result.current.filters.status).toBe('all');
    expect(result.current.filters.search).toBe('');
    expect(result.current.filteredVehicles).toHaveLength(3);
  });

  it('should filter vehicles by status', () => {
    const { result } = renderHook(() => useVehicleFilters(mockVehicles));

    act(() => {
      result.current.setStatusFilter('idle');
    });

    expect(result.current.filters.status).toBe('idle');
    expect(result.current.filteredVehicles).toHaveLength(1);
    expect(result.current.filteredVehicles[0].id).toBe('1');
  });

  it('should filter vehicles by search query', () => {
    const { result } = renderHook(() => useVehicleFilters(mockVehicles));

    act(() => {
      result.current.setSearchQuery('Jane');
    });

    expect(result.current.filters.search).toBe('Jane');
    expect(result.current.filteredVehicles).toHaveLength(1);
    expect(result.current.filteredVehicles[0].driverName).toBe('Jane');
  });

  it('should sort vehicles', () => {
    const { result } = renderHook(() => useVehicleFilters(mockVehicles));

    act(() => {
      result.current.setSorting('speed', 'desc');
    });

    expect(result.current.filters.sortBy).toBe('speed');
    expect(result.current.filters.sortDirection).toBe('desc');
    expect(result.current.filteredVehicles[0].speed).toBe(50);
  });

  it('should apply multiple filters together', () => {
    const { result } = renderHook(() => useVehicleFilters(mockVehicles));

    act(() => {
      result.current.setStatusFilter('en_route');
      result.current.setSearchQuery('FL-002');
    });

    expect(result.current.filteredVehicles).toHaveLength(1);
    expect(result.current.filteredVehicles[0].id).toBe('2');
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() => useVehicleFilters(mockVehicles));

    act(() => {
      result.current.setStatusFilter('idle');
      result.current.setSearchQuery('test');
      result.current.setSorting('speed', 'desc');
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters.status).toBe('all');
    expect(result.current.filters.search).toBe('');
    expect(result.current.filters.sortBy).toBe('');
    expect(result.current.filteredVehicles).toHaveLength(3);
  });

  it('should update filter with updateFilter', () => {
    const { result } = renderHook(() => useVehicleFilters(mockVehicles));

    act(() => {
      result.current.updateFilter('status', 'delivered');
    });

    expect(result.current.filters.status).toBe('delivered');
    expect(result.current.filteredVehicles).toHaveLength(1);
  });

  it('should handle empty vehicle array', () => {
    const { result } = renderHook(() => useVehicleFilters([]));

    expect(result.current.filteredVehicles).toHaveLength(0);
  });

  it('should memoize filtered vehicles', () => {
    const { result, rerender } = renderHook(
      ({ vehicles }) => useVehicleFilters(vehicles),
      { initialProps: { vehicles: mockVehicles } }
    );

    const firstResult = result.current.filteredVehicles;

    rerender({ vehicles: mockVehicles });

    expect(result.current.filteredVehicles).toBe(firstResult);
  });
});
