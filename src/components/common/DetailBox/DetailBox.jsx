import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { PercentageBar } from '../PercentageBar';
import { DETAIL_BOX, FLEX_PATTERNS, TEXT_PATTERNS } from '@theme/patterns';

export const DetailBox = ({
  icon: Icon,
  label,
  value,
  fullWidth = false,
  showProgress = false,
  progressValue = 0
}) => (
  <Box
    sx={{
      ...DETAIL_BOX,
      gridColumn: fullWidth ? '1 / -1' : 'auto',
    }}
    data-testid="detail-box"
  >
    <Box sx={{ ...FLEX_PATTERNS.centerStart, gap: 0.5, mb: 0.5 }}>
      <Icon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={TEXT_PATTERNS.uppercaseLabel}
      >
        {label}
      </Typography>
    </Box>
    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
      {value}
    </Typography>
    {showProgress && (
      <Box sx={{ mt: 1 }}>
        <PercentageBar value={progressValue} size="small" showValue={false} />
      </Box>
    )}
  </Box>
);

DetailBox.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  showProgress: PropTypes.bool,
  progressValue: PropTypes.number,
};

export default DetailBox;
