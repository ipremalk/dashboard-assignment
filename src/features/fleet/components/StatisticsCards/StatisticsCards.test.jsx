import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatisticsCards } from './StatisticsCards';

const mockStats = {
  total: 25,
  idle: 7,
  enRoute: 14,
  delivered: 4,
  averageSpeed: 45,
  timestamp: '2026-09-04T12:00:00Z',
};

describe('StatisticsCards', () => {
  it('should render all statistics cards', () => {
    render(<StatisticsCards statistics={mockStats} />);

    expect(screen.getByText('Total Vehicles')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Idle')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('En Route')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Avg Speed')).toBeInTheDocument();
    expect(screen.getByText('45 mph')).toBeInTheDocument();
  });

  it('should render with zero values when statistics are zero', () => {
    const zeroStats = {
      total: 0,
      idle: 0,
      enRoute: 0,
      delivered: 0,
      averageSpeed: 0,
    };

    render(<StatisticsCards statistics={zeroStats} />);

    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);
  });

  it('should handle missing fields with defaults', () => {
    const partialStats = {
      total: 10,
    };

    render(<StatisticsCards statistics={partialStats} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('0 mph')).toBeInTheDocument();
  });

  it('should not render when statistics is null', () => {
    const { container } = render(<StatisticsCards statistics={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when statistics is undefined', () => {
    const { container } = render(<StatisticsCards statistics={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render with correct grid layout', () => {
    render(<StatisticsCards statistics={mockStats} />);

    const container = screen.getByTestId('statistics-cards');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('MuiGrid-container');
  });

  it('should display 5 cards', () => {
    const { container } = render(<StatisticsCards statistics={mockStats} />);

    const cards = container.querySelectorAll('.MuiCard-root');
    expect(cards).toHaveLength(5);
  });
});
