export const normalizeError = (error) => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return {
      message: 'Network error. Please check your internet connection.',
      status: 0,
      code: 'NETWORK_ERROR',
    };
  }

  if (error.name === 'AbortError' || error.message.includes('timeout')) {
    return {
      message: 'Request timed out. Please try again.',
      status: 408,
      code: 'TIMEOUT_ERROR',
    };
  }

  if (error.response) {
    const { status, statusText } = error.response;

    return {
      message: getErrorMessage(status, error.message || statusText),
      status,
      code: `HTTP_${status}`,
    };
  }

  return {
    message: error.message || 'An unexpected error occurred. Please try again.',
    status: error.status || 500,
    code: error.code || 'UNKNOWN_ERROR',
  };
};

export const getErrorMessage = (status, fallback = '') => {
  const messages = {
    400: 'Invalid request. Please check your input.',
    401: 'Unauthorized. Please log in again.',
    403: 'Access denied. You don\'t have permission to access this resource.',
    404: 'Resource not found.',
    408: 'Request timeout. Please try again.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. The server is temporarily unavailable.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. The server took too long to respond.',
  };

  return messages[status] || fallback || 'Something went wrong. Please try again.';
};

export const isRetryableError = (error) => {
  const retryableCodes = [408, 429, 500, 502, 503, 504];
  return retryableCodes.includes(error.status) || error.code === 'NETWORK_ERROR';
};

export const logError = (context, error) => {
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error);
  }
};

export const createError = (message, details = {}) => {
  const error = new Error(message);
  Object.assign(error, details);
  return error;
};
