import PropTypes from 'prop-types';
import { Box, LinearProgress, Typography } from '@mui/material';
import { FLEX_PATTERNS } from '@theme/patterns';

const getColor = (value) => {
  if (value <= 20) return 'error';
  if (value <= 50) return 'warning';
  return 'success';
};

export const PercentageBar = ({ value, label, showValue = true, size = 'medium' }) => {
  const color = getColor(value);
  const height = size === 'small' ? 6 : 8;

  return (
    <Box data-testid="percentage-bar">
      {(label || showValue) && (
        <Box sx={{ ...FLEX_PATTERNS.spaceBetween, mb: 0.5 }}>
          {label && (
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography variant="caption" fontWeight="medium">
              {value}%
            </Typography>
          )}
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={value}
        color={color}
        sx={{ height, borderRadius: 1 }}
      />
    </Box>
  );
};

PercentageBar.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
};

export default PercentageBar;
