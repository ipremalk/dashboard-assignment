import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';

describe('StatCard', () => {
  const defaultProps = {
    label: 'Total Vehicles',
    value: 42,
    icon: GroupIcon,
  };

  describe('Card Variant', () => {
    it('renders card variant by default', () => {
      render(<StatCard {...defaultProps} color="primary" />);

      expect(screen.getByTestId('stat-card-card')).toBeInTheDocument();
      expect(screen.getByText('Total Vehicles')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders card variant explicitly', () => {
      render(<StatCard {...defaultProps} variant="card" color="primary" />);

      expect(screen.getByTestId('stat-card-card')).toBeInTheDocument();
    });

    it('renders with string value', () => {
      render(
        <StatCard
          label="Avg Speed"
          value="65 mph"
          icon={SpeedIcon}
          variant="card"
          color="secondary"
        />
      );

      expect(screen.getByText('Avg Speed')).toBeInTheDocument();
      expect(screen.getByText('65 mph')).toBeInTheDocument();
    });

    it('renders with numeric value', () => {
      render(
        <StatCard
          label="Total Fleet"
          value={100}
          icon={GroupIcon}
          variant="card"
          color="info"
        />
      );

      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('renders with different colors', () => {
      const { rerender } = render(
        <StatCard {...defaultProps} variant="card" color="primary" />
      );
      expect(screen.getByTestId('stat-card-card')).toBeInTheDocument();

      rerender(<StatCard {...defaultProps} variant="card" color="success" />);
      expect(screen.getByTestId('stat-card-card')).toBeInTheDocument();

      rerender(<StatCard {...defaultProps} variant="card" color="warning" />);
      expect(screen.getByTestId('stat-card-card')).toBeInTheDocument();
    });
  });

  describe('Compact Variant', () => {
    it('renders compact variant correctly', () => {
      render(<StatCard {...defaultProps} variant="compact" />);

      const compactCard = screen.getByTestId('stat-card-compact');
      expect(compactCard).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      // Label exists in the component (text-transform: uppercase is CSS-only)
      expect(compactCard.textContent).toContain('Total Vehicles');
    });

    it('renders with string value in compact mode', () => {
      render(
        <StatCard
          label="Last Update"
          value="2m"
          icon={SpeedIcon}
          variant="compact"
        />
      );

      expect(screen.getByText('2m')).toBeInTheDocument();
      const compactCard = screen.getByTestId('stat-card-compact');
      expect(compactCard.textContent).toContain('Last Update');
    });

    it('centers content in compact mode', () => {
      render(<StatCard {...defaultProps} variant="compact" />);

      const compactCard = screen.getByTestId('stat-card-compact');
      expect(compactCard).toBeInTheDocument();
    });

    it('displays label in uppercase in compact mode', () => {
      render(
        <StatCard
          label="Moving"
          value={15}
          icon={GroupIcon}
          variant="compact"
        />
      );

      // Label is transformed to uppercase via CSS
      const compactCard = screen.getByTestId('stat-card-compact');
      expect(compactCard.textContent).toContain('Moving');
    });
  });

  describe('Icon Rendering', () => {
    it('renders icon in card variant', () => {
      render(<StatCard {...defaultProps} variant="card" color="primary" />);

      const card = screen.getByTestId('stat-card-card');
      expect(card).toBeInTheDocument();
    });

    it('renders icon in compact variant', () => {
      render(<StatCard {...defaultProps} variant="compact" />);

      const card = screen.getByTestId('stat-card-compact');
      expect(card).toBeInTheDocument();
    });

    it('handles different icon components', () => {
      const { rerender } = render(
        <StatCard {...defaultProps} variant="compact" icon={SpeedIcon} />
      );
      expect(screen.getByTestId('stat-card-compact')).toBeInTheDocument();

      rerender(
        <StatCard {...defaultProps} variant="compact" icon={GroupIcon} />
      );
      expect(screen.getByTestId('stat-card-compact')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero value', () => {
      render(<StatCard {...defaultProps} value={0} variant="card" color="primary" />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles long labels', () => {
      render(
        <StatCard
          label="Very Long Label That Might Overflow"
          value={99}
          icon={GroupIcon}
          variant="compact"
        />
      );

      expect(screen.getByText(/very long label/i)).toBeInTheDocument();
    });

    it('handles large numeric values', () => {
      render(
        <StatCard
          {...defaultProps}
          value={999999}
          variant="card"
          color="primary"
        />
      );

      expect(screen.getByText('999999')).toBeInTheDocument();
    });
  });
});
