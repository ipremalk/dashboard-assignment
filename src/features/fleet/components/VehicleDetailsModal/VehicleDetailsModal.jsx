import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import SpeedIcon from '@mui/icons-material/Speed';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DetailBox } from '@components/common/DetailBox';
import { formatTimestamp } from '@utils/formatters';
import { VEHICLE_STATUS_COLORS } from '@config/constants';
import { FLEX_PATTERNS } from '@theme/patterns';

export const VehicleDetailsModal = ({ vehicle, open, onClose }) => {
  if (!vehicle) return null;

  const statusIcons = {
    idle: CheckCircleIcon,
    en_route: CheckCircleIcon,
    delivered: CheckCircleIcon,
  };

  const StatusIcon = statusIcons[vehicle.status] || CheckCircleIcon;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ ...FLEX_PATTERNS.spaceBetweenStart, mb: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <LocalShippingIcon sx={{ fontSize: '1.75rem' }} />
              <Typography variant="h5" fontWeight="bold">
                {vehicle.vehicleNumber}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 4.5 }}>
              <PersonIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {vehicle.driverName} • {vehicle.status.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ mt: -1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <DetailBox
              icon={StatusIcon}
              label="Status"
              value={
                <Chip
                  icon={<CheckCircleIcon sx={{ fontSize: '1rem' }} />}
                  label={vehicle.status.toUpperCase()}
                  color={VEHICLE_STATUS_COLORS[vehicle.status]}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              }
            />
            <DetailBox
              icon={SpeedIcon}
              label="Current Speed"
              value={`${vehicle.speed} mph`}
            />
            <DetailBox
              icon={PersonIcon}
              label="Driver"
              value={vehicle.driverName}
            />
            <DetailBox
              icon={PhoneIcon}
              label="Phone"
              value={vehicle.driverPhone || '—'}
            />
            <DetailBox
              icon={PlaceIcon}
              label="Destination"
              value={vehicle.destination}
            />
            <DetailBox
              icon={MyLocationIcon}
              label="Location"
              value={
                vehicle.location
                  ? `${vehicle.location.lat.toFixed(6)}, ${vehicle.location.lng.toFixed(6)}`
                  : '—'
              }
            />
            <DetailBox
              icon={BatteryChargingFullIcon}
              label="Battery Level"
              value={`${vehicle.batteryLevel}%`}
              showProgress={true}
              progressValue={vehicle.batteryLevel}
            />
            <DetailBox
              icon={LocalGasStationIcon}
              label="Fuel Level"
              value={`${vehicle.fuelLevel}%`}
              showProgress={true}
              progressValue={vehicle.fuelLevel}
            />
            <DetailBox
              icon={AccessTimeIcon}
              label="Last Updated"
              value={formatTimestamp(vehicle.lastUpdated, 'dd/MM/yyyy, HH:mm:ss')}
              fullWidth={true}
            />
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

VehicleDetailsModal.propTypes = {
  vehicle: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VehicleDetailsModal;
