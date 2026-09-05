import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useStatistics } from './useStatistics';
import * as fleetQueries from '@api/queries/fleetQueries';

vi.mock('@api/queries/fleetQueries');

describe('useStatistics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null statistics when loading', () => {
    vi.spyOn(fleetQueries, 'useStatisticsQuery').mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useStatistics());

    expect(result.current.statistics).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });

  it('should normalize and return statistics when data is loaded', () => {
    const mockData = {
      total: 25,
      idle: 10,
      en_route: 12,
      delivered: 3,
      average_speed: 45,
      timestamp: '2026-09-04T12:00:00Z',
    };

    vi.spyOn(fleetQueries, 'useStatisticsQuery').mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useStatistics());

    expect(result.current.statistics.total).toBe(25);
    expect(result.current.statistics.enRoute).toBe(12);
    expect(result.current.statistics.averageSpeed).toBe(45);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle error state', () => {
    const mockError = new Error('API error');

    vi.spyOn(fleetQueries, 'useStatisticsQuery').mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useStatistics());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockError);
  });

  it('should provide refetch function', () => {
    const mockRefetch = vi.fn();

    vi.spyOn(fleetQueries, 'useStatisticsQuery').mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useStatistics());

    expect(result.current.refetch).toBe(mockRefetch);
  });
});
