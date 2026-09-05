export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://case-study-26cf.onrender.com',
  WS_URL: import.meta.env.VITE_WS_URL || 'wss://case-study-26cf.onrender.com',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 2,
};

export const VEHICLE_STATUS = {
  IDLE: 'idle',
  EN_ROUTE: 'en_route',
  DELIVERED: 'delivered',
};

export const VEHICLE_STATUS_LABELS = {
  [VEHICLE_STATUS.IDLE]: 'Idle',
  [VEHICLE_STATUS.EN_ROUTE]: 'En Route',
  [VEHICLE_STATUS.DELIVERED]: 'Delivered',
};

export const VEHICLE_STATUS_COLORS = {
  [VEHICLE_STATUS.IDLE]: 'default',
  [VEHICLE_STATUS.EN_ROUTE]: 'info',
  [VEHICLE_STATUS.DELIVERED]: 'success',
};

export const VEHICLE_STATUS_DOT_COLORS = {
  all: '#9e9e9e',
  [VEHICLE_STATUS.IDLE]: '#9e9e9e',
  [VEHICLE_STATUS.EN_ROUTE]: '#2196f3',
  [VEHICLE_STATUS.DELIVERED]: '#4caf50',
};

export const FILTER_OPTIONS = {
  ALL: 'all',
  ...VEHICLE_STATUS,
};

export const WS_CONFIG = {
  RECONNECT_DELAYS: [1000, 2000, 4000, 8000, 16000, 30000],
  MAX_RECONNECT_DELAY: 30000,
  PING_INTERVAL: 30000,
};

export const QUERY_CONFIG = {
  STALE_TIME: 2 * 60 * 1000,
  GC_TIME: 5 * 60 * 1000,
  RETRY: 2,
  REFETCH_ON_WINDOW_FOCUS: false,
};

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  MODAL_ANIMATION_DURATION: 200,
};

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
};

export const APP_INFO = {
  NAME: 'Fleet Tracking Dashboard',
  SUBTITLE: 'Real-time vehicle monitoring & Tracking Core Fleet',
  VERSION: '1.0.0',
};

export const FEATURE_FLAGS = {
  ENABLE_DEBUG_MODE: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  STATS_REFRESH_INTERVAL: parseInt(import.meta.env.VITE_STATS_REFRESH_INTERVAL || '180000'),
};
