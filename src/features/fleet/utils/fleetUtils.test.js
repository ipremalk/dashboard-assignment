/**
 * Fleet Utilities Tests
 */

import { describe, it, expect } from 'vitest';
import {
  filterByStatus,
  searchVehicles,
  sortVehicles,
  groupByStatus,
  getVehiclesWithLowLevels,
  findVehicleById,
  getActiveVehicles,
  getIdleVehicles,
  applyFilters,
  getVehicleCountsByStatus,
} from './fleetUtils';

// Mock vehicle data for testing
const mockVehicles = [
  {
    id: '1',
    vehicleNumber: 'FL-001',
    driverName: 'John Doe',
    status: 'idle',
    speed: 0,
    batteryLevel: 80,
    fuelLevel: 60,
    destination: 'Warehouse A',
  },
  {
    id: '2',
    vehicleNumber: 'FL-002',
    driverName: 'Jane Smith',
    status: 'en_route',
    speed: 55,
    batteryLevel: 15,
    fuelLevel: 40,
    destination: 'Downtown',
  },
  {
    id: '3',
    vehicleNumber: 'FL-003',
    driverName: 'Bob Johnson',
    status: 'delivered',
    speed: 0,
    batteryLevel: 50,
    fuelLevel: 10,
    destination: 'Airport',
  },
  {
    id: '4',
    vehicleNumber: 'FL-004',
    driverName: 'Alice Brown',
    status: 'en_route',
    speed: 45,
    batteryLevel: 90,
    fuelLevel: 80,
    destination: 'Mall',
  },
];

describe('filterByStatus', () => {
  it('should filter vehicles by idle status', () => {
    const result = filterByStatus(mockVehicles, 'idle');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter vehicles by en_route status', () => {
    const result = filterByStatus(mockVehicles, 'en_route');
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('2');
    expect(result[1].id).toBe('4');
  });

  it('should filter vehicles by delivered status', () => {
    const result = filterByStatus(mockVehicles, 'delivered');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('should return all vehicles when status is "all"', () => {
    const result = filterByStatus(mockVehicles, 'all');
    expect(result).toHaveLength(4);
  });

  it('should return all vehicles when status is not provided', () => {
    const result = filterByStatus(mockVehicles);
    expect(result).toHaveLength(4);
  });

  it('should return all vehicles for invalid status', () => {
    const result = filterByStatus(mockVehicles, 'invalid_status');
    expect(result).toHaveLength(4);
  });

  it('should return empty array for invalid input', () => {
    expect(filterByStatus(null, 'idle')).toEqual([]);
    expect(filterByStatus(undefined, 'idle')).toEqual([]);
    expect(filterByStatus('invalid', 'idle')).toEqual([]);
  });
});

describe('searchVehicles', () => {
  it('should search by vehicle number', () => {
    const result = searchVehicles(mockVehicles, 'FL-002');
    expect(result).toHaveLength(1);
    expect(result[0].vehicleNumber).toBe('FL-002');
  });

  it('should search by driver name', () => {
    const result = searchVehicles(mockVehicles, 'Jane');
    expect(result).toHaveLength(1);
    expect(result[0].driverName).toBe('Jane Smith');
  });

  it('should search by destination', () => {
    const result = searchVehicles(mockVehicles, 'Downtown');
    expect(result).toHaveLength(1);
    expect(result[0].destination).toBe('Downtown');
  });

  it('should be case insensitive', () => {
    const result = searchVehicles(mockVehicles, 'JANE');
    expect(result).toHaveLength(1);
    expect(result[0].driverName).toBe('Jane Smith');
  });

  it('should find partial matches', () => {
    const result = searchVehicles(mockVehicles, 'FL-00');
    expect(result).toHaveLength(4);
  });

  it('should return all vehicles for empty query', () => {
    expect(searchVehicles(mockVehicles, '')).toHaveLength(4);
    expect(searchVehicles(mockVehicles, '   ')).toHaveLength(4);
  });

  it('should return all vehicles when query is not provided', () => {
    expect(searchVehicles(mockVehicles)).toHaveLength(4);
    expect(searchVehicles(mockVehicles, null)).toHaveLength(4);
  });

  it('should return empty array when no matches found', () => {
    const result = searchVehicles(mockVehicles, 'xyz123');
    expect(result).toHaveLength(0);
  });

  it('should return empty array for invalid input', () => {
    expect(searchVehicles(null, 'test')).toEqual([]);
    expect(searchVehicles(undefined, 'test')).toEqual([]);
  });
});

describe('sortVehicles', () => {
  it('should sort by vehicleNumber ascending', () => {
    const result = sortVehicles(mockVehicles, 'vehicleNumber', 'asc');
    expect(result[0].vehicleNumber).toBe('FL-001');
    expect(result[3].vehicleNumber).toBe('FL-004');
  });

  it('should sort by vehicleNumber descending', () => {
    const result = sortVehicles(mockVehicles, 'vehicleNumber', 'desc');
    expect(result[0].vehicleNumber).toBe('FL-004');
    expect(result[3].vehicleNumber).toBe('FL-001');
  });

  it('should sort by speed ascending', () => {
    const result = sortVehicles(mockVehicles, 'speed', 'asc');
    expect(result[0].speed).toBe(0);
    expect(result[3].speed).toBe(55);
  });

  it('should sort by driverName ascending', () => {
    const result = sortVehicles(mockVehicles, 'driverName', 'asc');
    expect(result[0].driverName).toBe('Alice Brown');
    expect(result[3].driverName).toBe('John Doe');
  });

  it('should handle case-insensitive string sorting', () => {
    const vehicles = [
      { id: '1', vehicleNumber: 'ZZ-001', status: 'idle' },
      { id: '2', vehicleNumber: 'aa-001', status: 'idle' },
    ];
    const result = sortVehicles(vehicles, 'vehicleNumber', 'asc');
    expect(result[0].vehicleNumber).toBe('aa-001');
  });

  it('should default to ascending when direction not specified', () => {
    const result = sortVehicles(mockVehicles, 'speed');
    expect(result[0].speed).toBe(0);
  });

  it('should handle null values by pushing them to end', () => {
    const vehicles = [
      { id: '1', speed: 50 },
      { id: '2', speed: null },
      { id: '3', speed: 30 },
    ];
    const result = sortVehicles(vehicles, 'speed', 'asc');
    expect(result[0].speed).toBe(30);
    expect(result[1].speed).toBe(50);
    expect(result[2].speed).toBeNull();
  });

  it('should not mutate original array', () => {
    const original = [...mockVehicles];
    sortVehicles(mockVehicles, 'speed', 'desc');
    expect(mockVehicles).toEqual(original);
  });

  it('should return copy of array when field not provided', () => {
    const result = sortVehicles(mockVehicles);
    expect(result).toEqual(mockVehicles);
    expect(result).not.toBe(mockVehicles); // Different reference
  });

  it('should return empty array for invalid input', () => {
    expect(sortVehicles(null, 'speed')).toEqual([]);
    expect(sortVehicles(undefined, 'speed')).toEqual([]);
  });
});

describe('groupByStatus', () => {
  it('should group vehicles by status', () => {
    const result = groupByStatus(mockVehicles);
    expect(result.idle).toHaveLength(1);
    expect(result.en_route).toHaveLength(2);
    expect(result.delivered).toHaveLength(1);
  });

  it('should return empty arrays for statuses with no vehicles', () => {
    const vehicles = [{ id: '1', status: 'idle', vehicleNumber: 'FL-001' }];
    const result = groupByStatus(vehicles);
    expect(result.idle).toHaveLength(1);
    expect(result.en_route).toHaveLength(0);
    expect(result.delivered).toHaveLength(0);
  });

  it('should default to idle for vehicles with no status', () => {
    const vehicles = [{ id: '1', vehicleNumber: 'FL-001' }];
    const result = groupByStatus(vehicles);
    expect(result.idle).toHaveLength(1);
  });

  it('should return empty groups for invalid input', () => {
    const result = groupByStatus(null);
    expect(result).toEqual({
      idle: [],
      en_route: [],
      delivered: [],
    });
  });
});

describe('getVehiclesWithLowLevels', () => {
  it('should find vehicles with low battery (below 20%)', () => {
    const result = getVehiclesWithLowLevels(mockVehicles);
    expect(result.lowBattery).toHaveLength(1);
    expect(result.lowBattery[0].id).toBe('2');
  });

  it('should find vehicles with low fuel (below 20%)', () => {
    const result = getVehiclesWithLowLevels(mockVehicles);
    expect(result.lowFuel).toHaveLength(1);
    expect(result.lowFuel[0].id).toBe('3');
  });

  it('should use custom threshold', () => {
    const result = getVehiclesWithLowLevels(mockVehicles, 50);
    expect(result.lowBattery).toHaveLength(1); // Only FL-002 has 15%
    expect(result.lowFuel).toHaveLength(2); // FL-002 (40%) and FL-003 (10%)
  });

  it('should handle null battery/fuel levels', () => {
    const vehicles = [
      { id: '1', batteryLevel: null, fuelLevel: null },
      { id: '2', batteryLevel: 10, fuelLevel: 50 },
    ];
    const result = getVehiclesWithLowLevels(vehicles);
    expect(result.lowBattery).toHaveLength(1);
    expect(result.lowFuel).toHaveLength(0);
  });

  it('should return empty arrays for invalid input', () => {
    const result = getVehiclesWithLowLevels(null);
    expect(result).toEqual({ lowBattery: [], lowFuel: [] });
  });
});

describe('findVehicleById', () => {
  it('should find vehicle by ID', () => {
    const result = findVehicleById(mockVehicles, '2');
    expect(result).not.toBeNull();
    expect(result.id).toBe('2');
    expect(result.vehicleNumber).toBe('FL-002');
  });

  it('should return null when vehicle not found', () => {
    const result = findVehicleById(mockVehicles, '999');
    expect(result).toBeNull();
  });

  it('should return null when ID not provided', () => {
    expect(findVehicleById(mockVehicles, null)).toBeNull();
    expect(findVehicleById(mockVehicles, undefined)).toBeNull();
    expect(findVehicleById(mockVehicles, '')).toBeNull();
  });

  it('should handle numeric IDs by converting to string', () => {
    const result = findVehicleById(mockVehicles, '3');
    expect(result.id).toBe('3');
  });

  it('should return null for invalid input', () => {
    expect(findVehicleById(null, '1')).toBeNull();
    expect(findVehicleById(undefined, '1')).toBeNull();
  });
});

describe('getActiveVehicles', () => {
  it('should return only en_route vehicles', () => {
    const result = getActiveVehicles(mockVehicles);
    expect(result).toHaveLength(2);
    expect(result.every((v) => v.status === 'en_route')).toBe(true);
  });

  it('should return empty array when no active vehicles', () => {
    const vehicles = [{ id: '1', status: 'idle', vehicleNumber: 'FL-001' }];
    const result = getActiveVehicles(vehicles);
    expect(result).toHaveLength(0);
  });
});

describe('getIdleVehicles', () => {
  it('should return only idle vehicles', () => {
    const result = getIdleVehicles(mockVehicles);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('idle');
  });

  it('should return empty array when no idle vehicles', () => {
    const vehicles = [{ id: '1', status: 'en_route', vehicleNumber: 'FL-001' }];
    const result = getIdleVehicles(vehicles);
    expect(result).toHaveLength(0);
  });
});

describe('applyFilters', () => {
  it('should apply status filter only', () => {
    const result = applyFilters(mockVehicles, { status: 'idle' });
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('idle');
  });

  it('should apply search filter only', () => {
    const result = applyFilters(mockVehicles, { search: 'Jane' });
    expect(result).toHaveLength(1);
    expect(result[0].driverName).toBe('Jane Smith');
  });

  it('should apply sort only', () => {
    const result = applyFilters(mockVehicles, {
      sortBy: 'speed',
      sortDirection: 'desc',
    });
    expect(result[0].speed).toBe(55);
  });

  it('should apply multiple filters together', () => {
    const result = applyFilters(mockVehicles, {
      status: 'en_route',
      search: 'FL-00',
      sortBy: 'speed',
      sortDirection: 'desc',
    });
    expect(result).toHaveLength(2);
    expect(result[0].speed).toBe(55); // FL-002
    expect(result[1].speed).toBe(45); // FL-004
  });

  it('should return all vehicles when no filters provided', () => {
    const result = applyFilters(mockVehicles, {});
    expect(result).toHaveLength(4);
  });

  it('should return all vehicles when filters is undefined', () => {
    const result = applyFilters(mockVehicles);
    expect(result).toHaveLength(4);
  });

  it('should return empty array for invalid input', () => {
    expect(applyFilters(null, { status: 'idle' })).toEqual([]);
  });
});

describe('getVehicleCountsByStatus', () => {
  it('should return correct counts by status', () => {
    const result = getVehicleCountsByStatus(mockVehicles);
    expect(result.total).toBe(4);
    expect(result.idle).toBe(1);
    expect(result.en_route).toBe(2);
    expect(result.delivered).toBe(1);
  });

  it('should return zero counts for empty array', () => {
    const result = getVehicleCountsByStatus([]);
    expect(result).toEqual({
      total: 0,
      idle: 0,
      en_route: 0,
      delivered: 0,
    });
  });

  it('should return zero counts for invalid input', () => {
    const result = getVehicleCountsByStatus(null);
    expect(result).toEqual({
      total: 0,
      idle: 0,
      en_route: 0,
      delivered: 0,
    });
  });
});
