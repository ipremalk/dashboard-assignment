/**
 * PercentageBar Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PercentageBar } from './PercentageBar';

describe('PercentageBar', () => {
  it('should render with value', () => {
    render(<PercentageBar value={75} />);
    expect(screen.getByTestId('percentage-bar')).toBeInTheDocument();
  });

  it('should display percentage value when showValue is true', () => {
    render(<PercentageBar value={75} showValue={true} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should not display percentage value when showValue is false', () => {
    render(<PercentageBar value={75} showValue={false} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('should display label when provided', () => {
    render(<PercentageBar value={75} label="Battery" />);
    expect(screen.getByText('Battery')).toBeInTheDocument();
  });

  it('should not display label when not provided', () => {
    render(<PercentageBar value={75} />);
    const labels = screen.queryByText(/Battery|Fuel/);
    expect(labels).not.toBeInTheDocument();
  });

  it('should use error color for low values (<=20)', () => {
    const { container } = render(<PercentageBar value={15} />);
    const progress = container.querySelector('.MuiLinearProgress-colorError');
    expect(progress).toBeInTheDocument();
  });

  it('should use warning color for medium values (21-50)', () => {
    const { container } = render(<PercentageBar value={35} />);
    const progress = container.querySelector('.MuiLinearProgress-colorWarning');
    expect(progress).toBeInTheDocument();
  });

  it('should use success color for high values (>50)', () => {
    const { container } = render(<PercentageBar value={75} />);
    const progress = container.querySelector('.MuiLinearProgress-colorSuccess');
    expect(progress).toBeInTheDocument();
  });

  it('should handle 0% value', () => {
    render(<PercentageBar value={0} showValue={true} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should handle 100% value', () => {
    render(<PercentageBar value={100} showValue={true} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should apply medium size by default', () => {
    const { container } = render(<PercentageBar value={50} />);
    const progress = container.querySelector('.MuiLinearProgress-root');
    expect(progress).toHaveStyle({ height: '8px' });
  });

  it('should apply small size when specified', () => {
    const { container } = render(<PercentageBar value={50} size="small" />);
    const progress = container.querySelector('.MuiLinearProgress-root');
    expect(progress).toHaveStyle({ height: '6px' });
  });
});
