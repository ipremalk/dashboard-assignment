import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVehicles } from './useVehicles';
import * as fleetQueries from '@api/queries/fleetQueries';

vi.mock('@api/queries/fleetQueries');

describe('useVehicles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty vehicles when loading', () => {
    vi.spyOn(fleetQueries, 'useVehiclesQuery').mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.vehicles).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('should normalize and return vehicles when data is loaded', () => {
    const mockData = [
      { id: '1', vehicleNumber: 'FL-001', status: 'idle' },
      { id: '2', vehicleNumber: 'FL-002', status: 'en_route' },
    ];

    vi.spyOn(fleetQueries, 'useVehiclesQuery').mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.vehicles).toHaveLength(2);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle error state', () => {
    const mockError = new Error('Failed to fetch');

    vi.spyOn(fleetQueries, 'useVehiclesQuery').mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockError);
  });

  it('should provide refetch function', () => {
    const mockRefetch = vi.fn();

    vi.spyOn(fleetQueries, 'useVehiclesQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.refetch).toBe(mockRefetch);
  });

  it('should filter out invalid vehicles during normalization', () => {
    const mockData = [
      { id: '1', vehicleNumber: 'FL-001', status: 'idle' },
      null,
      { id: '2' }, // missing vehicleNumber
      { id: '3', vehicleNumber: 'FL-003', status: 'delivered' },
    ];

    vi.spyOn(fleetQueries, 'useVehiclesQuery').mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.vehicles).toHaveLength(2);
    expect(result.current.vehicles[0].id).toBe('1');
    expect(result.current.vehicles[1].id).toBe('3');
  });
});
