import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FLEX_PATTERNS, TEXT_PATTERNS, CARD_PATTERNS, ICON_BOX } from '@theme/patterns';

export const StatCard = ({
  label,
  value,
  icon: Icon,
  variant = 'card',
  color = 'primary',
}) => {
  if (variant === 'compact') {
    return (
      <Box
        sx={{
          ...CARD_PATTERNS.bordered,
          ...FLEX_PATTERNS.columnCenter,
          p: 1,
          textAlign: 'center',
          minHeight: '4.375rem',
        }}
        data-testid="stat-card-compact"
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5, fontSize: '1.5rem', lineHeight: 1 }}>
          {value}
        </Typography>
        <Box sx={{ ...FLEX_PATTERNS.centerCenter, gap: 0.3 }}>
          <Icon sx={{ fontSize: '0.6875rem', color: 'text.secondary' }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ...TEXT_PATTERNS.uppercaseLabel, fontSize: '0.6rem' }}
          >
            {label}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Card sx={{ height: '100%' }} data-testid="stat-card-card">
      <CardContent>
        <Box sx={FLEX_PATTERNS.spaceBetweenStart}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {label}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="medium">
              {value}
            </Typography>
          </Box>
          <Box sx={ICON_BOX.colored(color)}>
            <Icon sx={{ fontSize: '1.75rem' }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  variant: PropTypes.oneOf(['card', 'compact']),
  color: PropTypes.string,
};

export default StatCard;
