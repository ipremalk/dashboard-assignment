/**
 * StatusBadge Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('should render idle status', () => {
    render(<StatusBadge status="idle" />);
    expect(screen.getByText('Idle')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge-idle')).toBeInTheDocument();
  });

  it('should render en_route status', () => {
    render(<StatusBadge status="en_route" />);
    expect(screen.getByText('En Route')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge-en_route')).toBeInTheDocument();
  });

  it('should render delivered status', () => {
    render(<StatusBadge status="delivered" />);
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge-delivered')).toBeInTheDocument();
  });

  it('should apply small size by default', () => {
    const { container } = render(<StatusBadge status="idle" />);
    const chip = container.querySelector('.MuiChip-sizeSmall');
    expect(chip).toBeInTheDocument();
  });

  it('should apply medium size when specified', () => {
    const { container } = render(<StatusBadge status="idle" size="medium" />);
    const chip = container.querySelector('.MuiChip-sizeMedium');
    expect(chip).toBeInTheDocument();
  });

  it('should apply filled variant by default', () => {
    const { container } = render(<StatusBadge status="idle" />);
    const chip = container.querySelector('.MuiChip-filled');
    expect(chip).toBeInTheDocument();
  });

  it('should apply outlined variant when specified', () => {
    const { container } = render(<StatusBadge status="idle" variant="outlined" />);
    const chip = container.querySelector('.MuiChip-outlined');
    expect(chip).toBeInTheDocument();
  });

  it('should default to idle for invalid status', () => {
    // Note: PropTypes will warn in development, but component should still render
    render(<StatusBadge status="invalid_status" />);
    expect(screen.getByText('Idle')).toBeInTheDocument();
  });
});
