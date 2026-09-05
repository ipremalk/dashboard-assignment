import { format, parseISO, isValid } from 'date-fns';

export const formatSpeed = (speed) => {
  if (speed === null || speed === undefined) return '—';
  const numSpeed = Number(speed);
  if (isNaN(numSpeed)) return '—';
  return `${numSpeed} mph`;
};

export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '—';
  const numValue = Number(value);
  if (isNaN(numValue)) return '—';
  return `${Math.round(numValue)}%`;
};

export const formatCoordinate = (coordinate, precision = 6) => {
  if (coordinate === null || coordinate === undefined) return '—';
  const numCoord = Number(coordinate);
  if (isNaN(numCoord)) return '—';
  return numCoord.toFixed(precision);
};

export const formatLocation = (location) => {
  if (!location || !location.lat || !location.lng) return '—';
  return `${formatCoordinate(location.lat)}, ${formatCoordinate(location.lng)}`;
};

export const formatTimestamp = (timestamp, formatString = 'dd/MM/yyyy, HH:mm:ss') => {
  if (!timestamp) return '—';

  try {
    const date = typeof timestamp === 'string' ? parseISO(timestamp) : new Date(timestamp);
    if (!isValid(date)) return '—';
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return '—';
  }
};

export const formatTime = (timestamp) => {
  return formatTimestamp(timestamp, 'HH:mm:ss');
};

export const formatDate = (timestamp) => {
  return formatTimestamp(timestamp, 'dd/MM/yyyy');
};

export const formatPhone = (phone) => {
  if (!phone) return '—';
  return phone;
};

export const formatMissing = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  return value;
};

export const formatStatus = (status) => {
  if (!status) return '—';

  const statusMap = {
    'idle': 'Idle',
    'en_route': 'En Route',
    'delivered': 'Delivered',
  };

  return statusMap[status] || status;
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '—';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
