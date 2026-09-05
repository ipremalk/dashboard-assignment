import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { VEHICLE_STATUS } from '@config/constants';

const STATUS_CONFIG = {
  [VEHICLE_STATUS.IDLE]: { label: 'Idle', color: 'warning' },
  [VEHICLE_STATUS.EN_ROUTE]: { label: 'En Route', color: 'info' },
  [VEHICLE_STATUS.DELIVERED]: { label: 'Delivered', color: 'success' },
};

export const StatusBadge = ({ status, size = 'small', variant = 'filled' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[VEHICLE_STATUS.IDLE];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant={variant}
      data-testid={`status-badge-${status}`}
    />
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(VEHICLE_STATUS)).isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  variant: PropTypes.oneOf(['filled', 'outlined']),
};

export default StatusBadge;
