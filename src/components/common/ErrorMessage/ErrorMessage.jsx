import PropTypes from 'prop-types';
import { Box, Typography, Button, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import { COMBINED_PATTERNS } from '@theme/patterns';

export const ErrorMessage = ({ message, onRetry, variant = 'centered' }) => {
  if (variant === 'alert') {
    return (
      <Alert
        severity="error"
        data-testid="error-message"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          )
        }
      >
        {message || 'An error occurred. Please try again.'}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        ...COMBINED_PATTERNS.loadingState,
        p: 3,
      }}
      data-testid="error-message"
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: '3rem', mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {message || 'An error occurred while loading data. Please try again.'}
      </Typography>
      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
  variant: PropTypes.oneOf(['alert', 'centered']),
};

export default ErrorMessage;
