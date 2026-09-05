/**
 * LoadingSpinner Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render spinner', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should display message when provided', () => {
    render(<LoadingSpinner message="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('should not display message when not provided', () => {
    const { container } = render(<LoadingSpinner />);
    const message = container.querySelector('.MuiTypography-body2');
    expect(message).not.toBeInTheDocument();
  });

  it('should render with medium size by default', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.MuiCircularProgress-root');
    expect(spinner).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('should render with small size when specified', () => {
    const { container } = render(<LoadingSpinner size="small" />);
    const spinner = container.querySelector('.MuiCircularProgress-root');
    expect(spinner).toHaveStyle({ width: '24px', height: '24px' });
  });

  it('should render with large size when specified', () => {
    const { container } = render(<LoadingSpinner size="large" />);
    const spinner = container.querySelector('.MuiCircularProgress-root');
    expect(spinner).toHaveStyle({ width: '60px', height: '60px' });
  });

  it('should render with centered layout', () => {
    render(<LoadingSpinner />);
    const container = screen.getByTestId('loading-spinner');
    expect(container).toBeInTheDocument();
  });
});
