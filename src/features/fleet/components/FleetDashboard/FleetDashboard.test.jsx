import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FleetDashboard } from './FleetDashboard';
import * as useVehiclesHook from '../../hooks/useVehicles';
import * as useStatisticsHook from '../../hooks/useStatistics';

vi.mock('../../hooks/useVehicles');
vi.mock('../../hooks/useStatistics');

const mockVehicles = [
  {
    id: '1',
    vehicleNumber: 'FL-001',
    driverName: 'John',
    status: 'idle',
    speed: 0,
    location: null,
    destination: 'Warehouse',
    batteryLevel: 80,
    fuelLevel: 60,
  },
];

const mockStats = {
  total: 25,
  idle: 7,
  enRoute: 14,
  delivered: 4,
  averageSpeed: 45,
};

describe('FleetDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state', () => {
    vi.spyOn(useVehiclesHook, 'useVehicles').mockReturnValue({
      vehicles: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.spyOn(useStatisticsHook, 'useStatistics').mockReturnValue({
      statistics: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<FleetDashboard />);

    expect(screen.getByText('Loading fleet data...')).toBeInTheDocument();
  });

  it('should show error state when vehicles fail to load', () => {
    vi.spyOn(useVehiclesHook, 'useVehicles').mockReturnValue({
      vehicles: [],
      isLoading: false,
      isError: true,
      error: new Error('Network error'),
      refetch: vi.fn(),
    });
    vi.spyOn(useStatisticsHook, 'useStatistics').mockReturnValue({
      statistics: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<FleetDashboard />);

    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });

  it('should render dashboard when data loads successfully', () => {
    vi.spyOn(useVehiclesHook, 'useVehicles').mockReturnValue({
      vehicles: mockVehicles,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.spyOn(useStatisticsHook, 'useStatistics').mockReturnValue({
      statistics: mockStats,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<FleetDashboard />);

    expect(screen.getByTestId('fleet-dashboard')).toBeInTheDocument();
    expect(screen.getByText('Fleet Tracking Dashboard')).toBeInTheDocument();
  });

  it('should render statistics cards', () => {
    vi.spyOn(useVehiclesHook, 'useVehicles').mockReturnValue({
      vehicles: mockVehicles,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.spyOn(useStatisticsHook, 'useStatistics').mockReturnValue({
      statistics: mockStats,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<FleetDashboard />);

    expect(screen.getByTestId('statistics-cards')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('should render filter bar', () => {
    vi.spyOn(useVehiclesHook, 'useVehicles').mockReturnValue({
      vehicles: mockVehicles,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.spyOn(useStatisticsHook, 'useStatistics').mockReturnValue({
      statistics: mockStats,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<FleetDashboard />);

    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });

  it('should render vehicle list', () => {
    vi.spyOn(useVehiclesHook, 'useVehicles').mockReturnValue({
      vehicles: mockVehicles,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.spyOn(useStatisticsHook, 'useStatistics').mockReturnValue({
      statistics: mockStats,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<FleetDashboard />);

    expect(screen.getByTestId('vehicle-list')).toBeInTheDocument();
    expect(screen.getByText('FL-001')).toBeInTheDocument();
  });

  it('should show alert error for statistics failure', () => {
    vi.spyOn(useVehiclesHook, 'useVehicles').mockReturnValue({
      vehicles: mockVehicles,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.spyOn(useStatisticsHook, 'useStatistics').mockReturnValue({
      statistics: null,
      isLoading: false,
      isError: true,
      error: new Error('Stats error'),
      refetch: vi.fn(),
    });

    render(<FleetDashboard />);

    expect(screen.getByText('Failed to load statistics')).toBeInTheDocument();
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });
});
