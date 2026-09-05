import { VEHICLE_STATUS } from '@config/constants';

export const filterByStatus = (vehicles, status) => {
  if (!Array.isArray(vehicles)) return [];
  if (!status || status === 'all') return vehicles;

  const validStatuses = Object.values(VEHICLE_STATUS);
  if (!validStatuses.includes(status)) return vehicles;

  return vehicles.filter((v) => v.status === status);
};

export const searchVehicles = (vehicles, query) => {
  if (!Array.isArray(vehicles)) return [];
  if (!query || typeof query !== 'string' || query.trim() === '') return vehicles;

  const term = query.toLowerCase().trim();

  return vehicles.filter((v) => {
    const number = (v.vehicleNumber || '').toLowerCase();
    const driver = (v.driverName || '').toLowerCase();
    const dest = (v.destination || '').toLowerCase();

    return number.includes(term) || driver.includes(term) || dest.includes(term);
  });
};

export const sortVehicles = (vehicles, field, direction = 'asc') => {
  if (!Array.isArray(vehicles)) return [];
  if (!field) return [...vehicles];

  const sorted = [...vehicles];

  sorted.sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    let cmp = 0;
    if (aVal > bVal) cmp = 1;
    else if (aVal < bVal) cmp = -1;

    return direction === 'desc' ? -cmp : cmp;
  });

  return sorted;
};

export const groupByStatus = (vehicles) => {
  if (!Array.isArray(vehicles)) {
    return { idle: [], en_route: [], delivered: [] };
  }

  const grouped = { idle: [], en_route: [], delivered: [] };

  vehicles.forEach((v) => {
    const status = v.status || 'idle';
    if (grouped[status]) grouped[status].push(v);
  });

  return grouped;
};

export const getVehiclesWithLowLevels = (vehicles, threshold = 20) => {
  if (!Array.isArray(vehicles)) return { lowBattery: [], lowFuel: [] };

  const lowBattery = vehicles.filter((v) => v.batteryLevel != null && v.batteryLevel < threshold);
  const lowFuel = vehicles.filter((v) => v.fuelLevel != null && v.fuelLevel < threshold);

  return { lowBattery, lowFuel };
};

export const findVehicleById = (vehicles, vehicleId) => {
  if (!Array.isArray(vehicles) || !vehicleId) return null;
  return vehicles.find((v) => v.id === String(vehicleId)) || null;
};

export const getActiveVehicles = (vehicles) => filterByStatus(vehicles, VEHICLE_STATUS.EN_ROUTE);

export const getIdleVehicles = (vehicles) => filterByStatus(vehicles, VEHICLE_STATUS.IDLE);

export const applyFilters = (vehicles, filters = {}) => {
  if (!Array.isArray(vehicles)) return [];

  let result = vehicles;

  if (filters.status) result = filterByStatus(result, filters.status);
  if (filters.search) result = searchVehicles(result, filters.search);
  if (filters.sortBy) result = sortVehicles(result, filters.sortBy, filters.sortDirection || 'asc');

  return result;
};

export const getVehicleCountsByStatus = (vehicles) => {
  if (!Array.isArray(vehicles)) {
    return { total: 0, idle: 0, en_route: 0, delivered: 0 };
  }

  const grouped = groupByStatus(vehicles);
  return {
    total: vehicles.length,
    idle: grouped.idle.length,
    en_route: grouped.en_route.length,
    delivered: grouped.delivered.length,
  };
};
