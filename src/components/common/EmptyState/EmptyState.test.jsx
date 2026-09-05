/**
 * EmptyState Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@mui/material';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('should render empty state', () => {
    render(<EmptyState />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('should render default message when no message provided', () => {
    render(<EmptyState />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render custom message when provided', () => {
    render(<EmptyState message="No vehicles found" />);
    expect(screen.getByText('No vehicles found')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<EmptyState message="No vehicles" description="Try adjusting your filters" />);
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    const { container } = render(<EmptyState message="No vehicles" />);
    const descriptions = container.querySelectorAll('.MuiTypography-body2');
    expect(descriptions).toHaveLength(0);
  });

  it('should render action button when provided', () => {
    const action = <Button>Clear Filters</Button>;
    render(<EmptyState message="No vehicles" action={action} />);
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  it('should not render action when not provided', () => {
    render(<EmptyState message="No vehicles" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render with centered layout', () => {
    render(<EmptyState />);
    const container = screen.getByTestId('empty-state');
    expect(container).toBeInTheDocument();
  });
});
