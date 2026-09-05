import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Link,
  Box,
} from '@mui/material';
import { formatTimestamp } from '@utils/formatters';
import { VehicleDetailsModal } from '../VehicleDetailsModal';
import { VEHICLE_STATUS_COLORS } from '@config/constants';
import { FLEX_PATTERNS, TEXT_PATTERNS } from '@theme/patterns';

const VehicleRow = ({ vehicle, onClick }) => {
  return (
    <TableRow hover data-testid={`vehicle-row-${vehicle.id}`} sx={{ cursor: 'pointer' }}>
      <TableCell>
        <Link
          component="button"
          variant="body2"
          onClick={() => onClick(vehicle)}
          sx={{ fontWeight: 'medium', textDecoration: 'none' }}
        >
          {vehicle.vehicleNumber}
        </Link>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{vehicle.driverName}</Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={vehicle.status.toUpperCase()}
          color={VEHICLE_STATUS_COLORS[vehicle.status]}
          size="small"
          sx={{ minWidth: 90, fontWeight: 'medium' }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2">{vehicle.speed} mph</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{vehicle.destination}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{vehicle.estimatedArrival ? formatTimestamp(vehicle.estimatedArrival, 'HH:mm') : '—'}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{formatTimestamp(vehicle.lastUpdated, 'dd/MM/yyyy, HH:mm:ss')}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={TEXT_PATTERNS.monospace}>
          {vehicle.location ? `${vehicle.location.lat.toFixed(4)}, ${vehicle.location.lng.toFixed(4)}` : '—'}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

VehicleRow.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    vehicleNumber: PropTypes.string.isRequired,
    driverName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    speed: PropTypes.number,
    location: PropTypes.object,
    destination: PropTypes.string,
    estimatedArrival: PropTypes.string,
    lastUpdated: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export const VehicleList = ({ vehicles = [], totalCount }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVehicle(null);
  };

  if (vehicles.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">No vehicles to display</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Box sx={{ ...FLEX_PATTERNS.spaceBetween, mb: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          Vehicles ({totalCount || vehicles.length})
        </Typography>
        <Chip label="Live" color="success" size="small" />
      </Box>
      <TableContainer component={Paper} data-testid="vehicle-list">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Vehicle</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Driver</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Speed</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Destination</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ETA</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Last Update</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <VehicleRow key={vehicle.id} vehicle={vehicle} onClick={handleVehicleClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <VehicleDetailsModal
        vehicle={selectedVehicle}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

VehicleList.propTypes = {
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      vehicleNumber: PropTypes.string.isRequired,
    })
  ),
  totalCount: PropTypes.number,
};

export default VehicleList;
