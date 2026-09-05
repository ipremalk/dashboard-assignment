/**
 * ErrorMessage Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message', () => {
    render(<ErrorMessage message="Failed to load data" />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
  });

  it('should render default message when no message provided', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/An error occurred/)).toBeInTheDocument();
  });

  it('should render retry button when onRetry provided', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Error" onRetry={onRetry} />);
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should not render retry button when onRetry not provided', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
  });

  it('should call onRetry when retry button clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Error" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should render centered variant by default', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render alert variant when specified', () => {
    render(<ErrorMessage message="Error" variant="alert" />);
    const alert = screen.getByTestId('error-message');
    expect(alert).toHaveClass('MuiAlert-root');
  });

  it('should render alert variant with retry button', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Error" variant="alert" onRetry={onRetry} />);
    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
