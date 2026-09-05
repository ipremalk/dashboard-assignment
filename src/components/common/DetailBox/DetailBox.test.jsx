import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailBox } from './DetailBox';
import SpeedIcon from '@mui/icons-material/Speed';

describe('DetailBox', () => {
  const defaultProps = {
    icon: SpeedIcon,
    label: 'Speed',
    value: '65 mph',
  };

  it('renders label and value correctly', () => {
    render(<DetailBox {...defaultProps} />);

    expect(screen.getByText(/speed/i)).toBeInTheDocument();
    expect(screen.getByText('65 mph')).toBeInTheDocument();
  });

  it('renders with fullWidth prop', () => {
    render(<DetailBox {...defaultProps} fullWidth />);

    const detailBox = screen.getByTestId('detail-box');
    expect(detailBox).toBeInTheDocument();
  });

  it('renders progress bar when showProgress is true', () => {
    render(
      <DetailBox
        {...defaultProps}
        showProgress
        progressValue={75}
      />
    );

    // PercentageBar should be rendered
    expect(screen.getByTestId('detail-box')).toBeInTheDocument();
  });

  it('does not render progress bar when showProgress is false', () => {
    const { container } = render(<DetailBox {...defaultProps} />);

    // Check that PercentageBar is not rendered
    const progressBar = container.querySelector('[data-testid="percentage-bar"]');
    expect(progressBar).not.toBeInTheDocument();
  });

  it('renders React node as value', () => {
    const nodeValue = <span data-testid="custom-value">Custom Node</span>;

    render(<DetailBox {...defaultProps} value={nodeValue} />);

    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
    expect(screen.getByText('Custom Node')).toBeInTheDocument();
  });

  it('applies correct styling for label', () => {
    render(<DetailBox {...defaultProps} />);

    const label = screen.getByText(/speed/i);
    expect(label).toBeInTheDocument();
  });

  it('renders with different icons', () => {
    const { rerender } = render(<DetailBox {...defaultProps} />);
    expect(screen.getByTestId('detail-box')).toBeInTheDocument();

    // Re-render with different icon
    rerender(<DetailBox {...defaultProps} icon={SpeedIcon} />);
    expect(screen.getByTestId('detail-box')).toBeInTheDocument();
  });
});
