import { isValidNumber, isValidLocation, isValidStatus } from '@utils/validationUtils';

export const normalizeVehicle = (apiVehicle) => {
  if (!apiVehicle || typeof apiVehicle !== 'object') {
    return null;
  }

  if (!apiVehicle.id || !apiVehicle.vehicleNumber) {
    return null;
  }

  return {
    id: String(apiVehicle.id),
    vehicleNumber: String(apiVehicle.vehicleNumber),
    driverName: apiVehicle.driverName || 'Unknown Driver',
    status: normalizeStatus(apiVehicle.status),

    location: isValidLocation(apiVehicle.currentLocation)
      ? {
          lat: Number(apiVehicle.currentLocation.lat),
          lng: Number(apiVehicle.currentLocation.lng),
        }
      : null,

    speed: isValidNumber(apiVehicle.speed) ? Math.max(0, Number(apiVehicle.speed)) : 0,
    batteryLevel: normalizePercentage(apiVehicle.batteryLevel),
    fuelLevel: normalizePercentage(apiVehicle.fuelLevel),

    destination: apiVehicle.destination || 'Unknown Destination',
    driverPhone: apiVehicle.driverPhone || null,

    lastUpdated: apiVehicle.lastUpdated || new Date().toISOString(),
    estimatedArrival: apiVehicle.estimatedArrival || null,
  };
};

export const normalizeVehicleList = (apiVehicles) => {
  if (!Array.isArray(apiVehicles)) return [];

  return apiVehicles.map(normalizeVehicle).filter(Boolean);
};

export const normalizeStatus = (status) => {
  if (!status || typeof status !== 'string') return 'idle';

  const normalized = status.toLowerCase().trim();
  const validStatuses = ['idle', 'en_route', 'delivered'];

  if (validStatuses.includes(normalized)) return normalized;

  const statusMap = {
    'en-route': 'en_route',
    'enroute': 'en_route',
    'in_transit': 'en_route',
    'transit': 'en_route',
  };

  return statusMap[normalized] || 'idle';
};

export const normalizePercentage = (value) => {
  if (!isValidNumber(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(Number(value))));
};

export const normalizeStatistics = (apiStats) => {
  if (!apiStats || typeof apiStats !== 'object') {
    return getDefaultStatistics();
  }

  return {
    total: isValidNumber(apiStats.total) ? Math.max(0, Number(apiStats.total)) : 0,
    idle: isValidNumber(apiStats.idle) ? Math.max(0, Number(apiStats.idle)) : 0,
    enRoute: isValidNumber(apiStats.en_route) ? Math.max(0, Number(apiStats.en_route)) : 0,
    delivered: isValidNumber(apiStats.delivered) ? Math.max(0, Number(apiStats.delivered)) : 0,
    averageSpeed: isValidNumber(apiStats.average_speed)
      ? Math.max(0, Number(apiStats.average_speed))
      : 0,
    timestamp: apiStats.timestamp || new Date().toISOString(),
  };
};

export const getDefaultStatistics = () => ({
  total: 0,
  idle: 0,
  enRoute: 0,
  delivered: 0,
  averageSpeed: 0,
  timestamp: new Date().toISOString(),
});

export const calculateStatistics = (vehicles) => {
  if (!Array.isArray(vehicles) || vehicles.length === 0) {
    return getDefaultStatistics();
  }

  const stats = {
    total: vehicles.length,
    idle: 0,
    enRoute: 0,
    delivered: 0,
    averageSpeed: 0,
    timestamp: new Date().toISOString(),
  };

  let totalSpeed = 0;
  let speedCount = 0;

  vehicles.forEach((vehicle) => {
    switch (vehicle.status) {
      case 'idle':
        stats.idle++;
        break;
      case 'en_route':
        stats.enRoute++;
        break;
      case 'delivered':
        stats.delivered++;
        break;
    }

    if (isValidNumber(vehicle.speed) && vehicle.speed > 0) {
      totalSpeed += vehicle.speed;
      speedCount++;
    }
  });

  stats.averageSpeed = speedCount > 0 ? Math.round(totalSpeed / speedCount) : 0;

  return stats;
};

export const mergeVehicleUpdate = (existingVehicle, updates) => {
  if (!existingVehicle) return normalizeVehicle(updates);
  if (!updates) return existingVehicle;

  const normalizedUpdates = normalizeVehicle(updates);
  if (!normalizedUpdates) return existingVehicle;

  return {
    ...existingVehicle,
    ...normalizedUpdates,
    id: existingVehicle.id,
    vehicleNumber: existingVehicle.vehicleNumber,
  };
};

export const isVehicleDataStale = (lastUpdated, maxAgeMinutes = 5) => {
  if (!lastUpdated) return true;

  try {
    const lastTime = new Date(lastUpdated).getTime();
    if (isNaN(lastTime)) return true;
    const ageMinutes = (Date.now() - lastTime) / (1000 * 60);
    return ageMinutes > maxAgeMinutes;
  } catch {
    return true;
  }
};
