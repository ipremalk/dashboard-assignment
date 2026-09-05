import { Box, Typography, Chip, Button } from '@mui/material';
import PropTypes from 'prop-types';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WifiIcon from '@mui/icons-material/Wifi';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { VEHICLE_STATUS, VEHICLE_STATUS_DOT_COLORS } from '@config/constants';
import { StatCard } from '@components/common/StatCard';

export const Sidebar = ({ filters, counts, statistics, onStatusChange, timeSinceUpdate, isConnected, connectionStatus }) => {
  const filterOptions = [
    { label: 'All', value: 'all', count: counts?.total || 0 },
    { label: 'Idle', value: VEHICLE_STATUS.IDLE, count: counts?.idle || 0 },
    { label: 'En Route', value: VEHICLE_STATUS.EN_ROUTE, count: counts?.en_route || 0 },
    { label: 'Delivered', value: VEHICLE_STATUS.DELIVERED, count: counts?.delivered || 0 },
  ];

  return (
    <Box
      sx={{
        width: '18.75rem',
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <LocalShippingIcon sx={{ fontSize: '2.25rem', color: 'success.main' }} />
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2, mb: 0.2, fontSize: '1rem' }}>
              Fleet Tracking Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.5rem', lineHeight: 1 }}>
              Real-time vehicle monitoring • LogiNext Case Study
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<WifiIcon />}
        sx={{
          mb: 2,
          py: 1.2,
          borderRadius: 2,
          borderColor: isConnected ? 'success.main' : 'divider',
          color: isConnected ? 'success.main' : 'text.secondary',
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          '&:hover': {
            borderColor: isConnected ? 'success.main' : 'divider',
            bgcolor: 'transparent',
          },
        }}
      >
        {isConnected ? 'Live Updates Active' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
      </Button>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
          <TimelineIcon sx={{ fontSize: '1.125rem' }} />
          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '0.95rem' }}>
            Filter by Status
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.8 }}>
          {filterOptions.map((option) => {
            return (
              <Button
                key={option.value}
                variant={filters.status === option.value ? 'contained' : 'outlined'}
                onClick={() => onStatusChange(option.value)}
                sx={{
                  py: 0.8,
                  px: 1.2,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  justifyContent: 'flex-start',
                  borderColor: filters.status === option.value ? 'primary.main' : 'divider',
                  color: filters.status === option.value ? 'white' : 'text.primary',
                  minHeight: '2.25rem',
                  whiteSpace: 'nowrap',
                  '& .MuiButton-startIcon': {
                    marginRight: '0.375rem',
                    marginLeft: 0,
                  },
                }}
                startIcon={
                  <Box
                    sx={{
                      width: '0.4375rem',
                      height: '0.4375rem',
                      borderRadius: '50%',
                      bgcolor: filters.status === option.value ? 'white' : VEHICLE_STATUS_DOT_COLORS[option.value],
                      flexShrink: 0,
                    }}
                  />
                }
              >
                {option.label} ({option.count})
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
          <AccessTimeIcon sx={{ fontSize: '1.125rem' }} />
          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '0.95rem' }}>
            Fleet Statistics
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1.5 }}>
          <StatCard label="Total Fleet" value={statistics?.total || 0} icon={GroupIcon} variant="compact" />
          <StatCard label="Avg Speed" value={statistics?.averageSpeed || 0} icon={TrendingUpIcon} variant="compact" />
          <StatCard label="Moving" value={statistics?.enRoute || 0} icon={DirectionsRunIcon} variant="compact" />
          <StatCard label="Last Update" value={timeSinceUpdate} icon={AccessTimeIcon} variant="compact" />
        </Box>

        <Box
          sx={{
            py: 1.2,
            textAlign: 'center',
            bgcolor: 'action.hover',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: '0.875rem', color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {timeSinceUpdate === '—' ? 'Waiting for updates...' : `Updated ${timeSinceUpdate} ago`} • Next update in ~3 min
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  counts: PropTypes.object,
  statistics: PropTypes.object,
  onStatusChange: PropTypes.func.isRequired,
  timeSinceUpdate: PropTypes.string,
  isConnected: PropTypes.bool,
  connectionStatus: PropTypes.string,
};

export default Sidebar;
