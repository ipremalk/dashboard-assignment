import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VehicleList } from './VehicleList';

const mockVehicles = [
  {
    id: '1',
    vehicleNumber: 'FL-001',
    driverName: 'John Doe',
    status: 'idle',
    speed: 0,
    location: { lat: 37.7749, lng: -122.4194 },
    destination: 'Warehouse A',
    batteryLevel: 80,
    fuelLevel: 60,
  },
  {
    id: '2',
    vehicleNumber: 'FL-002',
    driverName: 'Jane Smith',
    status: 'en_route',
    speed: 55,
    location: { lat: 37.7849, lng: -122.4294 },
    destination: 'Downtown',
    batteryLevel: 15,
    fuelLevel: 40,
  },
];

describe('VehicleList', () => {
  it('should render table with vehicles', () => {
    render(<VehicleList vehicles={mockVehicles} />);

    expect(screen.getByTestId('vehicle-list')).toBeInTheDocument();
    expect(screen.getByText('FL-001')).toBeInTheDocument();
    expect(screen.getByText('FL-002')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render all table headers', () => {
    render(<VehicleList vehicles={mockVehicles} />);

    expect(screen.getByText('Vehicle #')).toBeInTheDocument();
    expect(screen.getByText('Driver')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Destination')).toBeInTheDocument();
    expect(screen.getByText('Battery')).toBeInTheDocument();
    expect(screen.getByText('Fuel')).toBeInTheDocument();
  });

  it('should render status badges for each vehicle', () => {
    render(<VehicleList vehicles={mockVehicles} />);

    expect(screen.getByTestId('status-badge-idle')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge-en_route')).toBeInTheDocument();
  });

  it('should render correct number of rows', () => {
    render(<VehicleList vehicles={mockVehicles} />);

    expect(screen.getByTestId('vehicle-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('vehicle-row-2')).toBeInTheDocument();
  });

  it('should display destinations', () => {
    render(<VehicleList vehicles={mockVehicles} />);

    expect(screen.getByText('Warehouse A')).toBeInTheDocument();
    expect(screen.getByText('Downtown')).toBeInTheDocument();
  });

  it('should show empty state when no vehicles', () => {
    render(<VehicleList vehicles={[]} />);

    expect(screen.getByText('No vehicles to display')).toBeInTheDocument();
    expect(screen.queryByTestId('vehicle-list')).not.toBeInTheDocument();
  });

  it('should handle undefined vehicles prop', () => {
    render(<VehicleList />);

    expect(screen.getByText('No vehicles to display')).toBeInTheDocument();
  });

  it('should render battery and fuel percentage bars', () => {
    const { container } = render(<VehicleList vehicles={mockVehicles} />);

    const progressBars = container.querySelectorAll('.MuiLinearProgress-root');
    expect(progressBars.length).toBeGreaterThan(0);
  });
});
