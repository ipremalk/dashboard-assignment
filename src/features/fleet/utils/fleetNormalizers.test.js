/**
 * Fleet Normalizers Tests
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeVehicle,
  normalizeVehicleList,
  normalizeStatus,
  normalizePercentage,
  normalizeStatistics,
  getDefaultStatistics,
  calculateStatistics,
  mergeVehicleUpdate,
  isVehicleDataStale,
} from './fleetNormalizers';

describe('normalizeVehicle', () => {
  it('should normalize a valid vehicle object', () => {
    const apiVehicle = {
      id: '123',
      vehicleNumber: 'FL-001',
      driverName: 'John Doe',
      status: 'en_route',
      currentLocation: { lat: 37.7749, lng: -122.4194 },
      speed: 50,
      batteryLevel: 80,
      fuelLevel: 60,
      destination: 'Downtown',
      driverPhone: '+1234567890',
      lastUpdated: '2026-09-04T12:00:00Z',
      estimatedArrival: '2026-09-04T13:00:00Z',
    };

    const result = normalizeVehicle(apiVehicle);

    expect(result).toEqual({
      id: '123',
      vehicleNumber: 'FL-001',
      driverName: 'John Doe',
      status: 'en_route',
      location: { lat: 37.7749, lng: -122.4194 },
      speed: 50,
      batteryLevel: 80,
      fuelLevel: 60,
      destination: 'Downtown',
      driverPhone: '+1234567890',
      lastUpdated: '2026-09-04T12:00:00Z',
      estimatedArrival: '2026-09-04T13:00:00Z',
    });
  });

  it('should handle missing optional fields', () => {
    const apiVehicle = {
      id: '123',
      vehicleNumber: 'FL-001',
      status: 'idle',
    };

    const result = normalizeVehicle(apiVehicle);

    expect(result.driverName).toBe('Unknown Driver');
    expect(result.destination).toBe('Unknown Destination');
    expect(result.driverPhone).toBeNull();
    expect(result.location).toBeNull();
  });

  it('should return null for invalid vehicle', () => {
    expect(normalizeVehicle(null)).toBeNull();
    expect(normalizeVehicle(undefined)).toBeNull();
    expect(normalizeVehicle('invalid')).toBeNull();
    expect(normalizeVehicle({})).toBeNull(); // Missing required fields
  });

  it('should sanitize negative speed to 0', () => {
    const apiVehicle = {
      id: '123',
      vehicleNumber: 'FL-001',
      speed: -10,
    };

    const result = normalizeVehicle(apiVehicle);
    expect(result.speed).toBe(0);
  });

  it('should clamp battery and fuel levels', () => {
    const apiVehicle = {
      id: '123',
      vehicleNumber: 'FL-001',
      batteryLevel: 150,
      fuelLevel: -10,
    };

    const result = normalizeVehicle(apiVehicle);
    expect(result.batteryLevel).toBe(100);
    expect(result.fuelLevel).toBe(0);
  });
});

describe('normalizeVehicleList', () => {
  it('should normalize array of vehicles', () => {
    const apiVehicles = [
      { id: '1', vehicleNumber: 'FL-001' },
      { id: '2', vehicleNumber: 'FL-002' },
    ];

    const result = normalizeVehicleList(apiVehicles);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });

  it('should filter out invalid vehicles', () => {
    const apiVehicles = [
      { id: '1', vehicleNumber: 'FL-001' },
      null,
      { id: '2', vehicleNumber: 'FL-002' },
      {},
    ];

    const result = normalizeVehicleList(apiVehicles);
    expect(result).toHaveLength(2);
  });

  it('should return empty array for invalid input', () => {
    expect(normalizeVehicleList(null)).toEqual([]);
    expect(normalizeVehicleList(undefined)).toEqual([]);
    expect(normalizeVehicleList('invalid')).toEqual([]);
  });
});

describe('normalizeStatus', () => {
  it('should normalize valid statuses', () => {
    expect(normalizeStatus('idle')).toBe('idle');
    expect(normalizeStatus('en_route')).toBe('en_route');
    expect(normalizeStatus('delivered')).toBe('delivered');
  });

  it('should handle status variations', () => {
    expect(normalizeStatus('en-route')).toBe('en_route');
    expect(normalizeStatus('enroute')).toBe('en_route');
    expect(normalizeStatus('in_transit')).toBe('en_route');
  });

  it('should handle case insensitivity', () => {
    expect(normalizeStatus('IDLE')).toBe('idle');
    expect(normalizeStatus('En_Route')).toBe('en_route');
  });

  it('should default to idle for invalid status', () => {
    expect(normalizeStatus('')).toBe('idle');
    expect(normalizeStatus(null)).toBe('idle');
    expect(normalizeStatus('unknown')).toBe('idle');
  });
});

describe('normalizePercentage', () => {
  it('should return value for valid percentage', () => {
    expect(normalizePercentage(50)).toBe(50);
    expect(normalizePercentage(0)).toBe(0);
    expect(normalizePercentage(100)).toBe(100);
  });

  it('should clamp values to 0-100 range', () => {
    expect(normalizePercentage(-10)).toBe(0);
    expect(normalizePercentage(150)).toBe(100);
  });

  it('should round to nearest integer', () => {
    expect(normalizePercentage(45.7)).toBe(46);
    expect(normalizePercentage(45.2)).toBe(45);
  });

  it('should return 0 for invalid values', () => {
    expect(normalizePercentage(null)).toBe(0);
    expect(normalizePercentage(undefined)).toBe(0);
    expect(normalizePercentage('invalid')).toBe(0);
  });
});

describe('normalizeStatistics', () => {
  it('should normalize valid statistics', () => {
    const apiStats = {
      total: 25,
      idle: 7,
      en_route: 14,
      delivered: 4,
      average_speed: 35,
      timestamp: '2026-09-04T12:00:00Z',
    };

    const result = normalizeStatistics(apiStats);

    expect(result).toEqual({
      total: 25,
      idle: 7,
      enRoute: 14,
      delivered: 4,
      averageSpeed: 35,
      timestamp: '2026-09-04T12:00:00Z',
    });
  });

  it('should return default statistics for invalid input', () => {
    const result = normalizeStatistics(null);
    expect(result.total).toBe(0);
    expect(result.idle).toBe(0);
    expect(result.enRoute).toBe(0);
    expect(result.delivered).toBe(0);
  });
});

describe('calculateStatistics', () => {
  it('should calculate statistics from vehicle list', () => {
    const vehicles = [
      { status: 'idle', speed: 0 },
      { status: 'en_route', speed: 50 },
      { status: 'en_route', speed: 60 },
      { status: 'delivered', speed: 0 },
    ];

    const result = calculateStatistics(vehicles);

    expect(result.total).toBe(4);
    expect(result.idle).toBe(1);
    expect(result.enRoute).toBe(2);
    expect(result.delivered).toBe(1);
    expect(result.averageSpeed).toBe(55); // (50 + 60) / 2
  });

  it('should exclude zero speeds from average', () => {
    const vehicles = [
      { status: 'en_route', speed: 60 },
      { status: 'idle', speed: 0 },
    ];

    const result = calculateStatistics(vehicles);
    expect(result.averageSpeed).toBe(60);
  });

  it('should return default for empty array', () => {
    const result = calculateStatistics([]);
    expect(result.total).toBe(0);
  });
});

describe('mergeVehicleUpdate', () => {
  it('should merge updates into existing vehicle', () => {
    const existing = {
      id: '123',
      vehicleNumber: 'FL-001',
      speed: 50,
      status: 'en_route',
    };

    const updates = {
      id: '123',
      vehicleNumber: 'FL-001',
      speed: 60,
      batteryLevel: 80,
    };

    const result = mergeVehicleUpdate(existing, updates);

    expect(result.speed).toBe(60);
    expect(result.batteryLevel).toBe(80);
    expect(result.id).toBe('123'); // Preserved
  });

  it('should return normalized updates if no existing vehicle', () => {
    const updates = {
      id: '123',
      vehicleNumber: 'FL-001',
      speed: 60,
    };

    const result = mergeVehicleUpdate(null, updates);
    expect(result.id).toBe('123');
  });
});

describe('isVehicleDataStale', () => {
  it('should return false for recent timestamp', () => {
    const recent = new Date().toISOString();
    expect(isVehicleDataStale(recent)).toBe(false);
  });

  it('should return true for old timestamp', () => {
    const old = new Date(Date.now() - 10 * 60 * 1000).toISOString(); // 10 minutes ago
    expect(isVehicleDataStale(old, 5)).toBe(true);
  });

  it('should return true for invalid timestamp', () => {
    expect(isVehicleDataStale(null)).toBe(true);
    expect(isVehicleDataStale('invalid')).toBe(true);
  });
});
