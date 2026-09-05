

export const isValidNumber = (value) => {
  return value !== null && value !== undefined && !isNaN(Number(value));
};

export const isInRange = (value, min, max) => {
  if (!isValidNumber(value)) return false;
  const num = Number(value);
  return num >= min && num <= max;
};

export const isValidVehicle = (vehicle) => {
  if (!vehicle || typeof vehicle !== 'object') return false;

  const requiredFields = ['id', 'vehicleNumber', 'driverName', 'status'];
  return requiredFields.every((field) => vehicle[field] !== undefined);
};

export const isValidLocation = (location) => {
  if (!location || typeof location !== 'object') return false;
  return isValidNumber(location.lat) && isValidNumber(location.lng);
};

export const isValidStatus = (status) => {
  const validStatuses = ['idle', 'en_route', 'delivered'];
  return validStatuses.includes(status);
};

export const sanitizePercentage = (value) => {
  if (!isValidNumber(value)) return 0;
  const num = Number(value);
  return Math.max(0, Math.min(100, num));
};

export const sanitizeSpeed = (value) => {
  if (!isValidNumber(value)) return 0;
  const num = Number(value);
  return Math.max(0, num);
};
