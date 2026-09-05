import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { StatCard } from '@components/common/StatCard';

export const StatisticsCards = ({ statistics }) => {
  if (!statistics) return null;

  const cards = [
    {
      label: 'Total Vehicles',
      value: statistics.total || 0,
      icon: DirectionsCarIcon,
      color: 'primary',
    },
    {
      label: 'Idle',
      value: statistics.idle || 0,
      icon: HourglassEmptyIcon,
      color: 'warning',
    },
    {
      label: 'En Route',
      value: statistics.enRoute || 0,
      icon: LocalShippingIcon,
      color: 'info',
    },
    {
      label: 'Delivered',
      value: statistics.delivered || 0,
      icon: CheckCircleIcon,
      color: 'success',
    },
    {
      label: 'Avg Speed',
      value: `${statistics.averageSpeed || 0} mph`,
      icon: SpeedIcon,
      color: 'secondary',
    },
  ];

  return (
    <Grid container spacing={3} data-testid="statistics-cards">
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={card.label}>
          <StatCard {...card} variant="card" />
        </Grid>
      ))}
    </Grid>
  );
};

StatisticsCards.propTypes = {
  statistics: PropTypes.shape({
    total: PropTypes.number,
    idle: PropTypes.number,
    enRoute: PropTypes.number,
    delivered: PropTypes.number,
    averageSpeed: PropTypes.number,
    timestamp: PropTypes.string,
  }),
};

export default StatisticsCards;
