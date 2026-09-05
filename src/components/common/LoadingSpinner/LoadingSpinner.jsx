import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingSpinner = ({ message, size = 'medium' }) => {
  const sizeMap = { small: 24, medium: 40, large: 60 };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
      }}
      data-testid="loading-spinner"
    >
      <CircularProgress size={sizeMap[size]} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default LoadingSpinner;
