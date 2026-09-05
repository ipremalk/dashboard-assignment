import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { COMBINED_PATTERNS } from '@theme/patterns';

export const EmptyState = ({ message, description, action }) => {
  return (
    <Box
      sx={{
        ...COMBINED_PATTERNS.loadingState,
        p: 3,
      }}
      data-testid="empty-state"
    >
      <InboxIcon sx={{ fontSize: '4rem', color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {message || 'No data available'}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
      )}
      {action && <Box mt={2}>{action}</Box>}
    </Box>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
};

export default EmptyState;
